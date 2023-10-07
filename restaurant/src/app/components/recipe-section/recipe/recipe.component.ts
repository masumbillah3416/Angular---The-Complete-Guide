import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent  implements OnInit{
  recipe:Recipe;


  constructor(private recipeService : RecipeService) {
    
  }

  ngOnInit(): void {
      this.recipeService.recipeSelected.subscribe(
        (recipe: Recipe) => {
          this.recipe = recipe;
        }
      )
  }


}
