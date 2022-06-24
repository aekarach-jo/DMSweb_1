import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { checkout } from 'src/app/Models/checkout';
import { invoice } from 'src/app/Models/invoice';
import { report } from 'src/app/Models/report';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

declare var datePicker: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['ห้องที่', 'รายละเอียด', 'วันที่', 'เวลา', 'เพิ่มเติม'];

  selectedFile: File = null
  formCheckout: any
  formReport: any
  formRoom: any
  formInvoice: any
  switchPage = 1
  roomNumber: any
  roomId: any
  userDetailId: any
  userDetailName: any
  statusLogin: any
  permission: any
  dataUserName: any
  userId: any
  formFindMonth: any
  showInvoiceFilterMonth: any
  invoicData: any
  showInvoiceNumber: any
  showCreationDate: any
  dataSource: any
  reportDataById: any
  getId: any
  showRoomNumber: any
  invoiceAllData: any
  getInvoiceIdData: any
  getInvoiceId: any
  invoiceTotal: any
  roomStatusData: any
  reportDataByRoomId: any[] = []
  showInvoiceAllData: any[] = []
  checkBtn: any
  selected: Date | null;
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
      }),
      this.formInvoice = fb.group({
        invoiceId: [null],
        invoiceNumber: [null],
        invoiceRoomRate: [null],
        waterMeterOld: [null],
        waterMeterNew: [null],
        waterMeterUnit: [null],
        waterPrice: [null],
        waterTotalPrice: [null],
        powerMeterOld: [null],
        powerMeterNew: [null],
        powerMeterUnit: [null],
        powerPrice: [null],
        powerTotalPrice: [null],
        centerService: [null],
        otherNote: [null],
        otherPrice: [null],
        invoiceStatus: [null],
        invoiceTotal: [null],
        creationDateTime: [null],
        status: [null],
        roomId: [null],
      }),
      this.formCheckout = fb.group({
        checkoutId: [null],
        checkoutStatus: [null],
        checkoutDate: [null],
        roomNumber: [null],
        invoiceStatus: [null],
        userId: [null],
        creationDateTime: [null],
        status: [null],
      }),
      this.formFindMonth = this.fb.group({
        monthStart: null,
        monthEnd: null,
      })
  }

  patchValue3(receiveCheckoutId: checkout) {
    this.formCheckout.patchValue({
      checkoutId: receiveCheckoutId.checkoutId,
      checkoutStatus: receiveCheckoutId.checkoutStatus,
      checkoutDate: receiveCheckoutId.checkoutDate,
      roomNumber: receiveCheckoutId.roomNumber,
      invoiceStatus: receiveCheckoutId.invoiceStatus,
      userId: receiveCheckoutId.userId,
      creationDateTime: receiveCheckoutId.creationDateTime,
      status: receiveCheckoutId.status,
    })
  }

  patchValue2(receiveInvoiceId: invoice) {
    this.formInvoice.patchValue({
      invoiceId: receiveInvoiceId.invoiceId,
      invoiceNumber: receiveInvoiceId.invoiceNumber,
      invoiceRoomRate: receiveInvoiceId.invoiceRoomRate,
      waterMeterOld: receiveInvoiceId.waterMeterOld,
      waterMeterNew: receiveInvoiceId.waterMeterNew,
      waterMeterUnit: receiveInvoiceId.waterMeterUnit,
      waterPrice: receiveInvoiceId.waterPrice,
      waterTotalPrice: receiveInvoiceId.waterTotalPrice,
      powerMeterOld: receiveInvoiceId.powerMeterOld,
      powerMeterNew: receiveInvoiceId.powerMeterNew,
      powerMeterUnit: receiveInvoiceId.powerMeterUnit,
      powerPrice: receiveInvoiceId.powerPrice,
      powerTotalPrice: receiveInvoiceId.powerTotalPrice,
      centerService: receiveInvoiceId.centerService,
      otherNote: receiveInvoiceId.otherNote,
      otherPrice: receiveInvoiceId.otherPrice,
      invoiceStatus: receiveInvoiceId.invoiceStatus,
      invoiceTotal: receiveInvoiceId.invoiceTotal,
      creationDateTime: receiveInvoiceId.creationDateTime,
      status: receiveInvoiceId.status,
      roomId: receiveInvoiceId.roomId,
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
    } else if (num == 2) {
      this.emptyFormReport()
      this.switchPage = 2
    } else {
      this.switchPage = 3
      this.getAllInvoice()
    }
  }

  getRoomNumber() {
    this.callapi.getUserByID(this.userId).subscribe(data => {
      this.callapi.getUserDetailById(data.userDetailId).subscribe(i => {
        this.roomNumber = i.roomNumber;
        this.userDetailName = i.firstName
        this.callapi.getRoomByNumber(this.roomNumber).subscribe(roomData => {
          this.roomId = roomData.roomId;
          this.getInvoiceByFilterMonth()
          this.getAllReport()
        })
      })
    })
  }

  getAllInvoice() {
    this.showInvoiceAllData = []
    this.callapi.getAllInvoice().subscribe(data => {
      this.invoiceAllData = data
      for (let i = 0; i < this.invoiceAllData.length; i++) {
        if (this.invoiceAllData[i].roomId == this.roomId) {
          this.showInvoiceAllData.push(this.invoiceAllData[i])
        }
      }
    })
  }

  getInvoiceById(id: string) {
    this.callapi.getInvoiceById(id).subscribe(data => {
      this.getInvoiceIdData = data
      this.getInvoiceId = data.invoiceId
      this.showInvoiceNumber = data.invoiceNumber
      this.showCreationDate = data.creationDateTime
      this.invoiceTotal = data.invoiceTotal
      this.showRoomNumber = this.roomNumber
      this.patchValue(this.getInvoiceIdData)
    })
  }

  getInvoiceByFilterMonth() {
    let date = new Date();
    this.formFindMonth.value.monthStart = new Date();
    this.formFindMonth.value.monthEnd = new Date();
    this.formFindMonth.value.monthStart.setDate(1);
    this.formFindMonth.value.monthStart.setHours(0);
    this.formFindMonth.value.monthStart.setMinutes(0);
    this.formFindMonth.value.monthStart.setSeconds(0);
    this.formFindMonth.value.monthEnd.setMonth(date.getMonth() + 1);
    this.formFindMonth.value.monthEnd.setDate(1);
    this.formFindMonth.value.monthEnd.setHours(0);
    this.formFindMonth.value.monthEnd.setMinutes(0);
    this.formFindMonth.value.monthEnd.setSeconds(0);
    if (this.formFindMonth != null) {
      this.callapi.getInvoiceByMonth(
        this.formFindMonth.value.monthStart.toUTCString(),
        this.formFindMonth.value.monthEnd.toUTCString()).subscribe((data) => {
          this.showInvoiceFilterMonth = data
          for (let i = 0; i < this.showInvoiceFilterMonth.length; i++) {
            if (this.roomId == this.showInvoiceFilterMonth[i].roomId) {
              this.invoicData = this.showInvoiceFilterMonth[i]
              this.showInvoiceNumber = this.showInvoiceFilterMonth[i].invoiceNumber
              this.showCreationDate = this.showInvoiceFilterMonth[i].creationDateTime
              if (this.showInvoiceFilterMonth[i].invoiceStatus == "ยังไม่ส่งบิล") {
                this.emptyFormReport()
                Swal.fire({
                  icon: 'warning',
                  title: 'ยังไม่มีบิลสำหรับเดือนนี้',
                  position: 'center',
                  showCancelButton: false
                })
              } else if (this.showInvoiceFilterMonth[i].invoiceStatus == "ส่งบิลแล้ว") {
                this.patchValue2(this.invoicData)
              }
            }
          }
        })
    }
  }

  onCreateReport() {
    Swal.fire({
      position: 'center',
      text: "ยืนยันหรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#2aad19',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formReport.value.roomNumber = this.roomNumber
        this.formReport.value.date = new Date;
        this.formReport.value.roomId = this.roomId
        this.formReport.value.reportStatus = "รอยืนยัน"
        this.formReport.value.image = ""
        this.callapi.createReport(this.formReport.value).subscribe(data => {
          Swal.fire({
            position: "center",
            icon: 'success',
            title: "สำเร็จ",
            showConfirmButton: false,
            timer: 1000
          })
          this.emptyFormReport()
        })
      }
    })
  }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
  }

  onCreateReport2() {
    const formData = new FormData();
    Swal.fire({
      position: 'center',
      text: "ยืนยันหรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#2aad19',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formReport.value.roomNumber = this.roomNumber
        this.formReport.value.date = new Date;
        this.formReport.value.roomId = this.roomId
        this.formReport.value.reportStatus = "รอยืนยัน"
        this.formReport.value.image = this.selectedFile
        // this.formReport.value.image = ""

        // console.log(this.formReport.value);
        // formData.append('reportId', this.formReport.value.reportId)
        // formData.append('roomNumber', this.formReport.value.roomNumber)
        // formData.append('reportNumber', this.formReport.value.reportNumber)
        // formData.append('date', this.formReport.value.date)
        // formData.append('title', this.formReport.value.title)
        // formData.append('note', this.formReport.value.note)
        // formData.append('roomId', this.formReport.value.roomId)
        // formData.append('reportStatus', this.formReport.value.reportStatus)
        // formData.append('image', this.formReport.value.image)
        // console.log(formData);
        this.callapi.createReport(this.formReport.value).subscribe(data => {
          Swal.fire({
            position: "center",
            icon: 'success',
            title: "สำเร็จ",
            showConfirmButton: false,
            timer: 1000
          })
          this.emptyFormReport()
        })
      }
    })
  }

  getAllReport() {
    this.reportDataByRoomId = []
    this.callapi.getAllReport().subscribe(data => {
      this.dataSource = data
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].roomId == this.roomId) {

          this.reportDataByRoomId.push(this.dataSource[i])
        }
      }
    })
  }

  getReportById(id: string) {
    this.callapi.getReportById(id).subscribe(data => {
      this.reportDataById = data
      this.getId = data.reportId
      this.showRoomNumber = data.roomNumber
      this.patchValue(this.reportDataById)
    })
  }

  checkPressBtn() {
    Swal.fire({
      position: 'center',
      text: "ยืนยันการคืนห้องพักหรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#2aad19',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.createUserCheckout()
      }
    })
  }

  createUserCheckout() {
    this.formCheckout.value.checkoutStatus = "ยื่นคำร้อง"
    this.formCheckout.value.status = "Open"
    this.formCheckout.value.roomNumber = this.roomNumber
    this.formCheckout.value.invoiceStatus = this.formInvoice.value.invoiceStatus
    this.formCheckout.value.userId = this.userId
    this.formCheckout.value.creationDateTime = new Date
    this.formCheckout.value.checkoutDate = this.selected
    if (this.formCheckout.value.checkoutDate != null) {
      this.callapi.createCheckout(this.formCheckout.value).subscribe(dataCheckout => {
        Swal.fire({
          position: "center",
          icon: 'success',
          title: "สำเร็จ",
          showConfirmButton: false,
          timer: 1000
        })
      })
    } else {
      Swal.fire({
        position: "center",
        icon: 'warning',
        title: "กรุณาเลือกวันที่",
        showConfirmButton: false,
        timer: 1000
      })
    }

  }


  ngOnInit(): void {
    this.getRoomNumber()

  }
}
