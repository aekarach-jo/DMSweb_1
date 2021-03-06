import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { user } from './Models/user';
import { ApiService } from './Services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DMSweb_V2';
  showRegisterPage: number = 1
  formUser: any
  permission: any
  filterByPermission: any
  formLogin: any
  statusLogin: any
  submitLogin: boolean = false
  statusUsername: boolean = false
  versionForHtml: any
  dataUserName: any
  checkAdminIsEmpty: any

  status: boolean = false
  constructor(public router: Router, public fb: FormBuilder, public callApi: ApiService) {
    this.statusLogin = localStorage.getItem('statuslogin')
    this.permission = localStorage.getItem('permission')
    this.dataUserName = localStorage.getItem('iduserName')
    this.formLogin = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
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

  get formValidLogin() { return this.formLogin.controls }


  elem = document.documentElement
  onClickFullScreen(statusClick) {
    this.status = statusClick
    if (this.elem.requestFullscreen || statusClick == true) {
      this.elem.requestFullscreen();
      this.status = true
    }
  }

  onClickCloseFullScreen(statusClick) {
    this.status = statusClick
    if (document.exitFullscreen || statusClick == false) {
      document.exitFullscreen();
      this.status = false
    }
  }

  checkUserAndPass() {
    if (this.formLogin.value.userName == "") {
      this.submitLogin = true
      this.statusUsername = false
      this.formLogin.value.userName = null
    } else if ((this.formLogin.value.userName == null && this.formLogin.value.password == null) || (this.formLogin.value.userName == "" && this.formLogin.value.password == "")) {
      this.submitLogin = true
      this.statusUsername = false
    }

    //  checkvalidator //
    if (this.formLogin.value.userName != null) {
      this.callApi.checkUser(this.formLogin.value.userName).subscribe(data => {
        if (data.toString() == '?????????????????????????????????????????????') {
          if (this.formLogin.value.password != null) {
            this.callApi.getUserByUsername(this.formLogin.value.userName).subscribe(user => {
              if (user.password == this.formLogin.value.password) {
                this.login()
                this.submitLogin = false
              } else {
                this.submitLogin = true
                this.statusUsername = true
              }
            })
          } else {
            this.submitLogin = true
            this.statusUsername = true
          }
        } else {
          this.submitLogin = true
          this.statusUsername = true
        }
      })
    }
  }

  loginWithGuest() {
    this.formLogin.value.userName = "GUEST"
    this.formLogin.value.password = "GUEST"
    this.checkUserAndPass()
  }

  login() {
    this.callApi.checkUserAndPass(this.formLogin.value.userName, this.formLogin.value.password).subscribe(user => {
      localStorage.setItem('iduser', user.userId)
      localStorage.setItem('iduserName', user.userName)
      localStorage.setItem('permission', user.permission)
      localStorage.setItem('statuslogin', 'login')
      this.statusLogin = localStorage.getItem('statuslogin')
      this.permission = localStorage.getItem('permission')
      this.dataUserName = localStorage.getItem('iduserName')
      if (user.permission == 'ADMIN') {
        this.router.navigateByUrl('/room')
      }
      if (user.permission == 'OWNER') {
        this.router.navigateByUrl('/room')
      }
      if (user.permission == 'USER') {
        this.router.navigateByUrl('/room')
      }
      if (user.permission == 'GUEST') {
        this.router.navigateByUrl('/room')
      }
    }, error => {
      this.submitLogin = true
      this.statusUsername = true
    })

  }

  onChange() {
    this.submitLogin = false
    this.statusUsername = false
  }

  logout() {
    Swal.fire({
      position: 'center',
      text: "????????????????????????????????????????",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: '??????????????????',
      confirmButtonColor: '#2aad19',
      confirmButtonText: '??????????????????'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: '??????????????????',
          showCloseButton: false,
          showConfirmButton: false,
          timer: 800
        }).then((res) => {
          localStorage.setItem('statuslogin', 'logout')
          localStorage.removeItem('iduser')
          localStorage.removeItem('permission')
          localStorage.removeItem('user')
          localStorage.removeItem('iduserName')
          window.location.reload()
        })

      }

    })

  }

  patchValue(receiveUser: user) {
    this.formUser.patchValue({
      userId: receiveUser.userId,
      userName: receiveUser.userName,
      password: receiveUser.password,
      permission: receiveUser.permission,
      userStatus: receiveUser.userStatus,
      creationDateTime: receiveUser.creationDateTime,
      deletetionDateTime: receiveUser.deletetionDateTime,
      userDetailId: receiveUser.userDetailId,
      Status: receiveUser.Status
    })
  }

  emptyForm() {
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

  onSwitchPage() {
    if (this.showRegisterPage == 0) {
      this.showRegisterPage = 1;
    } else {
      this.showRegisterPage = 0
    }
  }


  getAllUser() {
    this.callApi.getAllUser().subscribe(user => {
      this.checkAdminIsEmpty = user
    })
  }

  getUserById(id: string) {
    this.callApi.getUserByID(id).subscribe(user => {
    })
  }

  oncreateUser() {
    this.formUser.value.Status = "Open"
    this.formUser.value.userStatus = "Open"
    this.formUser.value.permission = "ADMIN"
    this.formUser.value.creationDateTime = new Date
    this.callApi.createUser(this.formUser.value).subscribe(data => {
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "??????????????????",
        showConfirmButton: false,
        timer: 1000
      })
      this.onSwitchPage()
      this.emptyForm();
      this.getAllUser();
    })
  }

  checkFilterPermission(permission: string) {
    if (permission == "ADMIN") {
      this.filterByPermission = "ADMIN";
    } else if (permission == "USER") {
      this.filterByPermission = "USER";
    } else if (permission == "OWNER") {
      this.filterByPermission = "OWNER"
    } else if (permission == "GUEST") {
      this.filterByPermission = "GUEST"
    } else {
      this.filterByPermission = ""
    }
  }

  // popupToShowCheckout(){
  //   let dates = new Date

  //   console.log(dates);


  //   Swal.fire({
  //     position: "center",
  //     icon: 'warning',
  //     title: "????????????????????????????????????????????????????????????",
  //     showConfirmButton: false,
  //   })
  // }

  ngOnInit() {
    this.getAllUser();
    // this.popupToShowCheckout()
  }
}
