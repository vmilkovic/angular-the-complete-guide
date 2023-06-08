import {Component, ComponentFactoryResolver, OnDestroy, ViewChild,} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {clearError, loginStart, signupStart} from "./store/auth.actions";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  @ViewChild(PlaceholderDirective, {
    static: false,
  })
  alertHost: PlaceholderDirective;

  private closeSubscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(loginStart({email: email, password: password}));
    } else {
      this.store.dispatch(signupStart({email: email, password: password}));
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }

  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.message = errorMessage;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
