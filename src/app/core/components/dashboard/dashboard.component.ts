import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PetsService } from 'src/app/pets/services/pets/pets.service';
import { Router } from '@angular/router';
import { BreedInterface } from '../../models/breed';
import { AnimalInterface } from '../../models/animal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  pets = new Array();

  filterGroup: FormGroup;

  animals: AnimalInterface[] = [];
  breeds: BreedInterface[] = [];

  columnsDisplayed = [
    'Nombre',
    'Animal',
    'Raza',
    'Tamaño',
    'Editar',
    'Eliminar',
  ];
  elementsAttr = ['name', 'animal', 'breed', 'size'];

  constructor(
    private petsService: PetsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.filterGroup = new FormGroup({
      animal: new FormControl(''),
      breed: new FormControl(''),
    });
    this.updatePets();
    this.petsService.LISTBREEDS().subscribe((data) => (this.breeds = data));
    this.petsService.LISTANIMALS().subscribe((data) => (this.animals = data));
  }

  goToEdition(id: string) {
    this.router.navigate(['/edit-pet', id]);
  }

  updatePets() {
    this.petsService.LISTPETS().subscribe((data) => {
      const newPets = [];
      for (let pet of data) {
        newPets.push({
          _id: pet._id,
          name: pet.name,
          breed: pet.breed.breed,
          animal: pet.animal.name,
          size: pet.breed.size,
        });
      }
      this.pets = newPets;
    });
  }

  filterList() {
    const filters = this.filterGroup.value;
    if (filters.animal?.length > 0 || filters.breed?.length > 0) {
      this.petsService.FILTERPETS(this.filterGroup.value).subscribe((data) => {
        const newPets = [];
        for (let pet of data) {
          newPets.push({
            _id: pet._id,
            name: pet.name,
            breed: pet.breed.breed,
            animal: pet.animal[0].name,
            size: pet.breed.size,
          });
        }
        this.pets = newPets;
      });
    } else {
      this.updatePets();
    }
  }

  deletePet(id: string) {
    this.petsService.DELETEPET(id).subscribe((data) => {
      if (data?.status === 'done') {
        this.snackBar.open('La operación se realizó con éxito', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.updatePets();
      } else {
        this.snackBar.open('La operación ha fallado', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      }
    });
  }
}
