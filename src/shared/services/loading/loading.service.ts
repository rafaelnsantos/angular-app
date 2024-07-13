import { computed, Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCount = signal(0)

  isLoading = computed(() => this.loadingCount() > 0)

  set loading(loading: boolean) {
    if (loading) {
      this.loadingCount.update((count) => count + 1)
      return
    }

    if (this.loadingCount() === 0) {
      return
    }

    this.loadingCount.update((count) => count - 1)
  }

}
