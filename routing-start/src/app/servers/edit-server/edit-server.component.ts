import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/can-deactivate-guard.service';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export default class EditServerComponent implements OnInit , CanDeactivateGuard {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  isEditable: boolean;
  changesSaved = false;

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
    this.changesSaved = true
  }
  canDeactivate():  Observable<boolean> | Promise<boolean> | boolean
  {
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved)
      return confirm('Do you want to discard the changes?');
    return true;
  }

}
