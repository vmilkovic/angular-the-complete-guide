import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,} from "@angular/router";

import {Recipe} from "./recipe.model";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {map, switchMap, take} from "rxjs/operators";
import {fetchRecipes} from "./store/recipe.actions";
import {of} from "rxjs";

@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<AppState>
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipeState => {
        return recipeState.recipes;
      })),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(fetchRecipes());
          return of([]);
        } else {
          return of(recipes);
        }
      })
    )
  }
}
