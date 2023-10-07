import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: {id: number, name: string, status: string};
  serverId: number;

  constructor(private serversService: ServersService, private route:ActivatedRoute, private router : Router) { }

  ngOnInit() {

    this.serverId = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(this.serverId);
    this.route.params.subscribe((param)=>{
      this.serverId = +param['id'];
      this.server = this.serversService.getServer(this.serverId);
    });
  }

  onEditClick() {
    this.router.navigate(['edit'],{relativeTo: this.route,queryParamsHandling: 'preserve'} )
  }
}
