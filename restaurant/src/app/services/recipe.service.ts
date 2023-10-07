import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingService } from "./shopping.service";

@Injectable()
export class RecipeService{
    private recipes : Recipe[] = [
        new Recipe(
            'ABC',
            'DEF',
            'https://hips.hearstapps.com/hmg-prod/images/delish-202002-pozole-0392-landscape-pf-1582315071.jpg?crop=1xw:0.8441943127962085xh;center,top&resize=1200:*',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 1)
            ]), 
        new Recipe(
            'XYZ',
            'MNO',
            'https://hips.hearstapps.com/hmg-prod/images/delish-202002-pozole-0392-landscape-pf-1582315071.jpg?crop=1xw:0.8441943127962085xh;center,top&resize=1200:*',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Chicken', 1)
            ])
      ];
    public recipeSelected = new EventEmitter<Recipe>()


    /**
     *
     */
    constructor(private shoppingService: ShoppingService) {
        
    }


    getRecipes(){
       return  this.recipes.slice();
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingService.addIngredients(ingredients);
    }
}