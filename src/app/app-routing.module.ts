import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAccountsComponent } from './components/manage-accounts/manage-accounts/manage-accounts.component';
import { HomeComponent } from './components/home/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage-accounts', component: ManageAccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
