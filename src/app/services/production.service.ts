import {AngularFireDatabase} from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProductionService {
    constructor(public afDB: AngularFireDatabase) {

    }
    public getProductions() {
        return this.afDB.list('/production/');
    }
    public getProduction(id: any) {
        return this.afDB.object('/production/' + id);
    }
    public creteProduction(production: any) {
        return this.afDB.database.ref('/production/' + production.id).set(production);
    }
    public editProduction(production: any) {
        return this.afDB.database.ref('/production/' + production.id).set(production);
    }
    public deleteProduction(production: any) {
        return this.afDB.database.ref('/production/' + production.id).remove();
    }
}