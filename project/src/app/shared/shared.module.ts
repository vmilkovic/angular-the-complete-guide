import {NgModule} from "@angular/core";
import {DropdownDirective} from "./dropdown.directive";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {AlertComponent} from "./alert/alert.component";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {CommonModule} from "@angular/common";
import {LoggingService} from "../logging.service";

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule,
  ],
  providers: [LoggingService]
})
export class SharedModule {
}
