import { Component, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput : ElementRef;
  @ViewChild('amountInput') amountInput : ElementRef;

  /**
   *
   */
  constructor(private shoppingService : ShoppingService) {}

  addNewIngredient() {
    var ingredient =  new Ingredient(this.nameInput.nativeElement.value,this.amountInput.nativeElement.value);
    this.shoppingService.addIngredient(ingredient);
  }
}
