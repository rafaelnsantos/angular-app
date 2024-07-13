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
    this.isMobile.set(window.innerWidth < 640)
    this.sidebarOpen.set(this.isDesktop())

    effect(() => {
      const header = this.headerRef()

      if (header) {
        this.headerHeight.set(header.nativeElement.offsetHeight)
      }
    }, {
      allowSignalWrites: true
    })

    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.isMobile.set(window.innerWidth < 640)

        const header = this.headerRef()

        if (header) {
          this.headerHeight.set(header.nativeElement.offsetHeight)
        }
      })
  }

  toggleSidebar() {
    this.sidebarOpen.update((value) => !value)
  }
}
