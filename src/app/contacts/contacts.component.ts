import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from './contact/contact.model';
import { ContactService } from './contact/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit {
  contacts = signal<Contact[]>([]);
  filteredContacts = signal<Contact[]>([]);
  enteredSearch = signal<string>('');

  firstName = input.required<string>();
  lastName = input.required<string>();
  phoneNumber = input.required<string>();
  id = input.required<number>();

  viewContact = output<number>();
  updateContact = output<number>();
  deleteContact = output<number>();

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.getContacts();
  }

  private getContacts() {
    this.contactService.getAllContacts().subscribe((contacts) => {
      this.contacts.set(contacts);
      this.filteredContacts.set(contacts);
    });
  }

  onSearchChange(searchValue: string): void {
    if (searchValue === '') {
      this.filteredContacts.set(this.contacts());
    } else {
      this.filteredContacts.update(() =>
        this.contacts().filter(
          (filteredContact) =>
            filteredContact.phoneNumber
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            filteredContact.firstName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            filteredContact.lastName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
        )
      );
    }
  }

  onSubmit() {}

  onUpdateContact(id: number) {
    this.router.navigate(['update-contact', id]);
  }

  onViewContact(id: number) {
    this.router.navigate(['contact', id]);
  }

  onDeleteContact(id: number) {
    this.contactService
      .deleteContact(id)
      .subscribe(() => console.log('contact ' + id + ' deleted'));
    this.filteredContacts.set(
      this.contacts().filter((contact) => contact.id !== id)
    );
  }
}
