import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  isEditable: boolean;

  constructor(
    private serversService: ServersService,
    private route:ActivatedRoute) { }

  ngOnInit() {

    var id = +this.route.snapshot.params['id'];
    this.isEditable = this.route.snapshot.queryParams['allowEdit'] == '1' ? true: false;
    this.getAndSetServer(id);
    this.route.params.subscribe((param)=>{
      id= +param['id'];
      this.getAndSetServer(id);
    });
    this.route.fragment.subscribe();
    this.route.queryParams.subscribe((queryParams)=>{
      this.isEditable = queryParams['allowEdit'] == '1' ? true: false;
    });

    
  }
  getAndSetServer(id:number) {
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
