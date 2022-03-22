import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { setting } from 'src/app/Models/setting';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  formSetting: any
  settingAllData: any
  showButtonCreate: boolean = false
  showButtonEdit: boolean = true
  constructor(public router: Router, public callapi: ApiService, public fb: FormBuilder) {
    this.formSetting = fb.group({
      settingId: [null],
      waterPrice: [null],
      powerPrice: [null],
      centerService: [null],
      roomrateTypeAir: [null],
      roomrateTypeFan: [null],
      creationDatetime: [null],
      status: [null],
    })
  }

  patchValue(receiveSetting: setting) {
    this.formSetting.patchValue({
      settingId: receiveSetting.settingId,
      waterPrice: receiveSetting.waterPrice,
      powerPrice: receiveSetting.powerPrice,
      centerService: receiveSetting.centerService,
      roomrateTypeAir: receiveSetting.roomrateTypeAir,
      roomrateTypeFan: receiveSetting.roomrateTypeFan,
      creationDatetime: receiveSetting.creationDatetime,
      status: receiveSetting.status,
    })
  }

  getAllSetting() {
    this.callapi.getAllSetting().subscribe(data => {
      this.settingAllData = data
      this.patchValue(this.settingAllData[0])
      console.log(data);
      if (this.settingAllData.length == 0) {
        this.showButtonCreate = true
        this.showButtonEdit = false
      } else {
        this.showButtonCreate = false
        this.showButtonEdit = true
      }

    })
  }

  onCreateSetting() {
    this.showButtonCreate = false
    this.formSetting.value.creationDatetime = new Date
    this.formSetting.value.status = "Open"
    this.formSetting.value.waterPrice = 0
    this.formSetting.value.powerPrice = 0
    this.formSetting.value.centerService = 0
    this.formSetting.value.roomrateTypeAir = 0
    this.formSetting.value.roomrateTypeFan = 0

    console.log(this.formSetting.value);

    this.callapi.createSetting(this.formSetting.value).subscribe(data => {
      console.log(data);

      this.getAllSetting();
    })
  }

  onEditSetting() {
    this.formSetting.value.status = "Open"
    this.formSetting.value.creationDatetime = new Date
    this.formSetting.value.settingId = "S000"
    console.log(this.formSetting.value);
    this.callapi.editSetting(this.formSetting.value.settingId, this.formSetting.value).subscribe(data => {
      console.log(data);
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "สำเร็จ",
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  ngOnInit(): void {
    this.getAllSetting()
  }

}