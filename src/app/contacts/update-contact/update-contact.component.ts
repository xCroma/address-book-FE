import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ContactDTO } from '../contact/contact-dto';
import { Contact } from '../contact/contact.model';
import { ContactService } from '../contact/contact.service';

@Component({
  selector: 'app-update-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css',
})
export class UpdateContactComponent implements OnInit {
  id?: number;
  contact: Contact = new Contact();
  contactDTO: ContactDTO = new ContactDTO();

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  contactForm = new FormGroup({
    phoneNumber: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
      nonNullable: true,
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    address: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.contactService
      .getContactById(this.id)
      .pipe(
        tap((contact) => {
          this.contact = contact;
          this.contactForm.patchValue({
            phoneNumber: contact.phoneNumber,
            firstName: contact.firstName,
            lastName: contact.lastName,
            address: contact.address,
            email: contact.email,
          });
        }),
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.contactForm.valid && this.id) {
      this.contact = {
        id: this.contact.id,
        phoneNumber: this.contactForm.value.phoneNumber
          ? this.contactForm.value.phoneNumber
          : this.contact.phoneNumber,
        firstName: this.contactForm.value.firstName
          ? this.contactForm.value.firstName
          : this.contact.firstName,
        lastName: this.contactForm.value.lastName
          ? this.contactForm.value.lastName
          : this.contact.lastName,
        address: this.contactForm.value.address
          ? this.contactForm.value.address
          : this.contact.address,
        email: this.contactForm.value.email
          ? this.contactForm.value.email
          : this.contact.email,
      };
      this.contactService.updateContact(this.id, this.contact).subscribe({
        next: (data) => {
          console.log('Success:', data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
      this.router.navigate(['contacts']);
    }
  }

  onReturn() {
    this.router.navigate(['contacts']);
  }
}
