import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppSessionService } from './shared/auth/app-session.service';
import { ServiceProxyModule } from './shared/service-proxy/service-proxy.module'

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { ContentComponent } from './content/content.component';
import { SiderBarComponent } from './content/layout/sider-bar.component';


import en from '@angular/common/locales/en';

registerLocaleData(en);

export function appInitializerFactory(injector: Injector,
  platformLocation: PlatformLocation) {
  return () => {
    return new Promise<boolean>((resolve, reject) => {
      var appSessionService: AppSessionService = injector.get(AppSessionService);
      appSessionService.init();
    });
  }

}

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    ContentComponent,
    SiderBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    NgxEchartsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceProxyModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
