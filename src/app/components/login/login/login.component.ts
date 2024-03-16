import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_group = new FormGroup ({
    email: new FormControl ('',[Validators.required, Validators.email]),
    password: new FormControl ('',[Validators.required, Validators.minLength (8), Validators.nullValidator])
  });

  onSubmit (){
    console.log ('Logeado')
  }
}
