import {AngularFireDatabase} from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class BloqService{
    constructor(public afDB:AngularFireDatabase){

    }
    public getBloqs(){
        return this.afDB.list('/bloqs/');
    }
    public getBloq(id: any) {
        return this.afDB.object('/bloqs/' + id);
    }
    public creteBloq(bloq: any) {
        return this.afDB.database.ref('/bloqs/' + bloq.id).set(bloq);
    }
    public editBloq(bloq: any) {
        return this.afDB.database.ref('/bloqs/' + bloq.id).set(bloq);
    }
    public deleteBloq(bloq: any) {
        return this.afDB.database.ref('/bloqs/' + bloq.id).remove();
    }
}