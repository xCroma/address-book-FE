import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from './contact.model';
import { ContactDTO } from './contact.dto';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/contacts';

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/getAll`);
  }

  getContactById(id?: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/get/${id}`);
  }

  createContact(contact: ContactDTO): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/create`, contact);
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/update`, contact);
  }

  deleteContact(id: number) {
    return this.http.delete<Contact>(`${this.apiUrl}/delete/${id}`);
  }
}
