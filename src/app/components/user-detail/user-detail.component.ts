import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/Models/user';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

import pdfMake from "pdfmake-thai/build/pdfmake.js"
import pdfFonts from "pdfmake-thai/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],

})
export class UserDetailComponent implements OnInit {
  changStatus = false
  roomStatusData: any
  userData: any
  formUserDetail: any
  formUser: any
  userDetailData: any
  getUserDetailId: any

  constructor(public callapi: ApiService, public fb: FormBuilder, public router: Router) {
    this.formUserDetail = fb.group({
      userDetailId: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      age: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      birthday: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      email: [null, [Validators.required]],
      address: [null, [Validators.required]],
      idCard: [null, [Validators.required]],
      userStatus: [null, [Validators.required]],
      deposit: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      bookingDate: [null, [Validators.required]],
      bookingDateOfStay: [null, [Validators.required]],
      dateIn: [null, [Validators.required]],
      dateOut: [null, [Validators.required]],
      roomNumber: [null, [Validators.required]],
      status: [null, [Validators.required]],
    }),
      this.formUser = fb.group({
        userId: [null],
        userName: [null, [Validators.required]],
        password: [null, [Validators.required]],
        permission: [null],
        userStatus: [null],
        creationDateTime: [null],
        deletetionDateTime: [null],
        userDetailId: [null],
        Status: [null],
      })
  }


  emptyUserForm() {
    this.formUser.patchValue({
      userId: "",
      userName: "",
      password: "",
      permission: "",
      userStatus: "",
      creationDateTime: "",
      deletetionDateTime: "",
      userDetailId: "",
      Status: "",
    })
  }
  emptyUserDetailForm() {
    this.formUserDetail.patchValue({
      formUserDetail: null,
      userDetailId: null,
      firstName: null,
      lastName: null,
      age: null,
      birthday: null,
      tel: null,
      email: null,
      address: null,
      idCard: null,
      userStatus: null,
      deposit: null,
      bookingDate: null,
      bookingDateOfStay: null,
      dateIn: null,
      dateOut: null,
      roomNumber: null,
      status: null,
    })
  }

  getAllUserDetail() {
    this.callapi.getAllUserDetail().subscribe(data => {
      this.userDetailData = data;
      console.log(data);
    })
  }

  createUserDetail() {
    Swal.fire({
      position: 'center',
      text: "ยืนยันการบันทึกหรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#2aad19',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formUserDetail.value.bookingDate = new Date;
        this.formUserDetail.value.status = "Open";
        this.formUserDetail.value.userStatus = "In";
        console.log(this.formUserDetail.value);
        this.callapi.createUserDetail(this.formUserDetail.value).subscribe(create => {
          console.log(create);
          this.getUserDetailId = create.userDetailId
          this.oncreateUser()
        })
      }
    })
  }

  oncreateUser() {
    this.formUser.value.userDetailId = this.getUserDetailId
    this.formUser.value.Status = "Open"
    this.formUser.value.userStatus = "In"
    this.formUser.value.creationDateTime = new Date
    this.formUser.value.permission = "USER"
    console.log(this.formUser.value);
    this.callapi.createUser(this.formUser.value).subscribe(data => {
      console.log(data);
      this.emptyUserForm();
      this.emptyUserDetailForm()
    })

    Swal.fire({
      position: "center",
      icon: 'success',
      title: "สำเร็จ",
      showConfirmButton: false,
      timer: 1000
    })
  }

  getRoomByStatus() {
    this.callapi.getRoomByRoomStatus("ว่าง").subscribe(room => {
      this.roomStatusData = room;

    })
  }


  ngOnInit() {
    this.getRoomByStatus()
  }

}
