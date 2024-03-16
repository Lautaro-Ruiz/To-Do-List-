import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() showSearchBar: boolean = true;
  
  constructor (private router: Router){}

  profileOptions = false;

  redirectToManageAccounts(): void {
    this.router.navigate(['/manage-accounts']);
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }

  toggleProfileOptions() {
    this.profileOptions = !this.profileOptions;
  }
}
