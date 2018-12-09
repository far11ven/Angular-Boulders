import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LibraryComponent } from './components/main-component/library/library.component';
import { LibraryItemComponent } from './components/main-component/library/library-item/library-item.component';
import { AboutComponent } from './components/main-component/about/about.component';
import { HomeComponent } from './components/main-component/home/home.component';
import { RadioComponent } from './components/main-component/radio/radio.component';
import { PagesComponent } from './components/main-component/pages/pages.component';
import { PageComponent } from './components/main-component/pages/page/page.component';
import { CarouselComponent } from './components/main-component/home/carousel/carousel.component';
import { LoginComponent } from './login/login.component';


const appRoutes : Routes =[
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'library', component: LibraryComponent},
  {path: 'radio', component: RadioComponent},
  {path: 'about', component: AboutComponent},
  {path: 'pages', component: PagesComponent, children:  [ 
    {path: ':id', component: PageComponent}
  ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponentComponent,
    HomeComponent,
    LibraryComponent,
    LibraryItemComponent,
    AboutComponent,
    RadioComponent,
    CarouselComponent,
    PagesComponent,
    PageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
