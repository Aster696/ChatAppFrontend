import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { routes } from 'src/environments/routes';
import { HttpClient } from '@angular/common/http';
import { FeedbackModel } from 'src/Models/FeedbackModel';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
  ) { }

  private ro = new routes();

  public addFeedback(feedback: FeedbackModel):Observable<any>{
    const api_url = `${this.ro.url}/feedback/add-feedback`;
    return this.http.post<any>(api_url, feedback);
  }

  public displayFeedbacks():Observable<any>{
    const api_url = `${this.ro.url}/feedback/display-feedbacks`;
    return this.http.get<any>(api_url);
  }

}
