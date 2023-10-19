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
import { AppRouteModule } from './routes/routes.module';
import { RecipeStartComponent } from './components/recipe-section/recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipe-section/recipe/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataStorageService } from './services/data-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component'
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { AuthService } from './components/auth/auth.service';
import { AuthInterceptorService } from './components/auth/auth-interceptor.service';

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
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ShoppingService,
    RecipeService,
    DataStorageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
