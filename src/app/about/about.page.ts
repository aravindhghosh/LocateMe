import { Component, OnInit } from '@angular/core';
import {Plugins} from '@capacitor/core';
const { Browser } = Plugins;

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async openURL(){
    const url = 'https://www.linkedin.com/in/aravindhghosh';
    await Browser.open({'url': url});
  }

  async openGithub(){
    const url = 'https://github.com/aravindhghosh';
    await Browser.open({'url': url});
  }

}
