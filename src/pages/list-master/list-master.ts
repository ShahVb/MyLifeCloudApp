import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { BackandServiceClass } from '../../app/services/backand.service';
import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';
import { LoginPage} from '../login/login';
import { Items } from '../../providers/providers';

import { Item } from '../../models/item';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  tag: Item[];
  testData = "Initial";

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, private backand: BackandServiceClass) {
    this.currentItems = this.items.query();
    
    backand.getTodayTagsData();
  }

  ngOnInit() {
    this.backand.getTodayTagsData()
    //.subscribe(data => {console.log(data);});
    .then(response => {
      console.log(response.data.length);
      this.testData = response.data.length;
    });
    
  }

  showItems () {
    console.log(this.tag);
    this.backand.destroyUserCredentials();
    this.navCtrl.push(LoginPage);
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
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
