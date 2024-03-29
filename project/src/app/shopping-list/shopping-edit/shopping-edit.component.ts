import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

import {Ingredient} from "../../shared/ingredient.model";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {AddIngredient, DeleteIngredient, StopEdit, UpdateIngredient} from "../store/shopping-list.actions";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", {static: false}) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select("shoppingList").subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(UpdateIngredient({ingredient: newIngredient}))
    } else {
      this.store.dispatch(AddIngredient({ingredient: newIngredient}))
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(StopEdit());
  }

  onDelete() {
    this.store.dispatch(DeleteIngredient())
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(StopEdit())
  }
}
