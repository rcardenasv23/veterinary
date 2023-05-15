import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ListPetItemInterface } from 'src/app/core/models/pets';
import { PetsService } from '../../services/pets/pets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalInterface } from 'src/app/core/models/animal';
import { BreedInterface } from 'src/app/core/models/breed';
import { SizeInterface } from 'src/app/core/models/size';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.scss'],
})
export class EditPetComponent {
  editPet: FormGroup;
  newBreed: boolean = false;
  pet!: ListPetItemInterface;

  sizes: Array<SizeInterface> = [];
  breeds: Array<BreedInterface> = [];
  animals: Array<AnimalInterface> = [];

  extraControls = ['animal', 'newBreedName', 'size'];

  constructor(
    private petService: PetsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.editPet = new FormGroup({});
    this.petService
      .GETPET(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.pet = data;
        this.editPet.addControl(
          'name',
          new FormControl(data.name, [Validators.required])
        );
        this.editPet.addControl(
          'breed',
          new FormControl(data.breed._id, [Validators.required])
        );
        this.editPet.addControl(
          'description',
          new FormControl(data.description, [Validators.required])
        );
      });

    this.petService.LISTBREEDS().subscribe((data) => (this.breeds = data));
    this.petService.LISTANIMALS().subscribe((data) => (this.animals = data));
    this.petService.LISTSIZES().subscribe((data) => (this.sizes = data));
  }

  removeFormControl(name: string) {
    try {
      this.editPet.removeControl(name);
    } catch (error: any) {
      console.log(error);
    }
  }

  checkBreed(event: MatSelectChange) {
    if (event.value === 'new') {
      this.newBreed = true;
      this.editPet.addControl(
        'animal',
        new FormControl(this.pet.animal._id, [Validators.required])
      );
      this.editPet.addControl(
        'newBreedName',
        new FormControl('', [Validators.required])
      );
      this.editPet.addControl(
        'size',
        new FormControl(this.pet.breed.size, [Validators.required])
      );
    } else {
      this.newBreed = false;
      for (let control of this.extraControls) {
        this.removeFormControl(control);
      }
    }
  }

  sendForm() {
    let editedPet = this.editPet.value;
    editedPet._id = this.route.snapshot.params['id'];
    this.petService.UPDATEPET(editedPet).subscribe((data) => {
      if (data) {
        this.snackBar.open('La operación se realizó con éxito', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['']);
      } else {
        this.snackBar.open('La operación se ha fallado', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    });
  }
}
