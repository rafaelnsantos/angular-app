import {computed, effect, inject, Injectable, signal} from '@angular/core';
import { DimensionsService } from './dimensions.service';

type MenuItem = {
  label: string
  icon: string
  routerLink: string
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  dimensionsService = inject(DimensionsService)

  sidebarLeftOpen = signal(this.dimensionsService.isDesktop())
  sidebarRightOpen = signal(false)

  title = signal('MonxTech')
  menuItems = signal<MenuItem[]>([])

  onChangeDimensions = effect(() => {
    if (this.dimensionsService.isMobile()) {
      this.closeSidebars()
    }
  }, {
    allowSignalWrites: true
  })

  sidebarMode = computed(() => this.dimensionsService.isMobile() ? 'push' : 'side')

  toggleSidebar() {
    this.sidebarLeftOpen.update((value) => !value)
  }

  toggleSidebarRight() {
    this.sidebarRightOpen.update((value) => !value)
  }

  closeSidebars() {
    this.sidebarLeftOpen.set(false)
    this.sidebarRightOpen.set(false)
  }

  sidebarLeftIcon = signal('menu')
  sidebarRightIcon = signal('person')
}
