import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  recipe: Recipe;
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor( private recipeService: RecipeService, private route: ActivatedRoute, private router:Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if(this.editMode){
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
      this.initForm();
    });
  }

  private initForm() {
    let recipeIngredients = new FormArray([]);
  
    if (this.recipe && this.recipe.ingredients) {
      for (let ingredient of this.recipe.ingredients) {
        recipeIngredients.push(this.newFormGroup(ingredient?.name,ingredient?.amount));
      }
    }
  
    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipe ? this.recipe.name : null, Validators.required),
      imagePath: new FormControl(this.recipe ? this.recipe.imagePath : null ,Validators.required),
      description: new FormControl(this.recipe ? this.recipe.description : null, Validators.required),
      ingredients: recipeIngredients
    });
  
    console.log(this.recipeForm);
  }

  get controls() { // a getter!
    var x = (<FormArray>this.recipeForm.get('ingredients')).controls;
    console.log(x);
    return x;
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.newFormGroup(null,null)
    )
  }

  onCancel(){
    this.router.navigate(['../', { relativeTo: this.route }]);
  }
  onDeleteIngredient(i:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
  onSubmit() {
    this.recipe = this.recipeForm.value;
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipe)
      this.router.navigate(['recipes',this.id])
    }else{
      this.recipeService.addRecipe(this.recipe)
      this.router.navigate(['recipes'])
    }

  }

  private newFormGroup(name:string, amount:number) :FormGroup {
    return new FormGroup({
      name: new FormControl(name ,Validators.required ),
      amount: new FormControl(amount , [ Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  }

}
