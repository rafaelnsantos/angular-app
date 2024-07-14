import {computed, Injectable, signal} from '@angular/core';
import {debounceTime, fromEvent} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

const DESKTOP_WIDTH = 18 // rem

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sidebarOpen = signal(false)
  sidebarRightOpen = signal(false)
  isMobile = signal(true)
  isDesktop = computed(() => !this.isMobile())
  title = signal('MonxTech')

  width = computed(() => this.isDesktop() ?
    `calc(100% - ${this.sidebarOpen() ? DESKTOP_WIDTH : 0}rem - ${this.sidebarRightOpen() ? DESKTOP_WIDTH : 0}rem)`
    : '100%'
  )

  constructor() {
    this.loadTheme()
    this.refreshIsMobile()
    this.sidebarOpen.set(this.isDesktop())

    fromEvent(window, 'resize')
      .pipe(
        takeUntilDestroyed(),
        debounceTime(100)
      )
      .subscribe(() => {
        this.refreshIsMobile()
        if (this.isMobile()) {
          this.sidebarOpen.set(false)
          this.sidebarRightOpen.set(false)
        }
      })

    fromEvent(window.matchMedia('(prefers-color-scheme: dark)'), 'change')
      .pipe(
        takeUntilDestroyed(),
        debounceTime(100)
      )
      .subscribe((event) => {
        this.loadTheme((event as MediaQueryListEvent).matches)
      })
  }

  toggleSidebar() {
    this.sidebarOpen.update((value) => !value)
  }

  toggleSidebarRight() {
    this.sidebarRightOpen.update((value) => !value)
  }

  private loadTheme(prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches) {
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    const themeColor = document.getElementById('theme-color') as HTMLMetaElement;

    if (prefersDark) {
      themeLink.href = 'theme-dark.css';
      themeColor.content = '#000000'; // TODO: get header color from theme
    } else {
      themeLink.href = 'theme-light.css';
      themeColor.content = '#ffffff'; // TODO: get header color from theme
    }
  }

  private refreshIsMobile() {
    this.isMobile.set(window.innerWidth < 960)
  }
}
