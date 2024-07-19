import {APP_INITIALIZER, computed, Injectable, signal} from "@angular/core";
import {debounceTime, fromEvent} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

const mobileWidth = 960

@Injectable({
  providedIn: 'root'
})
export class DimensionsService {
  private readonly currentWidth = signal(window.innerWidth)
  readonly isMobile = computed(() => this.currentWidth() < mobileWidth)
  readonly isDesktop = computed(() => !this.isMobile())

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.currentWidth.set(window.innerWidth)
      })
  }
}

export const provideDimensions = () => ({
  provide: APP_INITIALIZER,
  deps: [DimensionsService],
  useFactory: () => () => {},
  multi: true
})
