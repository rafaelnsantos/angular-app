import {computed, effect, ElementRef, Injectable, signal} from '@angular/core';
import {fromEvent} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  sidebarOpen = signal(false)
  headerHeight = signal(48)
  containerHeight = computed(() => `calc(100dvh - ${this.headerHeight()}px)`)
  isMobile = signal(true)
  isDesktop = computed(() => !this.isMobile())
  headerRef = signal<ElementRef<HTMLDivElement> | null>(null)

  constructor() {
    this.loadTheme()
    this.refreshIsMobile()
    this.sidebarOpen.set(this.isDesktop())

    effect(() => {
      this.refreshHeaderHeight()
    }, {
      allowSignalWrites: true
    })

    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.refreshIsMobile()
        this.refreshHeaderHeight()
      })

    fromEvent(window.matchMedia('(prefers-color-scheme: dark)'), 'change')
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        this.loadTheme((event as MediaQueryListEvent).matches)
      })
  }

  toggleSidebar() {
    this.sidebarOpen.update((value) => !value)
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
    this.isMobile.set(window.innerWidth < 640)
  }
  private refreshHeaderHeight() {
    const header = this.headerRef()

    if (header) {
      this.headerHeight.set(header.nativeElement.offsetHeight)
    }
  }
}
