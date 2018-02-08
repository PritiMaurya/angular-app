import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm
  ingOne: Ingredient
  editMode = false
  subscription = new Subscription;
  editId: number;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.ingEdit.subscribe(
      (id: number)=>
      {
        this.editMode = true
        this.editId = id
        this.ingOne = this.shoppingService.getIngredientOne(id)
        this.shoppingForm.setValue(
          {
            name: this.ingOne.name,
            amt: this.ingOne.amount
          }
        )
      }
    )
  }
  onItemAdded()
  {
    const value = this.shoppingForm.value
    const newIng: Ingredient = new Ingredient(value.name, value.amt)
    if(this.editMode)
    {
      this.shoppingService.updateIng(this.editId,newIng)
    }
    else {
      this.shoppingService.addIngredient(newIng)
    }
    this.shoppingForm.reset()
    this.editMode = false
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe()
  }

  onClear()
  {
    this.shoppingForm.reset()
    this.editMode = false
  }
  onDelete()
  {
    this.shoppingService.deleteIng(this.editId)
    this.onClear()
  }
}
