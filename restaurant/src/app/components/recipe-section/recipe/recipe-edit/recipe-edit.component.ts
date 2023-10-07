import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  recipe: Recipe;
  id: number;
  editMode = false;

  constructor( private recipeService: RecipeService, private route: ActivatedRoute) {
  
  }
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id'];
      this.editMode == params['id'] != null;
      if(this.editMode){
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    });
  }

}
