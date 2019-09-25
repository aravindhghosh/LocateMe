import { Component, ViewChild, ElementRef } from '@angular/core';

import { Plugins } from '@capacitor/core'
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, timer } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { takeWhile, tap } from 'rxjs/operators';

const { Geolocation } = Plugins;

declare var google;
import { map } from 'rxjs/operators';

import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  [x: string]: any;
  locations: Observable<any>;
  locationsCollection: AngularFirestoreCollection<any>;
  user = null;
  locgeo: any;

  public secLeft: any = '-';
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  map: any;
  markers = [];

  fab = false;

  isTracking = false;
  isScrollable = true;

  watch = null;
  refreshposition: any;

  public lati: any = null;
  public long: any = null;
  public time_date: any = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.loadFirebase();
  }

  ionViewWillEnter() {
    this.loadMap();
  }

  loadMap() {
    var opts = {
      enableHighAccuracy: true
    };
    this.x = 9.8779521;
    this.y = 78.0563459;

    let latLng = new google.maps.LatLng(this.x, this.y);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.updateCurrentPosition(latLng);
  }

  scrollContent(scroll) {
    if (scroll === 'top') {
      this.ionContent.scrollToTop(300); //300 for animate the scroll effect.
      this.isScrollable = true;
    } else {
      this.ionContent.scrollToBottom(300);  //300 for animate the scroll effect.
      this.isScrollable = false;
    }
  }

  onScroll(event) {
    if (event.detail.deltaY > 0 && !this.isScrollable) return;
    if (event.detail.deltaY < 0 && this.isScrollable) return;
    if (event.detail.deltaY > 0) {//scrolling downwards
      this.isScrollable = false;
    } else {//scrolling upwards
      this.isScrollable = true;
    };
  };

  updateCurrentPosition(latlng) {
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];

    let marker = new google.maps.Marker({
      position: latlng,
      animation: google.maps.Animation.DROP,
      map: this.map
    });
    this.markers.push(marker);
  }

  loadFirebase() {
    this.afAuth.auth.signInAnonymously().then(res => {
      this.current_date = new Date(Date.now());
      this.user = res.user;
      console.log(this.user);

      this.locationsCollection = this.afs.collection(
        `locations/${this.user.uid}/track`,
        ref => ref.orderBy('timestamp', 'desc')
      )
      this.locations = this.locationsCollection.snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
      //map
      this.locations.subscribe(locations => {
        console.log('new locations: ', locations)
        this.updateMap(locations);
      })
    });
  }

  updateMap(locations) {
    this.markers.map(marker => marker.setMap(null));
    this.markers = [];

    for (let loc of locations) {
      let latlng = new google.maps.LatLng(loc.lat, loc.lng);

      let marker = new google.maps.Marker({
        position: latlng,
        animation: google.maps.Animation.DROP,
        map: this.map
      });
      this.markers.push(marker);
    }
  }

  startTracking() {
    this.secLeft = 60;
    this.isTracking = true;
    var opts = {
      enableHighAccuracy: true
    };
    this.watch = Geolocation.getCurrentPosition().then((position) => {
      setTimeout(() => {
        console.log('new position: ', position);
        if (position) {
          this.addNewLocation(
            position.coords.latitude,
            position.coords.longitude,
            position.timestamp
          );
        }
      }, 0);
    });
    this.subscription = timer(1000, 1000)
      .pipe(
        takeWhile(() => this.secLeft > 0),
        tap(() => this.secLeft--)
      )
      .subscribe(() => {
        console.log(this.secLeft);
      });
    this.locgeo = setInterval(function () {
      this.watch = Geolocation.getCurrentPosition().then((position) => {
        setTimeout(() => {
          console.log('new position: ', position);
          if (position) {
            this.addNewLocation(
              position.coords.latitude,
              position.coords.longitude,
              position.timestamp
            );
          }
        }, 0);
      });
      this.secLeft = 60;
    }.bind(this), 60000)
  }

  stopTracking() {
    Geolocation.clearWatch({ id: this.watch }).then(() => {
      this.isTracking = false;
      this.secLeft = '-';
      this.subscription.unsubscribe();
      clearInterval(this.locgeo);
    })
  }

  addNewLocation(lat, lng, timestamp) {
    this.locationsCollection.add({
      lat,
      lng,
      timestamp
    });

    this.lati = lat;
    this.long = lng;
    this.time_date = timestamp;//new Date((timestamp * 1000)).toLocaleString();

    let position = new google.maps.LatLng(lat, lng);
    this.map.setCenter(position);
    this.map.setZoom(16);
  }
  deleteLocation(pos) {
    this.locationsCollection.doc(pos.id).delete();
  }

}