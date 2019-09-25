import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-navigationtab',
  templateUrl: './navigationtab.page.html',
  styleUrls: ['./navigationtab.page.scss'],
})
export class NavigationtabPage implements OnInit {
  subscribe: any;

  constructor(public platform: Platform) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666,() => {
      if(this.constructor.name == "NavigationtabPage"){
        if(window.confirm("Exit App")){
          navigator["app"].exitApp();
        }
      }
    })
  }

  ngOnInit() {
  }

}
