import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from './contact/contact.service';
import { Contact } from './contact/contact.model';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.getContacts();
  }

  private getContacts() {
    this.contactService.getAllContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  updateContact(id: number) {
    this.router.navigate(['update-contact', id]);
  }
}
