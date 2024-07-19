import {Injectable, APP_INITIALIZER, signal, effect} from "@angular/core";
import {fromEvent} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

const MEDIA_QUERY_PREFERS_DARK = '(prefers-color-scheme: dark)';
const BACKGROUND_VAR = '--mat-toolbar-container-background-color';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly query = window.matchMedia(MEDIA_QUERY_PREFERS_DARK);

  private readonly prefersDark = signal(this.query.matches);
  private readonly themeColor = document.getElementById('theme-color') as HTMLMetaElement;

  private onChange = effect(() => {
    if (this.prefersDark()) {
    } else {
    }

    setTimeout(() => this.updateThemeColor(), 150)
  })

  private updateThemeColor() {
      this.themeColor.content = getComputedStyle(document.documentElement).getPropertyValue(BACKGROUND_VAR);
  }

  constructor() {
    fromEvent(this.query, 'change').pipe(takeUntilDestroyed())
      .subscribe((event) => {
        this.prefersDark.set((event as MediaQueryListEvent).matches)
      })
  }
}

export const provideTheme = () => ({
  provide: APP_INITIALIZER,
  deps: [ThemeService],
  useFactory: () => () => {},
  multi: true
})
