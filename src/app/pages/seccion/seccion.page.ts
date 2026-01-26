import { Component, OnInit, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { DataService } from '../../services/data.service';
import { Noticia } from '../../common/interfaces';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.page.html',
  styleUrls: ['./seccion.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonFab,
    IonFabButton,
    IonIcon,
    RouterLink,
    FormsModule,
    SlicePipe,
  ],
})
export class SeccionPage implements OnInit {
  private dataService = inject(DataService);

  @Input()
  set section(value: string) {
    this.sectionActual = value;
    this.segmentValue = this.sectionActual;
    this.aplicarFiltro();
  }

  sectionActual = '';
  secciones: string[] = [];
  segmentValue = '';

  private todasNoticias: Noticia[] = [];

  noticias: Noticia[] = [];

  cantidadPorCarga = 5;
  limiteActual = 5;

  ngOnInit(): void {
    this.dataService.getAllNews().subscribe({
      next: (noticias: Noticia[]) => {
        this.todasNoticias = noticias;
        this.secciones = this.getSeccionesDesdeNoticias(noticias);

        if (!this.sectionActual && this.secciones.length > 0) {
          this.sectionActual = this.secciones[0];
          this.segmentValue = this.sectionActual;
        }

        this.aplicarFiltro();
      },
      error: (err: Error) => console.error(err),
      complete: () => {
        console.log('Data loaded.');
      },
    });
  }

  segmentChanged(event: any) {
    this.sectionActual = event.detail.value;
    // this.segmentValue se actualiza por ngModel
    this.aplicarFiltro();
  }

  private aplicarFiltro() {
    if (!this.sectionActual) {
      return;
    }

    const filtradas = this.todasNoticias.filter(
      (n) => this.getNombreSeccion(n) === this.sectionActual
    );

    this.noticias = [...filtradas].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    this.limiteActual = this.cantidadPorCarga;
  }

  private getSeccionesDesdeNoticias(noticias: Noticia[]): string[] {
    const secciones = noticias
      .map((n) => this.getNombreSeccion(n))
      .filter((s) => s);

    return Array.from(new Set(secciones));
  }

  getNombreSeccion(noticia: Noticia): string {
    const section: any = noticia.section;
    if (typeof section === 'string') {
      return section;
    }
    return section?.name ?? '';
  }

  getIconoSeccion(nombreSeccion: string): string {
    if (nombreSeccion === 'Deportes') {
      return 'american-football';
    }
    if (nombreSeccion === 'Economia' || nombreSeccion === 'Economía') {
      return 'card';
    }
    if (nombreSeccion === 'Mundo') {
      return 'pin';
    }
    if (nombreSeccion === 'Tecnologia' || nombreSeccion === 'Tecnología') {
      return 'beaker';
    }
    return 'card';
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
