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

  constructor(public router: Router, public callapi: ApiService, public fb: FormBuilder) {
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

  filter(data: string) {

  }

  getAllRoom() {
    this.callapi.getAllRoom().subscribe(data => {
      this.roomAllData = data;
      console.log(this.roomAllData);
    })
  }

  getRoomById(roomId: string) {
    this.callapi.getRoomById(roomId).subscribe(data => {
      this.getDataRoomById = data;
      console.log(this.getDataRoomById);
      this.patchValue(this.getDataRoomById);
    })
  }

  onCreateRoom() {
    this.callapi.createRoom(this.formRoom.value).subscribe(data => {
      console.log(data);
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "สำเร็จ",
        showConfirmButton: false,
        timer: 1000
      })
      this.getAllRoom();
      this.emptyFormRoom();
    })
  }

  onEditRoom(roomId: string) {
    this.callapi.editRoom(roomId, this.formRoom.value).subscribe(data => {
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "สำเร็จ",
        showConfirmButton: false,
        timer: 1000
      })
      this.emptyFormRoom();
      this.getAllRoom();
    })
  }

  onDeleteRoom(roomId: string) {
    this.callapi.deleteRoom(roomId).subscribe(data => {
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "ลบห้องสำเร็จ",
        showConfirmButton: false,
        timer: 1000
      })
      this.getAllRoom();
    })
  }

  ngOnInit() {
    this.getAllRoom();
  }
}

