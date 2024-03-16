import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showSearchBar: boolean = true; // Variable para controlar la visibilidad de la barra de búsqueda

  // Método para cambiar la visibilidad de la barra de búsqueda
  toggleSearchBarVisibility(): void {
    this.showSearchBar = !this.showSearchBar;
  }
}
