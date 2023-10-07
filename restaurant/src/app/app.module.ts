import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { BodyComponent } from './components/layout/body/body.component';
import { RecipeComponent } from './components/recipe-section/recipe/recipe.component';
import { RecipeDetailComponent } from './components/recipe-section/recipe/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './components/recipe-section/recipe/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe-section/recipe/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping-section/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-section/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ShoppingService } from './services/shopping.service';
import { RecipeService } from './services/recipe.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ShoppingService,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
