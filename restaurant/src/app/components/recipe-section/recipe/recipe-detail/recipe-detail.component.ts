import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index:number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,private router: Router) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.index = +params['id'];
      this.recipe =  this.getRecipeByRecipeName(this.index);
    });
    
  }

  getRecipeByRecipeName(id:number): Recipe {
    return this.recipeService.getRecipeById(id);
  }
  
  recipeDelete(){
    this.recipeService.deleteRecipe(this.index)
    this.router.navigate(['recipes'])
  }

  addToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
