import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  api = 'http://localhost:8000/api';
  username: string = '';

  constructor(private http: HttpClient) { }

  // Returns all members
  public getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  public getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
  }

  public getMemberDetails(member_id:any) {
    return this.http
      .get(`${this.api}/members/` + member_id)
      .pipe(catchError(this.handleError));
  }

  public addMember(request: any) {
    return this.http
      .post(`${this.api}/addMember`, request)
      .pipe(catchError(this.handleError));
  }

  public editMember(request:any,member_id:any){
    return this.http
      .put(`${this.api}/members/`+ member_id , request)
      .pipe(catchError(this.handleError));
  }

  public deleteMember(member_id:any){
    return this.http
      .delete(`${this.api}/members/`+ member_id)
      .pipe(catchError(this.handleError));
  }


  setUsername(name: string): void {
    this.username = name;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
