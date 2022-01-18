import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showRegisterPage: number = 0
  formUser: any

  constructor(public router: Router, public fb: FormBuilder, public callApi: ApiService) {
    this.formUser = fb.group({
      userId: [null],
      userName: [null],
      password: [null],
      permission: [null],
      userStatus: [null],
      creationDateTime: [null],
      deletetionDateTime: [null],
      userDetailId: [null],
      Status: [null],
    })
   }


  ngOnInit() {
  }

}
