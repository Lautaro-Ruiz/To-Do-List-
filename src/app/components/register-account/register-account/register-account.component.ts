import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent {
  register_group = new FormGroup ({
    firstname: new FormControl ('', Validators.required),
    lastname: new FormControl ('',Validators.required),
    email: new FormControl ('',[Validators.required, Validators.email]),
    password: new FormControl ('',[Validators.required, Validators.minLength (8), Validators.nullValidator])
  });

  onSubmit (){
    console.log ('Registrado')
  }
}
