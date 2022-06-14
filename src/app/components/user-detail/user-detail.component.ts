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
      console.log(data)
    })
  }

  checkTelephone() {

      this.callapi.getAllUserDetail().subscribe(data => {
        this.userDetailData = data
        console.log(data)
        for (let index = 0; index < this.userDetailData.length; index++) {
          console.log(this.userDetailData[index].tel);
          console.log(this.formUserDetail.value.tel);

          if (this.userDetailData[index].tel == this.formUserDetail.value.tel) {
            Swal.fire({
              icon: 'warning',
              position: 'center',
              title: this.formUserDetail.value.tel + ' มีผู้ใช้งานแล้ว',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off'
              },
              // timer: 1500
            }).then((res) => {
              console.log(res.value.toString());

              this.formUserDetail.patchValue({tel : res.value.toString()})
              
              // this.formUserDetail.value.
            })
          } else {

          }
        }
      })
  }


  createUserDetail() {
    console.log(this.formUserDetail.value.userDetailId);
    this.checkTelephone()
    if (this.formUserDetail.value.firstName == null) {
      this.callapi.checkUser(this.formUser.value.userName).subscribe(state => {
        if (state.toString() == "ไอดีนี้สามารถใช้งานได้") {
          Swal.fire({
            position: 'center',
            text: "ต้องการสร้างไอดีเพิ่มหรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#2aad19',
            confirmButtonText: 'ยืนยัน'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'กรุณากรอกเบอร์โทรศัพท์',
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log(result.value.toString());
                  this.callapi.getAllUserDetail().subscribe(userData => {
                    this.userDetailData = userData
                    for (let i = 0; i < this.userDetailData.length; i++) {
                      if (this.userDetailData[i].tel == result.value.toString()) {
                        this.formUser.value.userDetailId = this.userDetailData[i].userDetailId
                        this.formUser.value.Status = "Open"
                        this.formUser.value.userStatus = "In"
                        this.formUser.value.creationDateTime = new Date
                        this.formUser.value.permission = "USER"
                        console.log(this.formUser.value);
                        this.callapi.createUser(this.formUser.value).subscribe(data => {
                          console.log(data);
                          this.emptyUserForm()
                          this.emptyUserDetailForm()
                        })
                        Swal.fire({
                          position: "center",
                          icon: 'success',
                          title: "สำเร็จ",
                          showConfirmButton: false,
                          timer: 1000
                        })
                        break;
                      } else {
                        Swal.fire({
                          position: "center",
                          icon: 'warning',
                          title: "เบอร์โทรศัพท์นี้ไม่มีในระบบ",
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
            title: "ไอดีนี้มีในระบบแล้ว",
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
    } else {
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
          this.formUserDetail.value.status = "Open"
          this.formUserDetail.value.userStatus = "In"
          console.log(this.formUserDetail.value)
          this.callapi.checkUser(this.formUser.value.userName).subscribe(state => {
            if (state.toString() == "ไอดีนี้สามารถใช้งานได้") {
              this.callapi.createUserDetail(this.formUserDetail.value).subscribe(create => {
                console.log(create);
                this.formUser.value.userDetailId = create.userDetailId
                this.oncreateUser()
              })
            } else {
              Swal.fire({
                position: "center",
                icon: 'warning',
                title: "ไอดีนี้มีในระบบแล้ว",
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
    console.log(this.formUser.value);
    this.callapi.createUser(this.formUser.value).subscribe(data => {
      this.getRoomByRoomNumber();
      console.log(data);
    })
    Swal.fire({
      position: "center",
      icon: 'success',
      title: "สำเร็จ",
      showConfirmButton: false,
      timer: 1000
    })
  }

  getRoomByRoomNumber() {
    this.callapi.getRoomByNumber(this.formUserDetail.value.roomNumber).subscribe(room => {
      this.formRoom.value = room
      this.formRoom.value.roomStatus = "ไม่ว่าง"
      this.callapi.editRoom(room.roomId, this.formRoom.value).subscribe(edit => {
        console.log(edit)
        this.emptyUserForm()
        this.emptyUserDetailForm()
      })
    })
  }

  getRoomByStatus() {
    this.callapi.getRoomByRoomStatus("ว่าง").subscribe(room => {
      this.roomStatusData = room
    })
  }


  ngOnInit() {
    this.getRoomByStatus()
  }

}
