import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AnimalInterface } from 'src/app/core/models/animal';
import { BreedInterface } from 'src/app/core/models/breed';
import { SizeInterface } from 'src/app/core/models/size';
import { PetsService } from '../../services/pets/pets.service';
import { CreatePetInterface } from 'src/app/core/models/pets';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent {
  sizes: Array<SizeInterface> = [];
  breeds: Array<BreedInterface> = [];
  animals: Array<AnimalInterface> = [];

  addPet: FormGroup;
  newBreed: boolean = false;

  extraControls = ['animal', 'breedName', 'size'];

  constructor(private petService: PetsService, private snackBar: MatSnackBar) {
    this.addPet = new FormGroup({
      name: new FormControl('', [Validators.required]),
      breed: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.petService.LISTBREEDS().subscribe((data) => (this.breeds = data));
    this.petService.LISTANIMALS().subscribe((data) => (this.animals = data));
    this.petService.LISTSIZES().subscribe((data) => (this.sizes = data));
  }

  removeFormControl(name: string) {
    try {
      this.addPet.removeControl(name);
    } catch (error: any) {
      console.log(error);
    }
  }

  checkBreed(event: MatSelectChange) {
    if (event.value === 'new') {
      this.newBreed = true;
      this.extraControls.forEach((control) =>
        this.addPet.addControl(
          control,
          new FormControl('', [Validators.required])
        )
      );
    } else {
      this.newBreed = false;
      for (let control of this.extraControls) {
        this.removeFormControl(control);
      }
    }
  }

  sendForm() {
    let newPet: CreatePetInterface = this.addPet.value;
    if (this.newBreed) {
      newPet.breed = this.addPet.value.breedName;
    }
    this.petService.ADDPET(newPet).subscribe((data) => {
      if (data.status === 'done') {
        this.snackBar.open('La operación se realizó con éxito', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        if (this.newBreed) {
          for (let control of this.extraControls) {
            this.removeFormControl(control);
          }
        }
        this.addPet.reset();
        Object.keys(this.addPet.controls).forEach((key) => {
          this.addPet?.get(key)?.setErrors(null);
        });
        this.newBreed = false;
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
