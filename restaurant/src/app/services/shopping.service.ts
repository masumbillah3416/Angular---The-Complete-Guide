import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './../models/ingredient.model';


@Injectable()
export class ShoppingService{
      private ingredients : Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Tomato',10)
      ];

      ingredientUpdated = new EventEmitter();
      getIngredients(){
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientUpdated.emit();
      }
      addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientUpdated.emit();
      }
}