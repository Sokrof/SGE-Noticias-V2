import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonTextarea, IonImg,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../components/header/header.component';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { Comentarios, Noticia } from '../../common/interfaces';
import { register } from 'swiper/element/bundle';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonContent,
    IonCard,
    IonCardContent,
    IonChip,
    IonIcon,
    IonLabel,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonButton,
    IonFab,
    IonFabButton,
    IonFabList,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonTextarea,
    FormsModule,
    DatePipe,
    IonImg,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetallePage implements OnInit {
  private dataService = inject(DataService);
  private toastService = inject(ToastService);

  @Input()
  set id(value: string) {
    if (value) {
      this.cargarNoticia(value);
    }
  }

  @ViewChild(IonModal) modal!: IonModal;

  noticia: Noticia | null = null;
  imagenes: string[] = [];

  // Campos para el modal de comentarios
  nombre = '';
  email = '';
  comentario = '';

  constructor() {
    register();
  }

  ngOnInit(): void {}

  cargarNoticia(id: string) {
    this.dataService.getNewsById(id).subscribe({
      next: (noticia: Noticia) => {
        this.noticia = noticia;
        this.imagenes = this.getImagenes(noticia);
      },
      error: (err: Error) => console.error(err),
      complete: () => {
        console.log('Data loaded.');
      },
    });
  }

  getImagenes(noticia: Noticia): string[] {
    if (Array.isArray(noticia.images)) {
      return noticia.images;
    }
    return noticia.images ? [noticia.images] : [];
  }

  getNombreSeccion(noticia: Noticia): string {
    const section: any = noticia.section;
    if (typeof section === 'string') {
      return section;
    }
    return section?.name ?? '';
  }

  getIconoSeccion(noticia: Noticia): string {
    const section: any = noticia.section;
    const icon = section?.icon;
    if (icon) {
      return icon;
    }

    const nombre = this.getNombreSeccion(noticia);
    if (nombre === 'Deportes') {
      return 'american-football';
    }
    if (nombre === 'Economia' || nombre === 'Economía') {
      return 'card';
    }
    if (nombre === 'Mundo') {
      return 'pin';
    }
    if (nombre === 'Tecnologia' || nombre === 'Tecnología') {
      return 'beaker';
    }
    return 'card';
  }

  getComentarios(noticia: Noticia): Comentarios[] {
    const anyNoticia: any = noticia;
    return anyNoticia.comments ?? anyNoticia.comment ?? [];
  }

  async abrirRedSocial(url: string) {
    window.open(url, '_blank');
  }

  cancelarComentario() {
    this.modal.dismiss(null, 'cancel');
  }

  enviarComentario() {
    const nombreOk = this.nombre.trim().length >= 3;
    const comentarioOk = this.comentario.trim().length >= 2;
    const emailTrim = this.email.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim);

    if (!nombreOk || !emailOk || !comentarioOk) {
      this.toastService.mostrarToast('Datos inválidos', 'warning');
      return;
    }

    this.modal.dismiss(
      {
        name: this.nombre.trim(),
        email: emailTrim,
        comment: this.comentario.trim(),
      },
      'confirm'
    );
  }

  async onWillDismiss(event: any) {
    const ev = event as CustomEvent<any>;
    if (ev.detail.role === 'confirm') {
      const data = ev.detail.data;
      if (this.noticia && data) {
        try {
          await firstValueFrom(
            this.dataService.addCommentToNews(this.noticia._id, data)
          );
          await this.toastService.mostrarToast('Comentario insertado', 'success');

          // Limpiar campos
          this.nombre = '';
          this.email = '';
          this.comentario = '';

          // Recargar noticia
          const noticia = await firstValueFrom(
            this.dataService.getNewsById(this.noticia._id)
          );
          this.noticia = noticia;
        } catch {
          await this.toastService.mostrarToast(
            'Error al insertar el comentario',
            'danger'
          );
        }
      }
    }
  }
}
