import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Noticia} from "../../interfaces/noticias-interface";
import {NoticiasService} from "../../services/noticias.service";
import {
  IonBackButton, IonButtons, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonChip, IonContent,
  IonHeader, IonImg, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {CommonModule, DatePipe} from "@angular/common";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonHeader, IonToolbar, IonBackButton, IonButtons, IonTitle, IonContent,
    IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip,
    DatePipe, CommonModule
  ],
})
export class DetailsPage implements OnInit {

  noticia: Noticia | null = null;

  private readonly router: Router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private toastController: ToastController
  ) {
  }

  ngOnInit() {
    const noticiaId = this.route.snapshot.paramMap.get('id');
    if (noticiaId) {
      this.loadNoticiasDetails(noticiaId);
    }
  }

  // Cargar los detalles de la noticia
  loadNoticiasDetails(id: string) {
    this.noticiasService.getOne(id).subscribe({
      next: (response: Noticia) => {
        this.noticia = response;
      },
      error: (error: any) => {
        console.error('Error al cargar los detalles:', error);
        this.showToast('Error al cargar los detalles de la noticia', 'danger');
      },
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }
}
