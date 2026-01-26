import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule,
    RouterLink
  ],
  standalone: true
})
export class TabsPage {
  constructor() {}
}
