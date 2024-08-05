import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from './contact/contact.model';
import { ContactService } from './contact/contact.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit, OnChanges {
  contacts: Contact[] = [];
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.getContacts();
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  private getContacts() {
    this.contactService.getAllContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  updateContact(id: number) {
    this.router.navigate(['update-contact', id]);
  }

  veiwContact(id: number) {
    this.router.navigate(['contact', id]);
  }

  deleteContact(id: number) {
    this.contactService
      .deleteContact(id)
      .subscribe(() => console.log('contact ' + id + ' deleted'));
  }

  onSubmit() {
    this.contacts = this.contacts.filter(
      (filteredValue) =>
        filteredValue?.phoneNumber
          .toLowerCase()
          .includes(this.searchForm.value.search?.toLowerCase() ?? '') ||
        filteredValue.firstName
          .toLowerCase()
          .includes(this.searchForm.value.search?.toLowerCase() ?? '') ||
        filteredValue.lastName
          .toLowerCase()
          .includes(this.searchForm.value.search?.toLowerCase() ?? '')
    );
  }

  onRefresh() {
    this.ngOnInit();
  }
}
