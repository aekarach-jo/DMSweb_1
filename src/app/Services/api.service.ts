import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { invoice } from '../Models/invoice';
import { room } from '../Models/room';
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
  public createInvoice(invoice: invoice) {
    return this.http.post<invoice>(`${environment.apiUrl}Invoice/CreateInvoice`, invoice)
  }
  public editInvoice(invoiceID: string, invoice: invoice) {
    return this.http.put<invoice>(`${environment.apiUrl}Invoice/EditInvoice/${invoiceID}`, invoice)
  }
  public deleteInvoice(invoiceID: string) {
    return this.http.get<invoice>(`${environment.apiUrl}Invoice/DeleteInvoice/${invoiceID}`)
  }
}