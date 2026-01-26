import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  americanFootball,
  beaker,
  card,
  home,
  logoFacebook,
  logoTwitter,
  pin,
  search,
  shareSocial,
} from 'ionicons/icons';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, MenuComponent, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      home,
      search,
      americanFootball,
      card,
      pin,
      beaker,
      shareSocial,
      logoTwitter,
      logoFacebook,
    });
  }
}
