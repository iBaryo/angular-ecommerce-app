import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";
import {BrandService} from "./services/brand.service";

declare const gigya: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sse: EventSource;

  constructor(private _brand: BrandService) {
  }

  ngOnInit(): void {
    document.head.querySelector<HTMLTitleElement>('title').innerText = `${this._brand.name}'s Store`;

    this.sse = new EventSource(`${environment.apiUrl}notifications?gmid=${localStorage.getItem('gig_gmid')}`);
    this.sse.onmessage = ev => {
      const data = JSON.parse(ev.data);
      gigya.accounts.showScreenSet({
        screenSet: 'Default-Subscriptions',
        startScreen: 'gigya-sms-subscription-subscribe-full-screen',
        onAfterScreenLoad: () => {
          document.querySelector<HTMLLabelElement>('.subscription-header').innerText =
            `We've notice you're interested in\n${data.msg}!`;
        },
      });
    };
  }

  ngOnDestroy(): void {
    this.sse?.close();
  }
}
