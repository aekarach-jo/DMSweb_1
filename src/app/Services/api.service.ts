import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
}
