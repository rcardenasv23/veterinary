import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AddPetComponent } from './components/add-pet/add-pet.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';

@NgModule({
  declarations: [AddPetComponent, EditPetComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class PetsModule {}
