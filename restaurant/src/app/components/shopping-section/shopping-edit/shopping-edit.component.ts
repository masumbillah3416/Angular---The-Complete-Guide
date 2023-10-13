import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild("form") form:NgForm;
  shoppingStartedSubscription : Subscription;
  ingredient : Ingredient;
  isEditMode = false;
  editIndex : number;



  /**
   *
   */
  constructor(private shoppingService : ShoppingService) {}


  ngOnInit(): void {
    this.shoppingStartedSubscription = this.shoppingService.startedEditing.subscribe( (index: number)=>{
      this.ingredient = this.shoppingService.getIngredientById(index);
      this.editIndex = index;
      this.isEditMode = true;
      this.form.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount
      });
    });
  }


  
  onSubmit(form: NgForm) {
    console.log(form);
    var values = form.value;
    this.ingredient =  new Ingredient(values.name,values.amount);
    if(this.isEditMode){
      this.shoppingService.upgradeIngredient(this.editIndex,this.ingredient);
    }else{
      this.shoppingService.addIngredient(this.ingredient);
    }
    this.onClear()
  }
  onClear(){
    this.isEditMode = false;
    this.form.reset();
  }

  onDelete(){
    this.onClear();
    this.shoppingService.deleteIngredient(this.editIndex);
  }

  ngOnDestroy(): void {
   this.shoppingStartedSubscription.unsubscribe();
  }

}
