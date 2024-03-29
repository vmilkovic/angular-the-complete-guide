import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeServices } from "../recipes/recipe.services";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  firebaseApiUrl =
    "https://ng-course-recipe-book-10c0b-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";

  constructor(
    private http: HttpClient,
    private recipeService: RecipeServices
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.firebaseApiUrl, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.firebaseApiUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
