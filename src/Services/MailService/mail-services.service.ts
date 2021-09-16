import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { routes } from 'src/environments/routes';
import { EmailModel } from 'src/Models/EmailModel';

@Injectable({
  providedIn: 'root'
})
export class MailServicesService {

  constructor(
    private http: HttpClient
  ) { }

  public ro = new routes();

  public Gmail(mail: EmailModel): Observable<any>{
    const api_url = `${this.ro.url}/mail/send-gmail`;
    return this.http.post<any>(api_url, mail);
  } 
}
