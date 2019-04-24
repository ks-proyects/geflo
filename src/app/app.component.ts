import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent  implements OnInit{
  title = 'geflo';
  panelOpenState = false;
  constructor(private swUpdate:SwUpdate){}
  ngOnInit():void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        window.location.reload();
      })
    }
  }
}
