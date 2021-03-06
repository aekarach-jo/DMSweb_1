import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { room } from 'src/app/Models/room';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomAllData: any
  formRoom: any
  getDataRoomById: any
  searchText: any
  emptyRoom = "ว่าง"
  busyRoom = "ไม่ว่าง"
  reserveRoom = "จอง"
  filterFloor: any

  statusLogin: any
  permission: any
  dataUserName: any

  settingData: any
  valid: any[] = []

  fan: any
  air: any


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

  constructor(public router: Router, public callapi: ApiService, public fb: FormBuilder) {
    this.statusLogin = localStorage.getItem('statuslogin')
    this.permission = localStorage.getItem('permission')
    this.dataUserName = localStorage.getItem('iduserName')
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



  patchValue(receiveRoomId: room) {
    this.formRoom.patchValue({
      roomId: receiveRoomId.roomId,
      roomType: receiveRoomId.roomType,
      roomNumber: receiveRoomId.roomNumber,
      roomRate: receiveRoomId.roomRate,
      waterMeter: receiveRoomId.waterMeter,
      powerMeter: receiveRoomId.powerMeter,
      floor: receiveRoomId.floor,
      roomStatus: receiveRoomId.roomStatus,
      status: receiveRoomId.status,
      userId: receiveRoomId.userId,
    })
  }

  emptyFormRoom() {
    this.formRoom.patchValue({
      roomId: "",
      roomType: "",
      roomNumber: "",
      roomRate: "",
      waterMeter: "",
      powerMeter: "",
      floor: "",
      roomStatus: "",
      status: "",
      userId: ""
    })
  }

  getAllRoom() {
    this.callapi.getAllRoom().subscribe(data => {
      this.roomAllData = data;

    })
  }

  getRoomById(roomId: string) {
    this.callapi.getRoomById(roomId).subscribe(data => {
      this.getDataRoomById = data;
      this.patchValue(this.getDataRoomById);
    })
  }

  getRoomByFloor(floor: string) {
    this.callapi.getRoomByFloor(floor).subscribe(floor => {
      this.roomAllData = floor
    })
  }

  onCreateRoom() {

    if (this.formRoom.value.roomType == "พัดลม") {
      this.formRoom.value.roomRate = this.fan
    } else if (this.formRoom.value.roomType == "แอร์") {
      this.formRoom.value.roomRate = this.air

    }
    this.callapi.createRoom(this.formRoom.value).subscribe(data => {
      this.Toast.fire({
        icon: 'success',
        title: 'สำเร็จ'
      })
      this.getAllRoom();
      this.emptyFormRoom();
    })

  }

  onEditRoom(roomId: string) {
    this.callapi.editRoom(roomId, this.formRoom.value).subscribe(data => {
      this.Toast.fire({
        icon: 'success',
        title: 'แก้ไข้แล้ว'
      })
      this.emptyFormRoom();
      this.getAllRoom();
    })
  }

  onDeleteRoom(roomId: string, roomNumber: string) {
    Swal.fire({
      position: 'center',
      text: "ต้องการลบห้อง " + roomNumber + " หรือไม่",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: '#2aad19',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.callapi.deleteRoom(roomId).subscribe(data => {
          this.Toast.fire({
            icon: 'success',
            title: 'ลบแล้ว'
          })
          this.getAllRoom();
        })
      }
    })
  }

  getAllSetting() {
    this.callapi.getAllSetting().subscribe(data => {
      this.settingData = data
      if (this.settingData.length == 0) {
        Swal.fire({
          title: 'กรุณาตั้งค่าก่อนสร้างห้อง',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'ไปยังหน้าตั้งค่า',
          confirmButtonColor: '#313131',
          showLoaderOnConfirm: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showCloseButton: false,
          preConfirm: () => {
            localStorage.setItem('index', '7')
            this.router.navigateByUrl('/setting')
          }
        })
      } else {
        for (let i = 0; i < this.settingData.length; i++) {
          this.air = this.settingData[i].roomrateTypeAir
          this.fan = this.settingData[i].roomrateTypeFan
        }
      }
    })
  }

  ngOnInit() {
    this.getAllRoom();
    this.getAllSetting();
  }
}

