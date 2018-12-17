import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AboutComponent } from './components/main-component/about/about.component';
import { HomeComponent } from './components/main-component/home/home.component';
import { PagesComponent } from './components/main-component/pages/pages.component';
import { PageComponent } from './components/main-component/pages/page/page.component';
import { CarouselComponent } from './components/main-component/home/carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { UserService } from '../shared/services/user.service';
import { MembersComponent } from './components/main-component/members/members.component';
import { MemberItemComponent } from './components/main-component/members/member-item/member-item.component';
import { UserprofileComponent } from './components/main-component/userprofile/userprofile.component';
import { DueMemberItemComponent } from './components/main-component/members/due-member-item/due-member-item.component';



const appRoutes : Routes =[
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: UserprofileComponent},
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
    AboutComponent,
    UserprofileComponent,
    CarouselComponent,
    PagesComponent,
    PageComponent,
    LoginComponent,
    MembersComponent,
    MemberItemComponent,
    DueMemberItemComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
