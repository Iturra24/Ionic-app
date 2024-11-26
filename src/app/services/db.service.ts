import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { IonItemSliding, Platform, ToastController } from '@ionic/angular'; 
import { BehaviorSubject, Observable } from 'rxjs'; 
import { User } from '../classes/user';
import Dexie from 'dexie';


@Injectable({
  providedIn: 'root'
})


export class DBService {
  
  // ATTRS
  public database !: SQLiteObject;
  private dexie !: Dexie;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false); 
  public usersList = new BehaviorSubject<User[]>([]);


  private tableUser : string = 
      "CREATE TABLE IF NOT EXISTS user(" + 
      "id INTEGER PRIMARY KEY AUTOINCREMENT," + 
      "username VARCHAR(50) NOT NULL," + 
      "mail VARCHAR(100) NOT NULL" + 
      "password VARCHAR(50) NOT NULL)";
  

  // CONSTRUCTOR
  constructor(
    private sqlite: SQLite, 
    private platform: Platform, 
    public toastController: ToastController
  ) {
    this.initDB();
  }


  // METHODS
  
  // Crear base de datos & Sate
  private async initDB() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova') || this.platform.is('capacitor')) {
        this.initSQLite();
      } else {
        this.initIndexedDB();
      }
    });
  }
    
  // SQLITE para mobile (android & IOS)
  private initSQLite(){
    this.sqlite
    .create({
      name: 'local.db',
      location: 'default',
    })
    .then((db: SQLiteObject) => {
      this.database = db;
      this.createTables();
      console.log('SQLite database initialized');
    })
    .catch((e) => {
      this.presentToast('SQLite error: ' + e.message);
    });
  }

  // IndexedDB para WEB
  private initIndexedDB(){
    this.dexie = new Dexie('local.db');
      this.dexie.version(1).stores({
        user: '++id, username, mail, password', // Define schema
      });
      this.isDbReady.next(true);
      console.log('IndexedDB initialized');
  }


  public dbState(){
    return this.isDbReady.asObservable();
  }

  
  // Crear tablas
  private async createTables(){
    if (!this.database) return;
    this.database
    .executeSql(this.tableUser, [])
    .then(() => {
      this.isDbReady.next(true);
      this.presentToast('Tables created');
    })
    .catch((e) => this.presentToast('Table creation error: ' + e.message));
  }


  // CRUD

  // insert
  public addUser(
    username: string, 
    mail: string, 
    password: string){
      if (this.database) {
        // SQLite Query
        let data = [username, mail, password]
        const query = 'INSERT INTO user (username, mail, password) VALUES (?, ?, ?)';
        return this.database.executeSql(query, data);
      } 
      else if (this.dexie) {
        // IndexedDB Query
        return this.dexie.table('user').add({ username, mail, password });
      }
      return Promise.reject('Database not initialized');
  }


  // select
  public getUser(
    mail: string, 
    password: string){
      if (this.database) {
        // SQLite Query
        let data = [mail, password];
        let query = "SELECT FROM user WHERE mail = ? AND password = ?";
        return this.database.executeSql(query, data).then(
          res => {
            this.presentToast(res);
          }
        );
      } 
      else if (this.dexie) {
        // IndexedDB Query
        return this.dexie
        .table('user')
        .where({mail, password})
        .first();
      }
      return Promise.reject('Database not initialized');
  }


  // update
  private updateUser(id: number, username: string, mail: string, password: string){
    let data = [username, mail, password, id]
    let query = "UPDATE user SET username = ?, mail = ?, password = ? WHERE id = ?";
    return this.database.executeSql(query, data).then(
      res => {
        this.presentToast(res);
      }
    )
  }


  // delete
  private deleteUser(id: number){
    let data = [id]
    let query = "DELETE FROM user WHERE id = ?";
    return this.database.executeSql(query, data).then(
      res => {
        this.presentToast(res);
      }
    )
  }


  // get last added user
  private getLastUser(){
    let query = "SELECT * FROM user ORDER BY id DESC LIMIT 1"
    let userdb = this.database.executeSql(query, []).then((data) =>{
      let user = [];
      for (let i = 0; i < data.rows.length; i++){
        user.push(data.rows.item(i));
      }
      return user;
    })
  }


  // list all users
  public listUsers() {
    
    if (this.database) {
      return this.database
        .executeSql('SELECT * FROM user', [])
        .then((res) => {
          const users: User[] = [];
          for (let i = 0; i < res.rows.length; i++) {
            users.push(res.rows.item(i));
            users.push({
              id : res.rows.item(i).id,
              username : res.rows.item(i).username,
              mail : res.rows.item(i).mail,
              password : res.rows.item(i).password,
            });
          }
          this.usersList.next(users);
          return this.usersList.asObservable();
        },
        err => {
          this.presentToast("Error fetching users:" + err.message);
        }
      );
    } 
    else if (this.dexie) {
      return this.dexie.table('user').toArray();
    }
    return Promise.reject('Database not initialized');
  }
  


  public fetchUsers(): Observable<User[]> {
    return this.usersList.asObservable(); // Use the BehaviorSubject to expose the observable
  }
  

  // toast message
  public async presentToast(message : any){
    const toast = await this.toastController.create({
      message : message,
      duration : 2000
    });
    toast.present();
  }

}
