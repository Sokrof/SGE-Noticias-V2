import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { DataService } from '../../services/data.service';
import { Noticia } from '../../common/interfaces';
import { FiltroPipe } from '../../pipes/filtro.pipe';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonSearchbar,
    IonCard,
    IonCardContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    RouterLink,
    FormsModule,
    FiltroPipe,
    SlicePipe,
  ],
})
export class BuscarPage implements OnInit {
  private dataService = inject(DataService);

  criterio: 'title' | 'author' = 'title';
  textoBuscar = '';

  todasNoticias: Noticia[] = [];
  
  cantidadPorCarga = 5;
  limiteActual = 5;

  ngOnInit(): void {
    this.dataService.getAllNews().subscribe({
      next: (noticias: Noticia[]) => {
        this.todasNoticias = [...noticias].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      },
      error: (err: Error) => console.error(err),
      complete: () => {
        console.log('Data loaded.');
      },
    });
  }

  getImagenPrincipal(noticia: Noticia): string {
    if (Array.isArray(noticia.images)) {
      return noticia.images[0] ?? '';
    }
    return noticia.images ?? '';
  }

  cargarMas(event: any) {
    this.limiteActual += this.cantidadPorCarga;
    event.target.complete();
  }

  handleImageError(event: any) {
    event.target.src = 'https://ionicframework.com/docs/img/demos/card-media.png';
  }
}
