import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipeComponent} from "./recipe/recipe.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RepiceStartComponent} from "./recipe/repice-start/repice-start.component";
import {RecipeDetailComponent} from "./recipe/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipe/recipe-edit/recipe-edit.component";
import {SignUpComponent} from "./auth/signup/signup.component";
import {SignInComponent} from "./auth/signin/signin.component";

const appRouts: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes',
    component: RecipeComponent,
  children: [{path: '' , component: RepiceStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id/edit', component: RecipeEditComponent},
    {path: ':id' , component: RecipeDetailComponent}],
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(appRouts)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


