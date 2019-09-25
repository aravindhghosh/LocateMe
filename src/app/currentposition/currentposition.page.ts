import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/core';

@Component({
  selector: 'app-currentposition',
  templateUrl: './currentposition.page.html',
  styleUrls: ['./currentposition.page.scss'],
})
export class CurrentpositionPage implements OnInit {

  public clat: any;
  public clong: any;

  constructor() { }

  ionViewWillEnter() {
    this.loadMap();
  }

  loadMap() {
    Geolocation.watchPosition({},(position,err) => {
      setTimeout(() => {
        console.log('new position: ', position);
        if (position) {
            this.clat = position.coords.latitude,
            this.clong = position.coords.longitude
        }
      }, 0);
    });
  }

  ngOnInit() {
  }

}
