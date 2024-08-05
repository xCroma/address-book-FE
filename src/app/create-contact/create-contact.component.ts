import { Component } from '@angular/core';
import { ContactDTO } from '../contacts/contact/contact-dto';
import { Contact } from '../contacts/contact/contact.model';
import { ContactService } from '../contacts/contact/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-create-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-contact.component.html',
  styleUrl: './create-contact.component.css',
})
export class CreateContactComponent {
  contact: ContactDTO = new ContactDTO();

  constructor(private contactService: ContactService, private router: Router) {}

  contactForm = new FormGroup({
    phoneNumber: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
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

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      this.contact = {
        phoneNumber: this.contactForm.controls.phoneNumber.value,
        firstName: this.contactForm.controls.firstName.value,
        lastName: this.contactForm.controls.lastName.value,
        address: this.contactForm.controls.address.value,
        email: this.contactForm.controls.email.value,
      };
      this.contactService.createContact(this.contact).subscribe({
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
