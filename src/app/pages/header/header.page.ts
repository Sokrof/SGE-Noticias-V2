import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class HeaderPage {
  @Input() title: string = '';

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
