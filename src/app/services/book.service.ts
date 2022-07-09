import { Injectable } from '@angular/core';
import { apiBook } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(public http: HttpClient) { }
  getAllBooks(): Observable<any> {
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(apiBook.endPointApi + "api/Book",  { headers: headers });
  }

  getBookId(data:any): Observable<any> {
    const body: any = JSON.stringify(data);
    const headers: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(apiBook.endPointApi + "api/Book", body, {headers: headers});
  }
}
