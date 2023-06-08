import {Component, OnInit} from "@angular/core";

import {Ingredient} from "../shared/ingredient.model";
import {LoggingService} from "../logging.service";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {StartEdit} from "./store/shopping-list.actions";
import {Observable} from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private store: Store<AppState>,
    private loggingService: LoggingService
  ) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");

    this.loggingService.printLog("Hello form ShoppingListComponent ngOnInit!");
  }

  onEditItem(index: number) {
    this.store.dispatch(StartEdit({index: index}))
  }
}
