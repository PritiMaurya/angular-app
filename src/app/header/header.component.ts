import { Component } from '@angular/core';
import {HttpServerService} from "../recipe/http-server.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent {
 constructor(private serverService: HttpServerService){}

  onSaveData()
  {
    this.serverService.onSaveHttp().subscribe(
      (response)=>{console.log(response)},
      (error)=>{console.log(error)}
    )
  }
  onFetchData()
  {
     this.serverService.onFetchHttp()
  }

}

