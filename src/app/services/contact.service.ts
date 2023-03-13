import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string = 'http://localhost:4000';

  constructor( private http: HttpClient) { }
  // Get All Contact Data

  public getAllContasts():Observable<MyContact>{
    let dataUrl:string = ` ${this.baseUrl}/contact`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get Single Contact
  public getContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string = ` ${this.baseUrl}/contact/${contactId}`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }

  //  Create Contact

  public CreateContacts(contact:MyContact):Observable<MyContact>{
    let dataUrl:string = ` ${this.baseUrl}/contact`;
    return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError)); 
  }

  // Update Contact
  
  public updateContacts(contact:MyContact,contactId:string):Observable<MyContact>{
    let dataUrl:string = ` ${this.baseUrl}/contact/${contactId}`;
    return this.http.put<MyContact>(dataUrl,contact).pipe(catchError(this.handleError)); 
  }

  // Delete Contact

  public deletContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string = ` ${this.baseUrl}/contact/${contactId}`;
    return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError)); 
  }

  // Get All Groups
  public getAllGroups():Observable<MyGroup>{
    let dataUrl:string = ` ${this.baseUrl}/groups`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
  }

  // Get Single Groups
  public getGroups(contact:MyContact):Observable<MyGroup>{
    let dataUrl:string = ` ${this.baseUrl}/groups/${contact.groupId}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
  }


  // Error Solve
  public handleError(error:HttpErrorResponse){
    let errorMassage:string = ''
    if(error.error instanceof ErrorEvent){
      // Client Side
      errorMassage =`Error :${ error.error.message}`
    }else{
      //  Server Side
      errorMassage = `Status: ${error.status}\n Massage: {error.massage}`; 
    }
    return throwError(errorMassage)
  }
}
