import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;
  constructor(private dataStorageService: DataStorageService,private authService:AuthService) {
  }
  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      if(user)
        this.isAuthenticated = true;
      else{
        this.isAuthenticated = false;
      }
    })
  }

  logout(){
    this.authService.logout();
  }
  onSaveData(){
    this.dataStorageService.storeRecipe();
  }
  fetchData(){
    this.dataStorageService.fetchRecipes();
  }
}
