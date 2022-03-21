import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { invoice } from 'src/app/Models/invoice';
import { room } from 'src/app/Models/room';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice-data',
  templateUrl: './invoice-data.component.html',
  styleUrls: ['./invoice-data.component.css']
})
export class InvoiceDataComponent implements OnInit {

  roomAllData: any
  getDataRoomById: any
  dataSource: any
  roomStatusData: any
  invoiceAllData: any
  invoice: any[] = []
  showInvoiceFilterMonth: any
  getInvoiceId: any
  getInvoiceIdData: any

  formInvoice: any
  formRoom: any
  formFindMonth: any

  getWaterMeter: any
  getPowerMeter: any

  statusLogin: any
  permission: any
  dataUserName: any

  getWaterMeterDataInRoom: any
  getPowerMeterDataInRoom: any
  getRoomRate: any
  getRoomNumber: any
  getRoomId: any

  roomrateTypeFan: any
  roomrateTypeAir: any

  waterMeterOld: number
  meterWater: number
  meterWaterUnit: number
  meterWaterPrice: number
  meterWaterTotlePrice: number
  meterPowerTotlePrice: number
  meterPower: number
  meterPowerUnit: number
  meterPowerPrice: number
  powerMeterOld: number

  otherPrice: number = 0
  invoiceTotal: number = 0

  displayedColumns: string[] = ['ห้องที่', 'สถานะห้อง', 'มิเตอร์น้ำ', 'มิเตอร์ไฟ', 'เพิ่มเติม'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public callapi: ApiService, public fb: FormBuilder, public router: Router, public dialog: MatDialog) {
    this.statusLogin = localStorage.getItem('statuslogin')
    this.permission = localStorage.getItem('permission')
    this.dataUserName = localStorage.getItem('iduserName')
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
      this.formFindMonth = this.fb.group({
        monthStart: null,
        monthEnd: null,
      })
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  patchValue(receiveInvoiceId: invoice) {
    console.log(receiveInvoiceId);

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

  emptyFormInvoice() {
    this.formInvoice.patchValue({
      invoiceId: null,
      invoiceNumber: null,
      invoiceRoomRate: null,
      waterMeterOld: null,
      waterMeterNew: null,
      waterMeterUnit: null,
      waterPrice: null,
      waterTotalPrice: null,
      powerMeterOld: null,
      powerMeterNew: null,
      powerMeterUnit: null,
      powerPrice: null,
      powerTotalPrice: null,
      centerService: null,
      otherNote: null,
      otherPrice: null,
      invoiceStatus: null,
      invoiceTotal: null,
      creationDateTime: null,
      status: null,
      roomId: null,
    })
  }

  getRoomByStatus() {
    this.callapi.getRoomByRoomStatus("ไม่ว่าง").subscribe(room => {
      this.roomStatusData = room;
      this.getWaterMeterDataInRoom = room.waterMeter
      this.getPowerMeterDataInRoom = room.powerMeter

    })
  }

  getRoomById(roomId: string) {
    this.emptyFormInvoice()
    this.meterWater = null
    this.meterWaterUnit = null
    this.meterPower = null
    this.meterPowerUnit = null
    this.waterMeterOld = null
    this.powerMeterOld = null
    this.meterWaterTotlePrice = 0
    this.meterPowerTotlePrice = 0
    this.callapi.getRoomById(roomId).subscribe(roomData => {
      this.getDataRoomById = roomData;
      this.getRoomNumber = roomData.roomNumber
      this.getRoomId = roomData.roomId
      this.getRoomRate = roomData.roomType
      console.log(this.getRoomRate);

      if (this.invoiceAllData.length == 0) {
        this.formInvoice.value.waterMeterOld = roomData.waterMeter
        this.formInvoice.value.powerMeterOld = roomData.powerMeter
        this.waterMeterOld = roomData.waterMeter
        this.powerMeterOld = roomData.powerMeter
      }
      for (let i = 0; i < this.invoiceAllData.length; i++) {
        if (this.invoiceAllData[i].roomId == this.getRoomId) {  //ถ้าไอดีตรง จะเอาเลขมิเตอร์ของเดือนที่แล้ว มาใส่ของอันที่จะสร้าง
          this.formInvoice.value.waterMeterOld = this.invoiceAllData[i].waterMeterNew
          this.formInvoice.value.powerMeterOld = this.invoiceAllData[i].powerMeterNew
          this.waterMeterOld = this.invoiceAllData[i].waterMeterNew
          this.powerMeterOld = this.invoiceAllData[i].powerMeterNew
        } else { //ถ้าไอดีไม่ตรง หมายความว่าเป็นห้้องใหม่ที่ยังไม่เคยสร้างบิล จะนำเอาเลขมิเตอร์ตอนสร้างห้องมาใส่แทน
          if (this.formInvoice.value.waterMeterOld == null || this.formInvoice.value.powerMeterOld == null) {
            this.formInvoice.value.waterMeterOld = roomData.waterMeter
            this.formInvoice.value.powerMeterOld = roomData.powerMeter
            this.waterMeterOld = roomData.waterMeter
            this.powerMeterOld = roomData.powerMeter
          }
        }
      }
    })

  }

  getInvoiceByFilterMonth() {
    let date = new Date();
    console.log(date);
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
          this.invoice[0] = data
          this.showInvoiceFilterMonth = data
          console.log(this.invoice[0]);
          // console.log(this.invoice[0].pop());
        })
    }
  }

  getAllInvoice() {
    this.callapi.getAllInvoice().subscribe(data => {
      this.invoiceAllData = data
      console.log(this.invoiceAllData);
    })
  }

  getInvoiceById(id: string) {
    this.callapi.getInvoiceById(id).subscribe(data => {
      this.getInvoiceIdData = data
      this.getInvoiceId = data.invoiceId
      this.patchValue(this.getInvoiceIdData)
      console.log(this.formInvoice.value);
    })
  }


  onCreateInvoiceData() {
    this.callapi.getAllSetting().subscribe(data => {
      this.formInvoice.value.waterPrice = data[0].waterPrice
      this.formInvoice.value.powerPrice = data[0].powerPrice
      this.formInvoice.value.centerService = data[0].centerService
      this.roomrateTypeFan = data[0].roomrateTypeFan
      this.roomrateTypeAir = data[0].roomrateTypeAir

      if (this.getRoomRate == "แอร์") {
        this.formInvoice.value.invoiceRoomRate = this.roomrateTypeAir
      } else {
        this.formInvoice.value.invoiceRoomRate = this.roomrateTypeFan
      }
      if (this.formInvoice.value != null) {
        this.formInvoice.value.waterMeterUnit = this.formInvoice.value.waterMeterNew - this.formInvoice.value.waterMeterOld
        this.formInvoice.value.powerMeterUnit = this.formInvoice.value.powerMeterNew - this.formInvoice.value.powerMeterOld
        this.formInvoice.value.waterTotalPrice = this.formInvoice.value.waterMeterUnit * this.formInvoice.value.waterPrice
        this.formInvoice.value.powerTotalPrice = this.formInvoice.value.powerMeterUnit * this.formInvoice.value.powerPrice
        this.formInvoice.value.invoiceTotal = (this.formInvoice.value.centerService + this.formInvoice.value.invoiceRoomRate)
        this.formInvoice.value.invoiceTotal += this.formInvoice.value.waterTotalPrice
        this.formInvoice.value.invoiceTotal += this.formInvoice.value.powerTotalPrice
      }

      this.formInvoice.value.status = "Open"
      this.formInvoice.value.otherNote = ""
      this.formInvoice.value.otherPrice = 0
      this.formInvoice.value.invoiceStatus = "ยังไม่ส่งบิล"
      this.formInvoice.value.roomNumber = this.getRoomNumber
      this.formInvoice.value.roomId = this.getRoomId
      this.formInvoice.value.creationDateTime = new Date
      console.log(this.formInvoice.value);
      this.callapi.createInvoice(this.formInvoice.value).subscribe(data => {
        Swal.fire({
          position: "center",
          icon: 'success',
          title: "บันทึกแล้ว",
          showConfirmButton: false,
          timer: 1000
        })
      })
      this.getAllInvoice()
      this.getRoomByStatus()
      this.emptyFormInvoice()
    })
  }

  onEditInvoiceData() {
    this.formInvoice.value.invoiceStatus = "ยังไม่ชำระ"
    this.formInvoice.value.otherPrice = this.otherPrice

    console.log(this.formInvoice.value);
    this.callapi.editInvoice(this.getInvoiceId, this.formInvoice.value).subscribe(data => {
      console.log(data);
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "ส่งบิลแล้ว",
        showConfirmButton: false,
        timer: 1000
      })
      this.getAllInvoice()
      this.getRoomByStatus()
      this.emptyFormInvoice()
    })
  }


  calEditInvoice() {
    this.invoiceTotal += this.otherPrice
  }
  calMeterWater() {
    this.meterWaterUnit = this.meterWater - this.waterMeterOld
    this.meterWaterTotlePrice = this.meterWaterPrice * this.meterWaterUnit
  }
  calMeterPower() {
    this.meterPowerUnit = this.meterPower - this.powerMeterOld
    this.meterPowerTotlePrice = this.meterPowerPrice * this.meterPowerUnit
  }

  getAllSetting() {
    this.callapi.getAllSetting().subscribe(data => {
      this.formInvoice.value.waterPrice = data[0].waterPrice
      this.formInvoice.value.powerPrice = data[0].powerPrice
      this.formInvoice.value.centerService = data[0].centerService
      this.roomrateTypeFan = data[0].roomrateTypeFan
      this.roomrateTypeAir = data[0].roomrateTypeAir

      this.meterWaterPrice = data[0].waterPrice
      this.meterPowerPrice = data[0].powerPrice
    })
  }

  ngOnInit() {
    this.getInvoiceByFilterMonth()
    this.getRoomByStatus()
    this.getAllInvoice()
    this.getAllSetting()
  }

}

