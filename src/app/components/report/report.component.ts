import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { report } from 'src/app/Models/report';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  dataSource: any
  displayedColumns: string[] = ['ห้องที่', 'หัวข้อ', 'ข้อความ','วันที่', 'สถานะ', 'เพิ่มเติม', 'ย้ายไปข้อมูลรวม'];
  formReport: any
  formRoom: any
  reportData: any
  reportDataById: any
  statusLogin: any
  permission: any
  dataUserName: any

  constructor(public callapi: ApiService, public fb: FormBuilder, public router: Router) {
    this.statusLogin = localStorage.getItem('statuslogin')
    this.permission = localStorage.getItem('permission')
    this.dataUserName = localStorage.getItem('iduserName')
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

  getAllReport() {
    this.callapi.getAllReport().subscribe(data => {
      this.reportData = data
      this.dataSource = data
      console.log(data);
    })
  }

  // getReportByStatus(){
  //   this.callapi.getReportByStatus("รอยืนยัน").subscribe(data =>{
  //     console.log(data);
      
  //     this.dataSource = data
  //   })
  // }

  getReportById(id: string, check : number) {
    this.callapi.getReportById(id).subscribe(data => {
      this.reportDataById = data
      console.log(data);
      if(check == 1){
          this.onChangeStatus(data.reportId)
      }else if(check == 2){
        this.onDelete(data.reportId)
      }
    })
  }

  onDelete(id : string){
    this.callapi.deleteReport(id).subscribe(data => {
      this.getAllReport();
    })
  }

  onChangeStatus(id : string) {
    this.formReport.value = this.reportDataById
    this.formReport.value.reportStatus = "ยืนยันแล้ว"
    this.callapi.editReport(id , this.formReport.value).subscribe(data => {
      this.dataSource = data
      console.log("แก้ไขเรียบร้อย");
      this.getAllReport();
    })
  }

  ngOnInit(): void {
    this.getAllReport()
  }

}
