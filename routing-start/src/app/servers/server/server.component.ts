import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverId: number;

  constructor(private serversService: ServersService, private router:ActivatedRoute) { }

  ngOnInit() {

    this.serverId = +this.router.snapshot.params['id'];
    this.server = this.serversService.getServer(this.serverId);
    this.router.params.subscribe((param)=>{
      this.serverId = +param['id'];
      this.server = this.serversService.getServer(this.serverId);
    });
  }

}
