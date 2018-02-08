import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {RecipeService} from "./recipe.service";
import 'rxjs/Rx'
import {Recipe} from "./recipe.model";
@Injectable()
export class HttpServerService {

  constructor(private http: Http,private recipeService: RecipeService) { }
  onSaveHttp()
  {
    return this.http.put('https://recipe-book-95296.firebaseio.com/recipes.json',this.recipeService.getRecipes())
  }
  onFetchHttp()
  {
    this.http.get('https://recipe-book-95296.firebaseio.com/recipes.json').map(
      (response: Response)=>{
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes)
        {
          if(!recipe['ingredients'])
          {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe(
      (recipes: Recipe[])=>{
        this.recipeService.setRecipe(recipes);
      }
    )
  }

}
