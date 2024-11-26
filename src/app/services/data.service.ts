import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private storage : Storage = new Storage;

  constructor() { 
    this.init();
  }

  async init(){
    this.storage.create();
  }

  async setData(key: string, value: any){
    await this.storage.set(key, value);
  }

  async getData(key: string){
    return await this.storage.get(key);
  }

  async removeData(key: string){
    await this.storage.remove(key);
  }

  // Servicio Storage 
  async getAllData() {
    const items: any = {};
    await this.storage.forEach((value, key) => {
        items[key] = value;
    });
    return items;
  }

  async restoreData(){
    await this.storage.clear();
  }
}
