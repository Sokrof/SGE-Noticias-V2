import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonApp, IonContent, IonHeader, IonItem, IonList, IonMenu, IonRouterOutlet, IonTitle, IonToolbar,
  IonIcon, IonLabel, IonAvatar, IonImg, IonListHeader, MenuController, IonMenuToggle
} from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { home, list, search, logoFacebook, logoTwitter, heart, shareSocial } from "ionicons/icons";
import { CommonModule } from '@angular/common';
import { NoticiasService } from './services/noticias.service';
import { Seccion } from './interfaces/noticias-interface';
import { CategoryService } from "./services/category-service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    CommonModule, IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle,
    IonList, IonContent, IonItem, IonIcon, IonLabel, IonAvatar, IonImg, IonListHeader, IonMenuToggle, RouterLink
  ],
  standalone: true
})
export class AppComponent implements OnInit {
  categories: Seccion[] = [];
  private noticiasService: NoticiasService = inject(NoticiasService);
  private router: Router = inject(Router);
  private menuCtrl: MenuController = inject(MenuController);

  constructor(private categoryService: CategoryService) {
    addIcons({
      home, list, search, logoFacebook, logoTwitter, heart, shareSocial
    });
    this.loadSections();
  }

  private loadSections() {
    this.noticiasService.getSections().subscribe({
      next: (response: Seccion[]) => {
        this.categories = response || [];
      },
      error: (err: unknown) => console.error('Error al cargar las secciones:', err),
    });
  }

  async selectCategory(sectionName: string) {
    console.log('Sección seleccionada desde el menú:', sectionName);
    this.categoryService.setCategory(sectionName);
    await this.router.navigate(['/categories']);
    this.menuCtrl.close();
  }

  goHome() {
    this.router.navigate(['/home']);
    this.menuCtrl.close();
  }

  ngOnInit() {
    this.menuCtrl.enable(true, 'main-menu');
  }
}
