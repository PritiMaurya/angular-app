import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  recipeForm;
  editMode: boolean = false;
  subscription: Subscription

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (param: Params)=>{
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        // console.log(this.editMode)
        this.formInit()
      }
    )
  }
  addNewIng()
  {
    this.recipeForm.get('ingredients').push(new FormGroup(
      {'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])}
    ))
  }

  onSave()
  {

    if(this.editMode)
    {
      // console.log(this.recipeForm.value)
      this.recipeService.onRecipeEdit(this.id, this.recipeForm.value)
    }
    else
    {
      this.recipeService.onRecipeAdd(this.recipeForm.value)
    }
  }
  onCancel()
  {
    this.router.navigate(['../'], {relativeTo: this.route})
  }


  formInit() {
    let recipeName = '';
    let recipePath = '';
    let recipeDesc = '';
    let ingS = new FormArray([]);
    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipePath = recipe.imagePath
      recipeDesc = recipe.description
      if(recipe.ingredients)
      {
        for(let ing of recipe.ingredients)
        {
          ingS.push(new FormGroup({
            'name': new FormControl(ing.name,Validators.required),
            'amount': new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipePath,Validators.required),
      'description': new FormControl(recipeDesc,Validators.required),
      'ingredients': ingS
    })
  }

  onDeleteIng(index: number)
  {
    this.recipeForm.get('ingredients').removeAt(index)
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe()
  }


}
