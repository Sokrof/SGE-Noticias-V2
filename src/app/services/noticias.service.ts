import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Noticia, Seccion} from '../interfaces/noticias-interface';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.ApiUrl;

  constructor() {
  }

  // GetAll: GET /noticias/todas
  getAll(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}/noticias/todas`).pipe(
      catchError(this.handleError)
    );
  }

  // GetOne: GET /noticias/noticia/{id}
  getOne(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/noticias/noticia/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // GetByTitle: GET /noticias/title/{name}
  getByTitle(title: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.apiUrl}/noticias/title/${title}`).pipe(
      catchError(this.handleError)
    );
  }

  // Add: POST /noticias/
  add(noticia: Noticia): Observable<any> {
    return this.http.post(`${this.apiUrl}/noticias/`, noticia).pipe(
      catchError(this.handleError)
    );
  }

  // UpdatePatch: PATCH /noticias/{id}
  update(id: string, noticia: Partial<Noticia>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/noticias/${id}`, noticia).pipe(
      catchError(this.handleError)
    );
  }

  // Delete: DELETE /noticias/{id}
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/noticias/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // GetSections: GET /noticias/get/sections
  getSections(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(`${this.apiUrl}/noticias/get/sections`).pipe(
      catchError(this.handleError)
    );
  }

  // GetSection: GET /noticias/get/section/{section}
  getSection(sectionName: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.apiUrl}/noticias/get/section/${sectionName}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    return throwError(() => new Error('Ocurrió un error en la solicitud. Inténtalo nuevamente.'));
  }
}
