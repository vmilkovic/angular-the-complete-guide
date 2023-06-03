import { NgModule } from "@angular/core";
import { ShoppingListService } from "./app/shopping-list/shopping-list.service";
import { AuthInterceptorService } from "./app/auth/auth-interceptor.service";
import { RecipeServices } from "./app/recipes/recipe.services";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  providers: [
    ShoppingListService,
    RecipeServices,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
