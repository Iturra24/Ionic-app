import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { retry, catchError} from "rxjs/operators";
import { Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {


  private mealApiUrl: string = "https://www.themealdb.com/api/json/v1/1/random.php";
  private usersApiUrl: string = "https://jsonplaceholder.typicode.com/users/";
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  

  constructor(
    private http: HttpClient
  ) { }


  // Peticiones a API pública
  getRandomMeal(): Observable<any>{
    return this.http.get(this.mealApiUrl);
  }

  getRandomUser(): Observable<any>{
    let url = this.usersApiUrl + String(this.getRandomNumber());
    return this.http.get(url);
  }

  // Methods
  getRandomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
  }
  
}
