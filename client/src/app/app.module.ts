import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/components/login/login.component';
import {RegisterComponent} from './auth/components/register/register.component';
import {CartComponent} from './cart/cart.component';
import {OrderHistoryComponent} from './order-history/order-history.component';
import {ProductComponent} from './product/product.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ProfileComponent} from './profile/profile.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {AuthModule} from './auth/auth.module';
import {FormsModule} from '@angular/forms';
import {authInterceptorProviders} from './services/interceptor.service';
import {AuthGuardService} from './guards/auth-guard.service';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzAlertModule} from 'ng-zorro-antd/alert';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {SwiperModule} from 'swiper/angular';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTableModule} from 'ng-zorro-antd/table';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {BrandService} from "./services/brand.service";
import {CDP} from "./services/cdp.service";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    OrderHistoryComponent,
    ProductComponent,
    CheckoutComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    NzInputModule,
    NzAlertModule,
    NzInputNumberModule,
    SwiperModule,
    NzSpinModule,
    NzNotificationModule,
    NzProgressModule,
    NzTableModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
  ],
  providers: [
    authInterceptorProviders,
    AuthGuardService,
    CDP,
    {
      provide:APP_INITIALIZER,
      deps: [CDP, BrandService],
      useFactory: (cdp: CDP, {cdp: brandCdp}: BrandService) => () => cdp.init(brandCdp.bUnitId, brandCdp.appId),
      multi: true
    },
    {
      provide: NZ_I18N, useValue: en_US
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
