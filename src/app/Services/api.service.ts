
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { checkout } from '../Models/checkout';
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

  public imagePath(imagePath : any){
    return `${environment.apiUrl}/${imagePath}`
  }

  public uploadImage(image : any){
    return this.http.post<report>(`${environment.apiUrl}/api/Upload/UploadImage`, image)
  }


  public getAllUser() {
    return this.http.get<user>(`${environment.apiUrl}/api/User/GetAllUser`)
  }
  public getUserByID(userID: string) {
    return this.http.get<user>(`${environment.apiUrl}/api/User/GetUserByid/${userID}`)
  }
  public getUserByUsername(userName: string) {
    return this.http.get<user>(`${environment.apiUrl}/api/User/GetUserByUserName/${userName}`)
  }
  public createUser(user: user) {
    return this.http.post<user>(`${environment.apiUrl}/api/User/CreateUser`, user)
  }
  public editUser(userID: string, user: user) {
    return this.http.put<user>(`${environment.apiUrl}/api/User/EditUser/${userID}`, user)
  }
  public deleteUser(userID: string) {
    return this.http.get<user>(`${environment.apiUrl}/api/User/DeleteUser/${userID}`)
  }
  public deleteUserByUserDetail(userDetailID: string) {
    return this.http.get<user>(`${environment.apiUrl}/api/User/DeleteUserByUserDetailId/${userDetailID}`)
  }
  public checkUser(username: string) {
    return this.http.get<user>(`${environment.apiUrl}/api/User/CheckUser/${username}`, { responseType: 'text' as 'json' })
  }
  public checkUserAndPass(username: string, password: string) {
    return this.http.get<user>(`${environment.apiUrl}/api/User/CheckUserAndPassword/${username}/${password}`)
  }


  public getAllRoom() {
    return this.http.get<room>(`${environment.apiUrl}/api/Room/GetAllRoom`)
  }
  public getRoomById(roomID: string) {
    return this.http.get<room>(`${environment.apiUrl}/api/Room/GetRoomByid/${roomID}`)
  }
  public getRoomByNumber(roomNumber: string) {
    return this.http.get<room>(`${environment.apiUrl}/api/Room/GetRoomByNumber/${roomNumber}`)
  }
  public getRoomByRoomType(roomType: string) {
    return this.http.get<room>(`${environment.apiUrl}/api/Room/GetRoomByType/${roomType}`)
  }
  public getRoomByRoomStatus(roomStatus: string) {
    return this.http.get<room>(`${environment.apiUrl}/api/Room/GetRoomByStatus/${roomStatus}`)
  }
  public getRoomByFloor(floor: string) {
    return this.http.get<room>(`${environment.apiUrl}/api/Room/GetRoomByFloor/${floor}`)
  }
  public createRoom(room: room) {
    return this.http.post<room>(`${environment.apiUrl}/api/Room/CreateRoom`, room)
  }
  public editRoom(roomID: string, room: room) {
    return this.http.put<room>(`${environment.apiUrl}/api/Room/EditRoom/${roomID}`, room)
  }
  public deleteRoom(roomID: string) {
    return this.http.get<room>(`${environment.apiUrl}/api/Room/DeleteRoom/${roomID}`)
  }



  public getAllUserDetail() {
    return this.http.get<userDetail>(`${environment.apiUrl}/api/UserDetail/GetAllUserDetail`)
  }
  public getUserDetailById(userDetailID: string) {
    return this.http.get<userDetail>(`${environment.apiUrl}/api/UserDetail/GetUserDetailById/${userDetailID}`)
  }
  public getUserDetailByFirstName(userDetailName: string) {
    return this.http.get<userDetail>(`${environment.apiUrl}/api/UserDetail/GetUserDetailByFirstName/${userDetailName}`)
  }
  public getUserDetailByTelephone(userDetailName: string) {
    return this.http.get<userDetail>(`${environment.apiUrl}/api/UserDetail/GetUserDetailByTelephone/${userDetailName}`)
  }
  public createUserDetail(userDetail: userDetail) {
    return this.http.post<userDetail>(`${environment.apiUrl}/api/UserDetail/CreateUserDetail`, userDetail)
  }
  public editUserDetail(userDetailID: string, userDetail: userDetail) {
    return this.http.put<userDetail>(`${environment.apiUrl}/api/UserDetail/EditUserDetail/${userDetailID}`, userDetail)
  }
  public deleteUserDetail(userDetailID: string) {
    return this.http.get<userDetail>(`${environment.apiUrl}/api/UserDetail/DeleteUserDetail/${userDetailID}`)
  }


  public getAllInvoice() {
    return this.http.get<invoice>(`${environment.apiUrl}/api/Invoice/GetAllInvoice`)
  }
  public getInvoiceById(invoiceID: string) {
    return this.http.get<invoice>(`${environment.apiUrl}/api/Invoice/GetInvoiceById/${invoiceID}`)
  }
  public getInvoiceByNumber(number: string) {
    return this.http.get<invoice>(`${environment.apiUrl}/api/Invoice/GetInvoiceByNumber/${number}`)
  }
  public getInvoiceByStatus(status: string) {
    return this.http.get<invoice>(`${environment.apiUrl}/api/Invoice/GetInvoiceByStatus/${status}`)
  }
  public getInvoiceByMonth(start: Date , end :Date) {
    return this.http.get<invoice>(`${environment.apiUrl}/api/Invoice/GetInvoiceByMonth/${start}/${end}`)
  }
  public createInvoice(invoice: invoice) {
    return this.http.post<invoice>(`${environment.apiUrl}/api/Invoice/CreateInvoice`, invoice)
  }
  public editInvoice(invoiceID: string, invoice: invoice) {
    return this.http.put<invoice>(`${environment.apiUrl}/api/Invoice/EditInvoice/${invoiceID}`, invoice)
  }
  public deleteInvoice(invoiceID: string) {
    return this.http.get<invoice>(`${environment.apiUrl}/api/Invoice/DeleteInvoice/${invoiceID}`)
  }


  public getAllReport() {
    return this.http.get<report>(`${environment.apiUrl}/api/Report/GetAllReport`)
  }
  public getReportById(reportID: string) {
    return this.http.get<report>(`${environment.apiUrl}/api/Report/GetReportById/${reportID}`)
  }
  public getReportByNumber(number: string) {
    return this.http.get<report>(`${environment.apiUrl}/api/Report/GetReportByNumber/${number}`)
  }
  public getReportByRoomId(reportRoomId: string) {
    return this.http.get<report>(`${environment.apiUrl}/api/Report/GetReportByRoomId/${reportRoomId}`)
  }
  public getReportByStatus(status: string) {
    return this.http.get<report>(`${environment.apiUrl}/api/Report/GetReportByStatus/${status}`)
  }
  public createReport(report: any) {
    console.log(report);
    
    return this.http.post<report>(`${environment.apiUrl}/api/Report/CreateReport`, report)
  }
  public editReport(reportID: string, report: report) {
    return this.http.put<report>(`${environment.apiUrl}/api/Report/EditReport/${reportID}`, report)
  }
  public deleteReport(reportID: string) {
    return this.http.get<report>(`${environment.apiUrl}/api/Report/DeleteReport/${reportID}`)
  }
 


  public getAllPayment() {
    return this.http.get<payment>(`${environment.apiUrl}/api/Payment/GetAllPayment`)
  }
  public getPaymentById(paymentID: string) {
    return this.http.get<payment>(`${environment.apiUrl}/api/Payment/GetPaymentById/${paymentID}`)
  }
  public getPaymentByNumber(number: string) {
    return this.http.get<payment>(`${environment.apiUrl}/api/Payment/GetPaymentByNumber/${number}`)
  }
  public getPaymentByStatus(status: string) {
    return this.http.get<payment>(`${environment.apiUrl}/api/Payment/GetPaymentByStatus/${status}`)
  }
  public createPayment(payment: payment) {
    return this.http.post<payment>(`${environment.apiUrl}/api/Payment/CreatePayment`, payment)
  }
  public editPayment(paymentID: string, payment: payment) {
    return this.http.put<payment>(`${environment.apiUrl}/api/Payment/EditPayment/${paymentID}`, payment)
  }
  public deletePayment(paymentID: string) {
    return this.http.get<payment>(`${environment.apiUrl}/api/Payment/DeletePayment/${paymentID}`)
  }
  
  
  public getAllSetting() {
    return this.http.get<setting>(`${environment.apiUrl}/api/Setting/GetAllSetting`)
  }
  public getSettingById(settingID: string) {
    return this.http.get<setting>(`${environment.apiUrl}/api/Setting/GetSettingById/${settingID}`)
  }
  public createSetting(setting: setting) {
    return this.http.post<setting>(`${environment.apiUrl}/api/Setting/CreateSetting`, setting)
  }
  public editSetting(settingID: string, setting: setting) {
    return this.http.put<setting>(`${environment.apiUrl}/api/Setting/EditSetting/${settingID}`, setting)
  }
  public deleteSetting(settingID: string) {
    return this.http.get<setting>(`${environment.apiUrl}/api/Setting/DeleteSetting/${settingID}`)
  }


  public getAllCheckout() {
    return this.http.get<checkout>(`${environment.apiUrl}/api/Checkout/GetAllCheckout`)
  }
  public getCheckoutById(checkoutID: string) {
    return this.http.get<checkout>(`${environment.apiUrl}/api/Checkout/GetCheckoutById/${checkoutID}`)
  }
  public getCheckoutByStatus(status: string) {
    return this.http.get<checkout>(`${environment.apiUrl}/api/Checkout/GetCheckoutByStatus/${status}`)
  }
  public getCheckoutByMonth(start: Date , end :Date) {
    return this.http.get<checkout>(`${environment.apiUrl}/api/Checkout/GetCheckoutByMonth/${start}/${end}`)
  }
  public createCheckout(checkout: checkout) {
    return this.http.post<checkout>(`${environment.apiUrl}/api/Checkout/CreateCheckout`, checkout)
  }
  public editCheckout(checkoutID: string, checkout: checkout) {
    return this.http.put<checkout>(`${environment.apiUrl}/api/Checkout/EditCheckout/${checkoutID}`, checkout)
  }
  public deleteCheckout(checkoutID: string) {
    return this.http.get<checkout>(`${environment.apiUrl}/api/Checkout/DeleteCheckout/${checkoutID}`)
  }


}