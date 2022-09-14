import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
  private producUrl='api/products/products.json';

  constructor(private hhtp: HttpClient){}



    getPoroducts(): Observable<IProduct[]>{
        return this.hhtp.get<IProduct[]>(this.producUrl)
        .pipe(
          tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
      //in a real world app, we may send the server to some remote logging infrastructure
      //instead of just logging it to the console
      let errorMessage = '';
      if(err.error instanceof ErrorEvent){
        errorMessage = `An error occured: ${err.status}, error message is: ${err.message}`;
      } else {
        // The backend returned an unsucessful response code
        //The response body may contain clues as to wha went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(() => errorMessage);
    }
}