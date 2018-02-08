import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs/Subscription";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  subscription: Subscription
  constructor(private shoppingServices: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingServices.getIngredient()
    this.subscription = this.shoppingServices.ingChange.subscribe(
      (ing: Ingredient[]) =>{
        this.ingredients = ing;
      }
    )
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe()
  }

  onItemEdit(index: number)
  {
    this.shoppingServices.ingEdit.next(index);
  }
}
