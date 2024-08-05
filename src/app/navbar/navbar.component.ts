import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Contact } from '../contacts/contact/contact.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  contacts: Contact[] = [];

  constructor() {}
}
