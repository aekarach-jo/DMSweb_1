import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { room } from '../Models/room';
import { user } from '../Models/user';

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
  public getRoomByNumber(roomNnumber: string) {
    return this.http.get<room>(`${environment.apiUrl}Room/GetRoomByNumber/${roomNnumber}`)
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
}
