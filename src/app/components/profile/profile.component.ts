import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { report } from 'src/app/Models/report';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formReport: any
  formRoom: any
  switchPage = 1
  roomNumber: any
  roomId: any
  userDetailId: any
  statusLogin: any
  permission: any
  dataUserName: any
  userId: any

  constructor(public router: Router, public callapi: ApiService, public fb: FormBuilder) {
    this.statusLogin = localStorage.getItem('statuslogin')
    this.permission = localStorage.getItem('permission')
    this.dataUserName = localStorage.getItem('iduserName')
    this.userId = localStorage.getItem('iduser')
    this.formReport = fb.group({
      reportId: [null],
      title: [null],
      note: [null],
      date: [null],
      image: [null],
      reportNumber: [null],
      reportStatus: [null],
      roomId: [null],
      roomNumber: [null],
      status: [null]
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

  emptyFormReport() {
    this.formReport.patchValue({
      reportId: "",
      title: "",
      note: "",
      date: "",
      image: "",
      reportNumber: "",
      reportStatus: "",
      roomId: "",
      roomNumber: "",
      status: "",
    })
  }

  patchValue(reCeiveReport: report) {
    this.formReport.patchValue({
      reportId: reCeiveReport.reportId,
      title: reCeiveReport.title,
      note: reCeiveReport.note,
      date: reCeiveReport.date,
      image: reCeiveReport.image,
      reportNumber: reCeiveReport.reportNumber,
      reportStatus: reCeiveReport.reportStatus,
      roomId: reCeiveReport.roomId,
      roomNumber: reCeiveReport.roomNumber,
      status: reCeiveReport.status,
    })
  }

  switchPages(num: number) {
    if (num == 1) {
      this.switchPage = 1
    } else {
      this.switchPage = 2
    }
  }



  onCreateReport() {
    Swal.fire({
      position: 'center',
      text: "ยืนยันหรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#2aad19',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formReport.value.roomNumber = this.roomNumber
        this.formReport.value.date = new Date;
        this.formReport.value.roomId = this.roomId
        this.formReport.value.reportStatus = "รอยืนยัน"
        this.formReport.value.image = ""
        console.log(this.formReport.value);
        this.callapi.createReport(this.formReport.value).subscribe(data => {
          Swal.fire({
            position: "center",
            icon: 'success',
            title: "สำเร็จ",
            showConfirmButton: false,
            timer: 1000
          })
          console.log(data);
          this.emptyFormReport()
        })
      }
    })
  }

  getRoomNumber() {
    console.log(this.userId);
    this.callapi.getUserByID(this.userId).subscribe(data => {
      console.log(data);
      
      this.callapi.getUserDetailById(data.userDetailId).subscribe(i => {
        this.roomNumber = i.roomNumber;
        console.log(this.roomNumber);
        this.callapi.getRoomByNumber(this.roomNumber).subscribe(roomData => {
          this.roomId = roomData.roomId;
          console.log(this.roomId);
          
        })

      })
    })
  }


  ngOnInit(): void {
    this.getRoomNumber()
  }

}
