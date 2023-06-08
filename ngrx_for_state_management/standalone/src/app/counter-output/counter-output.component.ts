import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {selectCount, selectDoubleCount} from "../store/counter.selectors";

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  imports: [AsyncPipe],
  standalone: true,
})
export class CounterOutputComponent {
  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    this.count$ = store.select(selectCount);
    this.doubleCount$ = this.store.select(selectDoubleCount)
  }
}
