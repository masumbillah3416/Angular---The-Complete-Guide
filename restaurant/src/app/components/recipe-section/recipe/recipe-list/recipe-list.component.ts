
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{
  recipes : Recipe[] = [];
  recipeChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService) {
  }
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeChangedSubscription = this.recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    });
  }

  
  ngOnDestroy(): void {
    this.recipeChangedSubscription.unsubscribe();
  }


}


