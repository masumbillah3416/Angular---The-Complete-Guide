import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      const id = +params['id'];
      this.recipe =  this.getRecipeByRecipeName(id);
    });
    
  }

  getRecipeByRecipeName(id:number): Recipe {
    return this.recipeService.getRecipeById(id);
  }
  

  addToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
