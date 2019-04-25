import {AngularFireDatabase} from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class WorkerService{
    constructor(public afDB: AngularFireDatabase) {

    }
    public getWorkers() {
        return this.afDB.list('/worker/');
    }
    public getWorker(id: any) {
        return this.afDB.object('/worker/' + id);
    }
    public creteWorker(worker: any) {
        return this.afDB.database.ref('/worker/' + worker.id).set(worker);
    }
    public editWorker(worker: any) {
        return this.afDB.database.ref('/worker/' + worker.id).set(worker);
    }
    public deleteWorker(worker: any) {
        return this.afDB.database.ref('/worker/' + worker.id).remove();
    }
}