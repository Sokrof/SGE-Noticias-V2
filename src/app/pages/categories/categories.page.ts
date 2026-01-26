import { Component, OnInit, OnDestroy, Input, CUSTOM_ELEMENTS_SCHEMA, inject, ChangeDetectorRef } from '@angular/core';
import { Seccion, Noticia } from '../../interfaces/noticias-interface';
import { IonicModule } from "@ionic/angular";
import { NoticiasService } from "../../services/noticias.service";
import { Subject, takeUntil } from "rxjs";
import {Router, RouterLink} from "@angular/router";
import { DatePipe } from "@angular/common";
import { HeaderPage } from "../header/header.page";
import { CategoryService } from "../../services/category-service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, RouterLink, DatePipe, HeaderPage]
})
export class CategoriesPage implements OnInit, OnDestroy {
  @Input() categoryId: string | undefined;
  protected sections: Seccion[] = [];
  protected filteredNoticias: Noticia[] = [];
  protected segmentValue: string = '';

  private readonly router: Router = inject(Router);
  private noticiasService = inject(NoticiasService);
  private destroy$ = new Subject<void>();
  private readonly allowedSections = new Set(['Deportes', 'Economia', 'Mundo', 'Tecnologia']);

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadSections();

    this.categoryService.selectedCategory$.pipe(takeUntil(this.destroy$)).subscribe(sectionName => {
      if (sectionName) {
        this.setActiveSection(sectionName);
        this.cdr.detectChanges();
      }
    });

    if (this.categoryId) {
      this.categoryService.setCategory(this.categoryId);
    }
  }

  private loadSections() {
    this.noticiasService.getSections()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            const filtered = response.filter(section => this.allowedSections.has(section.name));
            this.sections = filtered.length > 0 ? filtered : response;

            if (this.sections.length > 0 && !this.segmentValue) {
              this.setActiveSection(this.sections[0].name);
            }
          }
        },
        error: (err) => console.error('Error al cargar secciones:', err),
      });
  }

  segmentChanged(event: any) {
    const sectionName = event.detail?.value;
    if (sectionName) {
      this.setActiveSection(sectionName);
    }
  }

  private setActiveSection(sectionName: string) {
    this.segmentValue = sectionName;
    this.categoryService.setCategory(sectionName);
    this.loadNoticiasForSection(sectionName);
  }

  private loadNoticiasForSection(sectionName: string) {
    this.noticiasService.getSection(sectionName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.filteredNoticias = this.replicateNoticias(response || [], 10);
        },
        error: (err) => {
          console.error('Error al cargar noticias de la sección:', err);
          this.filteredNoticias = [];
        }
      });
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

  goToNoticiasDetail(id: string) {
    this.router.navigate(['/details', id]);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
