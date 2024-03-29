import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task/add-task.component';
import { DeleteTaskComponent } from './components/delete-task/delete-task/delete-task.component';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/navbar/search-bar/search-bar/search-bar.component';
import { PriorityListComponent } from './components/priority-list/priority-list/priority-list.component';
import { StatusListComponent } from './components/status-list/status-list/status-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { RegisterAccountComponent } from './components/register-account/register-account/register-account.component';
import { LoginComponent } from './components/login/login/login.component';
import { ManageAccountsComponent } from './components/manage-accounts/manage-accounts/manage-accounts.component';
import { HomeComponent } from './components/home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddTaskComponent,
    DeleteTaskComponent,
    SearchBarComponent,
    PriorityListComponent,
    StatusListComponent,
    NavbarComponent,
    FooterComponent,
    RegisterAccountComponent,
    LoginComponent,
    ManageAccountsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
