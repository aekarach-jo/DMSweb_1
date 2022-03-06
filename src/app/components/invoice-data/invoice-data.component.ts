import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { invoice } from 'src/app/Models/invoice';
import { room } from 'src/app/Models/room';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-invoice-data',
  templateUrl: './invoice-data.component.html',
  styleUrls: ['./invoice-data.component.css']
})
export class InvoiceDataComponent implements OnInit {

  invoiceData: any
  roomAllData: any
  getDataRoomById: any
  dataSource: any
  roomStatusData : any

  formInvoice: any
  formRoom: any

  statusLogin: any
  permission: any
  dataUserName: any

  displayedColumns: string[] = ['ห้องที่', 'สถานะห้อง', 'มิเตอร์น้ำ', 'มิเตอร์ไฟ','เพิ่มเติม'];

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
      powerMeterOld: [null],
      powerMeterNew: [null],
      powerMeterUnit: [null],
      centerCervice: [null],
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
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  patchValue(receiveInvoiceId: invoice) {
    this.formInvoice.patchValue({
      invoiceId: receiveInvoiceId.invoiceId,
      invoiceNumber: receiveInvoiceId.invoiceNumber,
      invoiceRoomRate: receiveInvoiceId.invoiceRoomRate,
      waterMeterOld: receiveInvoiceId.waterMeterOld,
      waterMeterNew: receiveInvoiceId.waterMeterNew,
      waterMeterUnit: receiveInvoiceId.waterMeterUnit,
      powerMeterOld: receiveInvoiceId.powerMeterOld,
      powerMeterNew: receiveInvoiceId.powerMeterNew,
      powerMeterUnit: receiveInvoiceId.powerMeterUnit,
      centerCervice: receiveInvoiceId.centerCervice,
      invoiceStatus: receiveInvoiceId.invoiceStatus,
      invoiceTotal: receiveInvoiceId.invoiceTotal,
      creationDateTime: receiveInvoiceId.creationDateTime,
      status: receiveInvoiceId.status,
      roomId: receiveInvoiceId.roomId,
    })
  }


  onCreateInvoiceData(){
    
  }


  getRoomByStatus() {
    this.callapi.getRoomByRoomStatus("ไม่ว่าง").subscribe(room => {
      this.roomStatusData = room;
      this.dataSource = new MatTableDataSource(this.roomStatusData);
    })
  }

  getRoomById(roomId: string) {
    this.callapi.getRoomById(roomId).subscribe(data => {
      this.getDataRoomById = data;
      console.log(this.getDataRoomById);
      this.patchValue(this.getDataRoomById);
    })
  }

  ngOnInit() { 
    this.getRoomByStatus()
  }

}

