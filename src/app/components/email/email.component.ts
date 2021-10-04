import { EmailService } from './../../services/email.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  hide:boolean=false;

  data={
    message:"",
    subject:"",
    to:[""]
  }

  tostring="";

  constructor(private email: EmailService, private snak:MatSnackBar) { 

  }

  ngOnInit(): void {
  }

  doSubmit(){
    
    //The to field is ';' separated string for sending to multiple recipients.
    //So first we split the string to create a array of strings(i.e. email ids)
    this.data.to=this.tostring.split(";");

    console.log(this.data);

    if(this.data.to==[] || this.data.subject=="" || this.data.message==""){
      this.snak.open("fields cannot be empty!!","OK");
      return;
    }

    this.hide=true;
    this.email.sendEmail(this.data).subscribe(
      res=>{
        this.snak.open("Send Success","OK");
        console.log(res);
        this.hide=false;
      },
      err=>{
        this.hide=false;
      // this.snak.open("Oops, there was some error :(","Cancel")
        console.log(err);
      }

      
      
    )
  }

  

}
