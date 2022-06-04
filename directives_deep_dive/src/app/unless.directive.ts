import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.tempalteRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private tempalteRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
