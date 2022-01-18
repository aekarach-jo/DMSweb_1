import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from './Models/user';
import { ApiService } from './Services/api.service';

declare const userDesign : any ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DMSweb_V2';
  num = 1
  showRegisterPage: number = 0
  formUser: any
  dataUser: any
  filterByPermission: any
  formLogin: any
  statusLogin: any
  submitLogin: boolean = false
  statusUsername: boolean = false
  versionForHtml: any
  dataUserName: any
  constructor(public router: Router, public fb: FormBuilder, public callApi: ApiService) {
    this.statusLogin = localStorage.getItem('statuslogin')
    this.dataUser = localStorage.getItem('permission')
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
        if (data.toString() == 'ไอดีนี้มีในระบบ') {
          if (this.formLogin.value.password != null) {
            this.callApi.getUserByUsername(this.formLogin.value.userName).subscribe(user => {
              console.log(user);
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

  login() {
    this.callApi.checkUserAndPass(this.formLogin.value.userName, this.formLogin.value.password).subscribe(user => {
      localStorage.setItem('iduser', user.userId)
      localStorage.setItem('iduserName', user.userName)
      localStorage.setItem('permission', user.permission)
      localStorage.setItem('statuslogin', 'login')
      this.statusLogin = localStorage.getItem('statuslogin')
      this.dataUser = localStorage.getItem('permission')
      this.dataUserName = localStorage.getItem('iduserName')
      if (user.permission == 'ADMIN') {
        console.log(user.permission);
        // this.router.navigateByUrl('/room')
      }
      if (user.permission == 'OWNER') {
        console.log(user.permission);
        // this.router.navigateByUrl('/room')
      }
      if (user.permission == 'USER') {
        console.log(user.permission);
        // this.router.navigateByUrl('/room')
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
    localStorage.setItem('statuslogin', 'logout')
    localStorage.removeItem('iduser')
    localStorage.removeItem('permission')
    localStorage.removeItem('user')
    localStorage.removeItem('iduserName')
    window.location.reload()
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
      console.log(user);

    })
  }

  getUserById(id: string) {
    this.callApi.getUserByID(id).subscribe(user => {
      console.log(user);
    })
  }

  oncreateUser() {
    this.formUser.value.Status = "Open"
    this.formUser.value.userStatus = "Open"
    this.formUser.value.creationDateTime = new Date
    this.callApi.createUser(this.formUser.value).subscribe(data => {
      console.log(data);
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
    } else {
      this.filterByPermission = ""
    }
  }
  

  ngOnInit() {
    this.getAllUser();
    userDesign();
  }
}
