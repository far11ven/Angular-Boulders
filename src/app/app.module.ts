import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AboutComponent } from './components/main-component/about/about.component';
import { HomeComponent } from './components/main-component/home/home.component';
import { PagesComponent } from './components/main-component/pages/pages.component';
import { PageComponent } from './components/main-component/pages/page/page.component';
import { CarouselComponent } from './components/main-component/home/carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './components/main-component/members/members.component';
import { MemberItemComponent } from './components/main-component/members/member-item/member-item.component';
import { UserprofileComponent } from './components/main-component/userprofile/userprofile.component';
import { MemberProfileComponent } from './components/main-component/members/member-profile/member-profile.component';

import { UserService } from '../shared/services/user.service';
import { GetMemberService } from '../shared/services/get-member.service';
import { CurrentMemberService } from '../shared/services/current-member.service';
import { AddMemberComponent } from './components/main-component/members/add-member/add-member.component';
import { EditMemberComponent } from './components/main-component/members/edit-member/edit-member.component';
import { AddMemberService } from '../shared/services/add-member.service';
import { EditMemberService } from '../shared/services/edit-member.service';
import { DeleteMemberService } from '../shared/services/delete-member.service';
import { CurrentUserService } from '../shared/services/current-user.service';
import { EditUserComponent } from './components/main-component/userprofile/edit-user/edit-user.component';



const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: UserprofileComponent },
  { path: 'profile/edit', component: EditUserComponent },
  { path: 'about', component: AboutComponent },
  { path: 'member/addmember', component: AddMemberComponent },
  { path: 'member/profile/:id', component: MemberProfileComponent },
  { path: 'member/edit-profile/:id', component: EditMemberComponent },
  {
    path: 'pages', component: PagesComponent, children: [
      { path: ':id', component: PageComponent }
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
    MemberProfileComponent,
    AddMemberComponent,
    EditMemberComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService,CurrentUserService, GetMemberService, CurrentMemberService, AddMemberService, EditMemberService, DeleteMemberService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
