import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FeaturesPageComponent } from './pages/features-page/features-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { PricingPageComponent } from './pages/pricing-page/pricing-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'features',
    component: FeaturesPageComponent
  },
  {
    path: 'pricing',
    component: PricingPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
