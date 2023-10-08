import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients : Ingredient[] = [];
  ingredientUpdatedSubscription : Subscription;

  /**
   *
   */
  constructor(private shoppingService: ShoppingService) {}


  ngOnDestroy(): void {
    this.ingredientUpdatedSubscription.unsubscribe();
  }

  ngOnInit(): void {
   this.ingredients = this.shoppingService.getIngredients();
   this.ingredientUpdatedSubscription = this.shoppingService.ingredientUpdated.subscribe(
    ()=>{
      this.ingredients = this.shoppingService.getIngredients();
    }
   );
  }
}
