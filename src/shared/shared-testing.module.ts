import {NgModule} from "@angular/core";
import {provideRouter} from "@angular/router";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    NoopAnimationsModule,
  ],
  providers: [
    provideRouter([]),
  ],
})
export class SharedTestingModule {
}
