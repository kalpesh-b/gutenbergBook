import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { createQueryParams } from "../utils/createQueryParams";

const BOOKS_API = "http://skunkworks.ignitesol.com:8000";

@Injectable({
  providedIn: "root"
})
export class BooksApiService {
  constructor(public http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get(`${BOOKS_API}/books`).pipe(
      map((response: Response) => response),
      catchError((error: any) => throwError(error))
    );
  }

  getBooksByQuery(topic: object): Observable<any> {
    return this.http.get(`${BOOKS_API}/books?${createQueryParams(topic)}`).pipe(
      map((response: Response) => response),
      catchError((error: any) => throwError(error))
    );
  }
}
