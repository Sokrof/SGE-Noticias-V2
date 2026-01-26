import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule, IonInfiniteScroll, NavController } from "@ionic/angular";
import {Router, RouterLink} from '@angular/router';
import { Noticia } from '../../interfaces/noticias-interface';
import {HeaderPage} from "../header/header.page";
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  noticias: Noticia[] = [];
  allNoticias: Noticia[] = [];
  currentPage = 0;
  itemsPerPage = 5;
  isLoading = false;
  private router: Router = inject(Router);

  constructor(
    private noticiasService: NoticiasService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.loadNoticias();
  }

  loadNoticias() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.noticiasService.getAll()
      .subscribe({
        next: (response) => {
          if (!response) {
            console.warn('Respuesta de API inválida:', response);
            this.isLoading = false;
            return;
          }

          const replicated = this.replicateNoticias(response, 10);

          // Primera carga: guardar y ordenar todas las noticias
          if (this.currentPage === 0) {
            this.allNoticias = [...replicated].sort((a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          }

          // Paginación
          const startIndex = this.currentPage * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          const newNoticias = this.allNoticias.slice(startIndex, endIndex);

          this.noticias = [...this.noticias, ...newNoticias];
          this.currentPage++;
          this.isLoading = false;

          if (this.infiniteScroll) {
            this.infiniteScroll.complete();

            // Para el infinite scroll si no hay más items
            if (endIndex >= this.allNoticias.length) {
              this.infiniteScroll.disabled = true;
            }
          }
        },
        error: (err) => {
          console.error('Error al cargar noticias:', err);
          this.isLoading = false;
          if (this.infiniteScroll) {
            this.infiniteScroll.complete();
          }
        },
      });
  }
  loadMore(event: any) {
    this.loadNoticias();
  }

  goToSearch() {
    this.navCtrl.navigateForward('/search');
  }

  goToNoticiasDetail(id: string) {
    this.router.navigate(['/details', id]);
  }

  private replicateNoticias(noticias: Noticia[], times: number): Noticia[] {
    if (!Array.isArray(noticias) || noticias.length === 0 || times <= 1) {
      return noticias;
    }
    const result: Noticia[] = [];
    for (let i = 0; i < times; i++) {
      for (const noticia of noticias) {
        result.push(noticia);
      }
    }
    return result;
  }

}
