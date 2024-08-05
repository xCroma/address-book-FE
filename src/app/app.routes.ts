import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { UpdateContactComponent } from './contacts/update-contact/update-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewContactComponent } from './contacts/view-contact/view-contact.component';
import { CreateContactComponent } from './create-contact/create-contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent },
  { path: 'update-contact/:id', component: UpdateContactComponent },
  { path: 'contact/:id', component: ViewContactComponent },
  { path: 'create', component: CreateContactComponent },
  { path: '**', component: PageNotFoundComponent },
];
