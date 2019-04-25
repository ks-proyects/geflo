import {AngularFireDatabase} from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class NavService{
    constructor(public afDB: AngularFireDatabase) {

    }
    public getNavs(){
        return this.afDB.list('/nav/');
    }
    public getNav(id: any) {
        return this.afDB.object('/nav/' + id);
    }
    public creteNav(nav: any) {
        return this.afDB.database.ref('/nav/' + nav.id).set(nav);
    }
    public editNav(nav: any) {
        return this.afDB.database.ref('/nav/' + nav.id).set(nav);
    }
    public deleteNav(nav: any) {
        return this.afDB.database.ref('/nav/' + nav.id).remove();
    }
}