import { Component } from '@angular/core';
import { Contact } from '../contact/contact.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../contact/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-view-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './view-contact.component.html',
  styleUrl: './view-contact.component.css',
})
export class ViewContactComponent {
  id?: number;
  contact: Contact = new Contact();

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  contactForm = new FormGroup({
    phoneNumber: new FormControl(
      { value: '', disabled: true },
      {
        nonNullable: true,
      }
    ),
    firstName: new FormControl(
      { value: '', disabled: true },
      {
        nonNullable: true,
      }
    ),
    lastName: new FormControl(
      { value: '', disabled: true },
      {
        nonNullable: true,
      }
    ),
    address: new FormControl(
      { value: '', disabled: true },
      {
        nonNullable: true,
      }
    ),
    email: new FormControl(
      { value: '', disabled: true },
      {
        nonNullable: true,
      }
    ),
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
    this.router.navigate(['update-contact', this.id]);
  }

  onReturn() {
    this.router.navigate(['contacts']);
  }
}
