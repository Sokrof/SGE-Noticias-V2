import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentarios, Componente, Noticia, Seccion } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);
  private urlBase = 'https://api-noticias-chi.vercel.app/api/v1/noticias';

  getComponentesMenu(): Observable<Componente[]> {
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getAllNews(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.urlBase}/todas`);
  }

  getNewsById(id: string): Observable<Noticia> {
    return this.http.get<Noticia>(`${this.urlBase}/noticia/${id}`);
  }

  getNewsByTitle(term: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${this.urlBase}/title/${term}`);
  }

  getNewsBySection(sectionName: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(
      `${this.urlBase}/get/section/${sectionName}`
    );
  }

  getSections(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(`${this.urlBase}/get/sections`);
  }

  addCommentToNews(id: string, comment: Comentarios): Observable<Noticia> {
    return this.http.patch<Noticia>(`${this.urlBase}/${id}`, { comment });
  }
}

