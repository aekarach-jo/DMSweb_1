import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { checkout } from 'src/app/Models/checkout';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  displayedColumns: string[] = ['ห้องที่', 'วันที่ต้องการออก', 'สถานะการค้างชำระ', 'สถานะ'];
  dataSource: any
  formCheckout: any
  checkoutDataById: any
  constructor(public callapi: ApiService, public fb: FormBuilder, public router: Router) {
    this.formCheckout = fb.group({
      checkoutId: [null],
      checkoutStatus: [null],
      checkoutDate: [null],
      roomNumber: [null],
      invoiceStatus: [null],
      userId: [null],
      creationDateTime: [null],
      status: [null],
    })
  }

  patchValue(receiveCheckoutId: checkout) {
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

  getAllCheckout() {
    this.callapi.getAllCheckout().subscribe(dataCheckout => {
      this.dataSource = dataCheckout
      console.log(this.dataSource);
    })
  }

  getCheckoutById(check: string) {
    this.callapi.getCheckoutById(check).subscribe(data => {
      this.checkoutDataById = data
      this.patchValue(this.checkoutDataById)
      this.onChangeStatusCheckout()
    })
  }

  onChangeStatusCheckout() {
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
        if (this.formCheckout.value.invoiceStatus == 'ชำระแล้ว') {
          this.callapi.getRoomByNumber(this.formCheckout.value.roomNumber).subscribe(room => {
            this.callapi.getUserByID(this.formCheckout.value.userId).subscribe(user => {
              this.callapi.getUserDetailById(user.userDetailId).subscribe(userData => {

                room.roomStatus = "ว่าง"
                console.log(room.roomId);
                userData.userStatus = "Out"
                userData.dateOut = new Date
                this.formCheckout.value.checkoutStatus = 'สำเร็จแล้ว'

                this.callapi.editRoom(room.roomId, room).subscribe(status => { })
                this.callapi.deleteUser(user.userId).subscribe(status => { })
                this.callapi.editUserDetail(userData.userDetailId, userData).subscribe(status => { })
                this.callapi.editCheckout(this.formCheckout.value.checkoutId, this.formCheckout.value).subscribe(status => {
                  this.getAllCheckout()
                  Swal.fire({
                    position: "center",
                    icon: 'success',
                    title: "สำเร็จ",
                    showConfirmButton: false,
                    timer: 1000
                  })
                })
              })
            })
          })

        } else {
          Swal.fire({
            position: "center",
            icon: 'warning',
            title: "มีบิลค้างชำระ",
            showConfirmButton: false,
            timer: 1000
          })
        }
      }
    })
  }

  onDeleteCheckout() {
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
        this.callapi.deleteCheckout(this.formCheckout.value.checkoutId).subscribe(data => { })
      }
    })
  }




  ngOnInit(): void {
    this.getAllCheckout();
  }

}
