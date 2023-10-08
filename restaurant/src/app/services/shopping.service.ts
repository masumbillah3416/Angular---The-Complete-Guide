import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './../models/ingredient.model';
import { Subject } from 'rxjs';


@Injectable()
export class ShoppingService{
      private ingredients : Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Tomato',10)
      ];

      ingredientUpdated = new Subject();
      getIngredients(){
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient)
        this.ingredientUpdated.next(null);
      }
      addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientUpdated.next(null);
      }
}