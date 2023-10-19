import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../models/recipe.model";
import { exhaustMap, map, take } from "rxjs";
import { AuthService } from "../components/auth/auth.service";

@Injectable()
export class DataStorageService{
    baseUrl = 'https://restaurant-aed5a-default-rtdb.asia-southeast1.firebasedatabase.app/';
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService:AuthService) {}

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.baseUrl + 'recipes.json',recipes).subscribe(response =>{
            console.log('Recipe store response: ' , response);
        });
    }

    fetchRecipes(){
        this.http.get<Recipe[]>(this.baseUrl + 'recipes.json').
        pipe(map(recipes=>{
            return recipes.map(recipe =>{
                return {...recipe , ingredients : recipe.ingredients ? recipe.ingredients : []};
            });
        })).
        subscribe(response  =>{
            console.log('Recipe fetch response: ' , response);
            this.recipeService.setRecipes(response);
        });
    }

}