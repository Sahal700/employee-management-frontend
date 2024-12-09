
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  serverUrl:string = 'https://employee-management-server-68dt.onrender.com'
  constructor(private http : HttpClient) { }
  addEmployee(reqBody:any){
    return this.http.post(`${this.serverUrl}/employee`,reqBody)
  }
  getemployee(){
    return this.http.get(`${this.serverUrl}/employee`)
  }
  editEmployee(id:any,reqBody:any){
    return this.http.put(`${this.serverUrl}/employee/${id}`,reqBody)
  }
  deleteEmp(id:any){
    return this.http.delete(`${this.serverUrl}/employee/${id}`)
  }
}
