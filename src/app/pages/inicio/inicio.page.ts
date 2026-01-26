import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonImg,
  IonMenuButton,
  IonButtons,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { DataService } from '../../services/data.service';
import { Noticia } from '../../common/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonImg,
    IonContent,
    IonCard,
    IonCardContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterLink,
    SlicePipe,
  ],
})
export class InicioPage implements OnInit {
  private dataService = inject(DataService);

  noticias: Noticia[] = [];
  
  cantidadPorCarga = 5;
  limiteActual = 5;

  constructor() {}

  ngOnInit() {
    this.dataService.getAllNews().subscribe({
      next: (noticias: Noticia[]) => {
        this.noticias = [...noticias].sort(
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
