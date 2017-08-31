import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { Item } from '../../models/item';

import { Items } from '../../providers/providers';
import { CloudData, CloudOptions } from '../../../angular-tag-cloud-module';

@Component({
  selector: 'page-WordCloud',
  templateUrl: 'WordCloud.html'
})
export class WordCloudPage {
  
  currentItems: any = [];
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width : 0.75,
    height : 350,
    overflow: false,
  };
  data: Array<CloudData> = [
    { text: 'TagCloudModule', weight: 10, color: '#65CA27' },
    { text: 'Angular', weight: 9 },
    { text: 'NodeJS', weight: 9 },
    { text: 'Mongo DB', weight: 5 },
    { text: 'MySQL', weight: 4 },
    { text: 'JavaScript', weight: 8 },
    { text: 'TypeScript', weight: 9 },
    { text: 'REST Services', weight: 8 },
    { text: 'WebRTC', weight: 6 },
    { text: 'Webpack', weight: 4 },
    { text: 'Gulp', weight: 4 },
    { text: 'Monitoring', weight: 6 },
    { text: 'LaTeX', weight: 7 },
    { text: 'PHP', weight: 4 },
    { text: 'Shell Scripting', weight: 4 },
    { text: 'RxJS', weight: 7 },
    { text: 'Wireshark', weight: 7 },
    { text: 'Customizing', weight: 6 },
    { text: 'CSS', weight: 7 },
    { text: 'jQuery', weight: 4 },
    { text: 'Apple', weight: 7 },
    { text: 'Microsoft', weight: 5 },
    { text: 'Ubuntu', weight: 7 },
    { text: 'Debian', weight: 6 },
    { text: 'Linux', weight: 7 },
    { text: 'Minifizierung', weight: 5 },
    { text: 'Netzwerkmanagement', weight: 6 },
    { text: 'Lua', weight: 4 },
    { text: 'HTML', weight: 8 },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
