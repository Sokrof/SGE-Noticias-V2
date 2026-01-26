import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Noticia } from '../../interfaces/noticias-interface';
import {Router, RouterLink} from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchPage {
  searchTerm: string = '';
  filteredNoticias: Noticia[] = [];
  isLoading: boolean = false;
  private searchSubject = new Subject<string>();
  private readonly router: Router = inject(Router);

  constructor(private noticiasService: NoticiasService) {
    // Configurar el debounce para la búsqueda
    this.searchSubject.pipe(
      debounceTime(300), // Esperar 300ms después de la última tecla
      distinctUntilChanged() // Solo realizar la búsqueda si el término ha cambiado
    ).subscribe(term => {
      this.search(term);
    });
  }

  onSearchChange(event: any) {
    const term = event.target.value.trim();
    this.searchSubject.next(term);
  }

  private search(term: string) {
    if (!term) {
      this.filteredNoticias = [];
      return;
    }

    this.isLoading = true;

    // Use getByTitle
    this.noticiasService.getByTitle(term).subscribe({
      next: (response: Noticia) => {
        if (response) {
          // Wrap single result in array or handle accordingly.
          // Since it returns Noticia (singular), I'll put it in an array.
          this.filteredNoticias = [response];
        } else {
          this.filteredNoticias = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error en la búsqueda:', error);
        // Maybe try to search all and filter client side if backend search is too strict?
        // For now, let's stick to getByTitle as requested.
        this.filteredNoticias = [];
        this.isLoading = false;
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goToNoticiasDetail(id: string) {
    this.router.navigate(['/details', id]);
  }

}
