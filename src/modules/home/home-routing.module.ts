import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ActivesFormComponent } from './components/actives-form/actives-form.component';
import { ActivesTableComponent } from './components/actives-table/actives-table.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'table', pathMatch: 'full' },
      { path: 'table', component: ActivesTableComponent },
      { path: 'nuevo', component: ActivesFormComponent },
      { path: 'editar/:id', component: ActivesFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
