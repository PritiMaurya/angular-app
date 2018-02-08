import {Recipe} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs/Subject";
import {ActivatedRoute, Router} from "@angular/router";
@Injectable()
export class RecipeService
{
  recipeChange = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(" Pizza",
      "Pepperoni Pizza It is Very Delicious",
      "http://del.h-cdn.co/assets/17/41/640x959/gallery-1507827336-slow-cooker-pizza-delish-1.jpg",
      [new Ingredient('bread',1),new Ingredient('Tomato',2),new Ingredient('Cheeze',5)]),
    new Recipe("Burger King",
      "This special all-veg version of the WHOPPER® has been created just for India. The crisp patty is made with 100% vegetables and served in a 5-inch freshly toasted sesame seed bun.",
      "http://bk-apac-prd.s3.amazonaws.com/sites/burgerkingindia.in/files/VegWhopper-Detail_0.png",
      [new Ingredient('Burger Bun',2),new Ingredient('Vegetables',5)])
  ];

  constructor(private shoppingService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) {}
  getRecipes()
  {
    return this.recipes.slice()
  }
  getRecipe(index)
  {
    return this.recipes[index];
  }
  addIngAdded(ing: Ingredient[])
  {
    this.shoppingService.addIngredients(ing)
    this.router.navigate(['../shopping-list'],{relativeTo:this.route})
  }
  onRecipeAdd(newRecipe: Recipe)
  {
    this.recipes.push(newRecipe);
    this.recipeChange.next(this.recipes.slice());
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  onRecipeEdit(index: number,newRecipe: Recipe)
  {
    this.recipes[index] = newRecipe;
    this.recipeChange.next(this.recipes.slice());
    this.router.navigate(['../'],{relativeTo: this.route})
    //console.log(this.recipes)
  }

  onRecipeDelete(index: number)
  {
    this.recipes.splice(index,1);
    this.recipeChange.next(this.recipes.slice());
  }

  setRecipe(recipes: Recipe[])
  {
    this.recipes = recipes;
    this.recipeChange.next(this.recipes.slice());
  }
}
