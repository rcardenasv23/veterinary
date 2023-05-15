import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { AddPetComponent } from './pets/components/add-pet/add-pet.component';
import { EditPetComponent } from './pets/components/edit-pet/edit-pet.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'add-pet',
    component: AddPetComponent,
  },
  { path: 'edit-pet/:id', component: EditPetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
