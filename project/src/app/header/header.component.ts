import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {map} from "rxjs/operators";
import {fetchRecipes, storeRecipes} from "../recipes/store/recipe.actions";
import {logout} from "../auth/store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.userSubscription = this.store
      .select("auth")
      .pipe(map(authState => authState.user))
      .subscribe((user) => this.isAuthenticated = !!user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.store.dispatch(storeRecipes());
  }

  onFetchData() {
    this.store.dispatch(fetchRecipes());
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
