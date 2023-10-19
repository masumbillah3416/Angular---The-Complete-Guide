import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeComponent } from "../components/recipe-section/recipe/recipe.component";
import { ShoppingListComponent } from "../components/shopping-section/shopping-list/shopping-list.component";
import { RecipeStartComponent } from "../components/recipe-section/recipe/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "../components/recipe-section/recipe/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../components/recipe-section/recipe/recipe-edit/recipe-edit.component";
import { AuthComponent } from "../components/auth/auth.component";
import { AuthGuard } from "../components/auth/auth.guard";


const routes : Routes = [
    { path: '' , redirectTo: '/recipes' , pathMatch: 'full' },
    { path: 'recipes' , component: RecipeComponent ,canActivate: [AuthGuard], children:[
       {path: '', component: RecipeStartComponent},
       {path: 'new' , component: RecipeEditComponent},
       {path: ':id' , component: RecipeDetailComponent},
       {path: ':id/edit' , component: RecipeEditComponent},
    ] },
    { path: 'shopping-list' , component: ShoppingListComponent },
    { path: 'login' , component: AuthComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRouteModule{

}