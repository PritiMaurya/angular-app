import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs/Subject";

export class ShoppingListService
{
  private ingredients: Ingredient[] = [
    new Ingredient("Apple",10),
    new Ingredient("Orange",12)
  ];
  ingChange = new Subject<Ingredient[]>()
  ingEdit = new Subject<number>()

  getIngredient()
  {
    return this.ingredients.slice()
  }
  getIngredientOne(index: number)
  {
    return this.ingredients[index];
  }
  addIngredient(ing: Ingredient)
  {
    this.ingredients.push(ing)
    this.ingChange.next(this.ingredients.slice())
  }

  addIngredients(ingredient: Ingredient[])
  {
    this.ingredients.push(...ingredient)
    this.ingChange.next(this.ingredients.slice())
  }
  updateIng(index: number, newIng: Ingredient)
  {
    this.ingredients[index] = newIng;
    this.ingChange.next(this.ingredients.slice())
  }
  deleteIng(index: number)
  {
    this.ingredients.splice(index,1);
    this.ingChange.next(this.ingredients.slice())
  }
}
