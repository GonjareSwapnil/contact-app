import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
public contactId: string |null = null;
public loading:boolean = false;
public contact:MyContact = {} as MyContact;
public errorMessage:string | null = null;
public group:MyGroup = {} as MyGroup;

  constructor( private activatedRoute :ActivatedRoute, 
    private contService: ContactService){

  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.loading = true;
    this.contService.getContacts( this.contactId).subscribe(
      (data:any = MyContact)=>{
      this.contact = data;
      this.loading = false;
      this.contService.getGroups(data).subscribe((data:any = MyGroup)=>{
        this.group = data;
      })
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    })
  }
} 
public isNotEmpty(){
  return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
}
}
