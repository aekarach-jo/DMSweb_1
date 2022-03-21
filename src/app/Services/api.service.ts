

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { invoice } from '../Models/invoice';
import { payment } from '../Models/payment';
import { report } from '../Models/report';
import { room } from '../Models/room';
import { setting } from '../Models/setting';
import { user } from '../Models/user';
import { userDetail } from '../Models/userDetail';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }


  public getAllUser() {
    return this.http.get<user>(`${environment.apiUrl}User/GetAllUser`)
  }
  public getUserByID(userID: string) {
    return this.http.get<user>(`${environment.apiUrl}User/GetUserByid/${userID}`)
  }
  public getUserByUsername(userName: string) {
    return this.http.get<user>(`${environment.apiUrl}User/GetUserByUserName/${userName}`)
  }
  public createUser(user: user) {
    return this.http.post<user>(`${environment.apiUrl}User/CreateUser`, user)
  }
  public editUser(userID: string, user: user) {
    return this.http.put<user>(`${environment.apiUrl}User/EditUser/${userID}`, user)
  }
  public deleteUser(userID: string) {
    return this.http.get<user>(`${environment.apiUrl}User/DeleteUser/${userID}`)
  }
  public deleteUserByUserDetail(userDetailID: string) {
    return this.http.get<user>(`${environment.apiUrl}User/DeleteUserByUserDetailId/${userDetailID}`)
  }
  public checkUser(username: string) {
    return this.http.get<user>(`${environment.apiUrl}User/CheckUser/${username}`, { responseType: 'text' as 'json' })
  }
  public checkUserAndPass(username: string, password: string) {
    return this.http.get<user>(`${environment.apiUrl}User/CheckUserAndPassword/${username}/${password}`)
  }


  public getAllRoom() {
    return this.http.get<room>(`${environment.apiUrl}Room/GetAllRoom`)
  }
  public getRoomById(roomID: string) {
    return this.http.get<room>(`${environment.apiUrl}Room/GetRoomByid/${roomID}`)
  }
  public getRoomByNumber(roomNumber: string) {
    return this.http.get<room>(`${environment.apiUrl}Room/GetRoomByNumber/${roomNumber}`)
  }
  public getRoomByRoomType(roomType: string) {
    return this.http.get<room>(`${environment.apiUrl}Room/GetRoomByType/${roomType}`)
  }
  public getRoomByRoomStatus(roomStatus: string) {
    return this.http.get<room>(`${environment.apiUrl}Room/GetRoomByStatus/${roomStatus}`)
  }
  public getRoomByFloor(floor: string) {
    return this.http.get<room>(`${environment.apiUrl}Room/GetRoomByFloor/${floor}`)
  }
  public createRoom(room: room) {
    return this.http.post<room>(`${environment.apiUrl}Room/CreateRoom`, room)
  }
  public editRoom(roomID: string, room: room) {
    return this.http.put<room>(`${environment.apiUrl}Room/EditRoom/${roomID}`, room)
  }
  public deleteRoom(roomID: string) {
    return this.http.get<room>(`${environment.apiUrl}Room/DeleteRoom/${roomID}`)
  }



  public getAllUserDetail() {
    return this.http.get<userDetail>(`${environment.apiUrl}UserDetail/GetAllUserDetail`)
  }
  public getUserDetailById(userDetailID: string) {
    return this.http.get<userDetail>(`${environment.apiUrl}UserDetail/GetUserDetailById/${userDetailID}`)
  }
  public getUserDetailByFirstName(userDetailName: string) {
    return this.http.get<userDetail>(`${environment.apiUrl}UserDetail/GetUserDetailByFirstName/${userDetailName}`)
  }
  public getUserDetailByTelephone(userDetailName: string) {
    return this.http.get<userDetail>(`${environment.apiUrl}UserDetail/GetUserDetailByTelephone/${userDetailName}`)
  }
  public createUserDetail(userDetail: userDetail) {
    return this.http.post<userDetail>(`${environment.apiUrl}UserDetail/CreateUserDetail`, userDetail)
  }
  public editUserDetail(userDetailID: string, userDetail: userDetail) {
    return this.http.put<userDetail>(`${environment.apiUrl}UserDetail/EditUserDetail/${userDetailID}`, userDetail)
  }
  public deleteUserDetail(userDetailID: string) {
    return this.http.get<userDetail>(`${environment.apiUrl}UserDetail/DeleteUserDetail/${userDetailID}`)
  }


  public getAllInvoice() {
    return this.http.get<invoice>(`${environment.apiUrl}Invoice/GetAllInvoice`)
  }
  public getInvoiceById(invoiceID: string) {
    return this.http.get<invoice>(`${environment.apiUrl}Invoice/GetInvoiceById/${invoiceID}`)
  }
  public getInvoiceByNumber(number: string) {
    return this.http.get<invoice>(`${environment.apiUrl}Invoice/GetInvoiceByNumber/${number}`)
  }
  public getInvoiceByStatus(status: string) {
    return this.http.get<invoice>(`${environment.apiUrl}Invoice/GetInvoiceByStatus/${status}`)
  }
  public getInvoiceByMonth(start: Date , end :Date) {
    return this.http.get<invoice>(`${environment.apiUrl}Invoice/GetInvoiceByMonth/${start}/${end}`)
  }
  public createInvoice(invoice: invoice) {
    return this.http.post<invoice>(`${environment.apiUrl}Invoice/CreateInvoice`, invoice)
  }
  public editInvoice(invoiceID: string, invoice: invoice) {
    return this.http.put<invoice>(`${environment.apiUrl}Invoice/EditInvoice/${invoiceID}`, invoice)
  }
  public deleteInvoice(invoiceID: string) {
    return this.http.get<invoice>(`${environment.apiUrl}Invoice/DeleteInvoice/${invoiceID}`)
  }


  public getAllReport() {
    return this.http.get<report>(`${environment.apiUrl}Report/GetAllReport`)
  }
  public getReportById(reportID: string) {
    return this.http.get<report>(`${environment.apiUrl}Report/GetReportById/${reportID}`)
  }
  public getReportByNumber(number: string) {
    return this.http.get<report>(`${environment.apiUrl}Report/GetReportByNumber/${number}`)
  }
  public getReportByStatus(status: string) {
    return this.http.get<report>(`${environment.apiUrl}Report/GetReportByStatus/${status}`)
  }
  public createReport(report: report) {
    return this.http.post<report>(`${environment.apiUrl}Report/CreateReport`, report)
  }
  public editReport(reportID: string, report: report) {
    return this.http.put<report>(`${environment.apiUrl}Report/EditReport/${reportID}`, report)
  }
  public deleteReport(reportID: string) {
    return this.http.get<report>(`${environment.apiUrl}Report/DeleteReport/${reportID}`)
  }


  public getAllPayment() {
    return this.http.get<payment>(`${environment.apiUrl}Payment/GetAllPayment`)
  }
  public getPaymentById(paymentID: string) {
    return this.http.get<payment>(`${environment.apiUrl}Payment/GetPaymentById/${paymentID}`)
  }
  public getPaymentByNumber(number: string) {
    return this.http.get<payment>(`${environment.apiUrl}Payment/GetPaymentByNumber/${number}`)
  }
  public getPaymentByStatus(status: string) {
    return this.http.get<payment>(`${environment.apiUrl}Payment/GetPaymentByStatus/${status}`)
  }
  public createPayment(payment: payment) {
    return this.http.post<payment>(`${environment.apiUrl}Payment/CreatePayment`, payment)
  }
  public editPayment(paymentID: string, payment: payment) {
    return this.http.put<payment>(`${environment.apiUrl}Payment/EditPayment/${paymentID}`, payment)
  }
  public deletePayment(paymentID: string) {
    return this.http.get<payment>(`${environment.apiUrl}Payment/DeletePayment/${paymentID}`)
  }
  
  
  public getAllSetting() {
    return this.http.get<setting>(`${environment.apiUrl}Setting/GetAllSetting`)
  }
  public getSettingById(settingID: string) {
    return this.http.get<setting>(`${environment.apiUrl}Setting/GetSettingById/${settingID}`)
  }
  public createSetting(setting: setting) {
    return this.http.post<setting>(`${environment.apiUrl}Setting/CreateSetting`, setting)
  }
  public editSetting(settingID: string, setting: setting) {
    return this.http.put<setting>(`${environment.apiUrl}Setting/EditSetting/${settingID}`, setting)
  }
  public deleteSetting(settingID: string) {
    return this.http.get<setting>(`${environment.apiUrl}Setting/DeleteSetting/${settingID}`)
  }



}