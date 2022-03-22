import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { user } from 'src/app/Models/user';
import { userDetail } from 'src/app/Models/userDetail';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  userData: any
  formUserDetail: any
  formUser: any
  userDetailData: any
  getUserDetailId: userDetail
  roomStatusData: any
  displayedColumns: string[] = ['ห้องที่', 'ชื่อ-นามสกุล', 'เบอร์โทรศัพท์', 'เพิ่มเติม'];
  dataSource: any
  getUserDetaialID: any
  getId:any
  constructor(public callapi: ApiService, public fb: FormBuilder, public router: Router, public dialog: MatDialog) {
    this.formUserDetail = fb.group({
      userDetailId: [null],
      firstName: [null],
      lastName: [null],
      age: [null],
      birthday: [null],
      tel: [null],
      email: [null],
      address: [null],
      idCard: [null],
      userStatus: [null],
      deposit: [null],
      bookingDate: [null],
      bookingDateOfStay: [null],
      dateIn: [null],
      dateOut: [null],
      roomNumber: [null],
      status: [null],
    }),
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  patchValue(receiveUserDataId: userDetail) {
    this.formUserDetail.patchValue({
      userDetailId: receiveUserDataId.userDetailId,
      firstName: receiveUserDataId.firstName,
      lastName: receiveUserDataId.lastName,
      age: receiveUserDataId.age,
      birthday: receiveUserDataId.birthday,
      tel: receiveUserDataId.tel,
      email: receiveUserDataId.email,
      address: receiveUserDataId.address,
      idCard: receiveUserDataId.idCard,
      userStatus: receiveUserDataId.userStatus,
      deposit: receiveUserDataId.deposit,
      bookingDate: receiveUserDataId.bookingDate,
      bookingDateOfStay: receiveUserDataId.bookingDateOfStay,
      dateIn: receiveUserDataId.dateIn,
      dateOut: receiveUserDataId.dateOut,
      roomNumber: receiveUserDataId.roomNumber,
      status: receiveUserDataId.status,
    })
  }

  patchValueUser(receiveUser: user) {
    this.formUser.patchValue({
      userId: receiveUser.userId,
      userName: receiveUser.userName,
      password: receiveUser.password,
      permission: receiveUser.permission,
      userStatus: receiveUser.userStatus,
      creationDateTime: receiveUser.creationDateTime,
      deletetionDateTime: receiveUser.deletetionDateTime,
      userDetailId: receiveUser.userDetailId,
      Status: receiveUser.Status,
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
      this.dataSource = new MatTableDataSource(this.userDetailData);

      console.log(this.dataSource);
    })
  }

  getUserDetailById(id: string) {
    this.callapi.getUserDetailById(id).subscribe(data => {
      this.getUserDetaialID = data
      this.getId = data.userDetailId
      this.patchValue(this.getUserDetaialID)
    })
  }

  onEditUserDetail(){
    console.log(this.getId);
    this.callapi.editUserDetail(this.getId, this.formUserDetail.value).subscribe(data =>{
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "ลบแล้ว",
        showConfirmButton: false,
        timer: 1000
      })
      console.log(data);
      this.getAllUserDetail()
    })
  }

  deleteUserDetail(id: string) {
    Swal.fire({
      position: 'center',
      text: "ยืนยันการลบหรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#2aad19',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.callapi.deleteUserByUserDetail(id).subscribe(i => {
          this.callapi.deleteUserDetail(id).subscribe(data => {
            Swal.fire({
              position: "center",
              icon: 'success',
              title: "ลบแล้ว",
              showConfirmButton: false,
              timer: 1000
            })
            this.getAllUserDetail();
          })
        })

      }
    })
  }



  getRoomByStatus() {
    this.callapi.getRoomByRoomStatus("ว่าง").subscribe(room => {
      this.roomStatusData = room;

    })
  }


  ngOnInit() {
    this.getAllUserDetail()
    this.getRoomByStatus()
  }

}
