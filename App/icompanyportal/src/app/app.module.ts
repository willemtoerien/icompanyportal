import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeaturesPageComponent } from './pages/features-page/features-page.component';
import { UtilsModule, APP_TITLE } from 'utils';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { FormsExModule } from 'forms-ex';
import { AppRedirectDirective } from './directives/app-redirect.directive';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FeaturesPageComponent,
    ContactPageComponent,
    AppRedirectDirective,
    PricingPageComponent
  ],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppRoutingModule, UtilsModule, FormsExModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_TITLE,
      useValue: 'iCompanyPortal.com'
    }
  ]
})
export class AppModule {}
