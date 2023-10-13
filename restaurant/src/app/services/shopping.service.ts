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
      startedEditing = new Subject<number>();
      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredientById(index:number){
        return this.ingredients[index];
      }
      upgradeIngredient(index:number, ingredient:Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientUpdated.next(null);
      }

      deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientUpdated.next(null);
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