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
  formRoom: any
  userDetailData: any
  getUserDetailId: any

  disabled = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

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
      creationDatetime: [null, [Validators.required]],
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
      }),
      this.formRoom = fb.group({
        roomId: [null],
        roomType: [null],
        roomNumber: [null],
        roomRate: [null],
        waterMeter: [null],
        powerMeter: [null],
        floor: [null],
        roomStatus: [null],
        status: [null],
        userId: [null]
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
      creationDatetime: null,
      dateIn: null,
      dateOut: null,
      roomNumber: null,
      status: null,
    })
  }

  getAllUserDetail() {
    this.callapi.getAllUserDetail().subscribe(data => {
      this.userDetailData = data
      // for (let tel = 0; tel < this.userDetailData.length; tel++) {
      //   if(this.userDetailData.value.tel == this.formUserDetail.value){

      //   }

      // }
    })
  }

  checkTelephone() {

    this.callapi.getAllUserDetail().subscribe(data => {
      this.userDetailData = data
      for (let index = 0; index < this.userDetailData.length; index++) {
        if (this.userDetailData[index].tel == this.formUserDetail.value.tel) {
          Swal.fire({
            icon: 'warning',
            position: 'center',
            title: this.formUserDetail.value.tel + ' ?????????????????????????????????????????????',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            // timer: 1500
          }).then((res) => {

            this.formUserDetail.patchValue({ tel: res.value.toString() })

            // this.formUserDetail.value.
          })
        } else {

        }
      }
    })
  }


  createUserDetail() {
    this.checkTelephone()
    if (this.formUserDetail.value.firstName == null) {
      this.callapi.checkUser(this.formUser.value.userName).subscribe(state => {
        if (state.toString() == "??????????????????????????????????????????????????????????????????") {
          Swal.fire({
            position: 'center',
            text: "?????????????????????????????????????????????????????????????????????????????????????",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: '??????????????????',
            confirmButtonColor: '#2aad19',
            confirmButtonText: '??????????????????'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: '??????????????????????????????????????????????????????????????????',
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                cancelButtonText: '??????????????????',
                confirmButtonText: '??????????????????',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                  this.callapi.getAllUserDetail().subscribe(userData => {
                    this.userDetailData = userData
                    for (let i = 0; i < this.userDetailData.length; i++) {
                      if (this.userDetailData[i].tel == result.value.toString()) {
                        this.formUser.value.userDetailId = this.userDetailData[i].userDetailId
                        this.formUser.value.Status = "Open"
                        this.formUser.value.userStatus = "In"
                        this.formUser.value.creationDateTime = new Date
                        this.formUser.value.permission = "USER"
                        this.callapi.createUser(this.formUser.value).subscribe(data => {
                          this.emptyUserForm()
                          this.emptyUserDetailForm()
                          location.reload()
                        })
                        this.Toast.fire({
                          icon: 'success',
                          title: '??????????????????'
                        })
                        break;
                      } else {
                        Swal.fire({
                          position: "center",
                          icon: 'warning',
                          title: "?????????????????????????????????????????????????????????????????????????????????",
                          showConfirmButton: false,
                          timer: 1600
                        })
                      }
                    }
                  })
                }
              })
            }
          })
        } else {
          Swal.fire({
            position: "center",
            icon: 'warning',
            title: "?????????????????????????????????????????????????????????",
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
    } else {
      Swal.fire({
        position: 'center',
        text: "???????????????????????????????????????????????????????????????????",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: '??????????????????',
        confirmButtonColor: '#2aad19',
        confirmButtonText: '??????????????????'
      }).then((result) => {
        if (result.isConfirmed) {
          this.formUserDetail.value.creationDatetime = new Date;
          this.formUserDetail.value.status = "Open"
          this.formUserDetail.value.userStatus = "In"
          this.callapi.checkUser(this.formUser.value.userName).subscribe(state => {
            if (state.toString() == "??????????????????????????????????????????????????????????????????") {
              this.callapi.createUserDetail(this.formUserDetail.value).subscribe(create => {
                this.formUser.value.userDetailId = create.userDetailId
                this.oncreateUser()
              })
            } else {
              Swal.fire({
                position: "center",
                icon: 'warning',
                title: "?????????????????????????????????????????????????????????",
                showConfirmButton: false,
                timer: 1000
              })
            }
          })

        }
      })
    }
  }

  oncreateUser() {
    this.formUser.value.Status = "Open"
    this.formUser.value.userStatus = "In"
    this.formUser.value.creationDateTime = new Date
    this.formUser.value.permission = "USER"
    this.callapi.createUser(this.formUser.value).subscribe(data => {
      this.getRoomByRoomNumber();
    })
    this.Toast.fire({
      icon: 'success',
      title: '??????????????????'
    })
  }

  getRoomByRoomNumber() {
    this.callapi.getRoomByNumber(this.formUserDetail.value.roomNumber).subscribe(room => {
      this.formRoom.value = room
      this.formRoom.value.userDetailId = this.formUserDetail.value.userDetailId
      this.formRoom.value.roomStatus = "?????????????????????"
      this.callapi.editRoom(room.roomId, this.formRoom.value).subscribe(edit => {
        this.emptyUserForm()
        this.emptyUserDetailForm()
      })
    })
  }

  getRoomByStatus() {
    this.callapi.getRoomByRoomStatus("????????????").subscribe(room => {
      this.roomStatusData = room
    })
  }


  ngOnInit() {
    this.getRoomByStatus()
  }
}
