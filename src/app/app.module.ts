import { PaginationService } from './service/pagination.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/session/login/login.component';
import { HomeComponent } from './component/home/home.component';

import { MenuComponent } from './component/menu/menu.component';
import { SessionService } from './service/session.service';
import { HttpClientModule } from "@angular/common/http";
import { SessionResolver } from './resolve/session.resolve';
import { PlistComponent } from './component/post/plist/plist.component';
import { PostService } from './service/post.service';
import { ViewComponent } from './component/post/view/view.component';
import { TrimPipe } from './pipe/trim.pipe';
import { showDateTimePipe } from './pipe/showDateTime.pipe';
import { CreateComponent } from './component/post/create/create.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteComponent } from './component/post/delete/delete.component';
import { CheckPipe } from './pipe/check.pipe';
import { ClockComponent } from './component/utils/clock/clock.component';
import { LookComponent } from './component/post/look/look.component';
import { ReadComponent } from './component/post/read/read.component';
import { UpdateComponent } from './component/post/update/update.component';
import { FooterComponent } from './component/utils/footer/footer.component';
import { DialogoPostComponent } from './component/utils/dialogo-post/dialogo-post.component';
import { DialogoConfirmacionComponent } from './component/utils/dialogo-confirmacion/dialogo-confirmacion.component';
import { LogoutComponent } from './component/session/logout/logout.component';
import { HeaderComponent } from './component/utils/header/header.component';
import { RandomImgComponent } from './component/utils/random-img/random-img.component';
import { SideComponent } from './component/utils/side/side.component';
import { CommentsComponent } from './component/utils/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    MenuComponent,
    PlistComponent,
    ViewComponent,
    TrimPipe,
    showDateTimePipe,
    CreateComponent,
    DialogoConfirmacionComponent,
    DeleteComponent,
    UpdateComponent,
    CheckPipe,
    ClockComponent,
    DialogoPostComponent,
    ReadComponent,
    LookComponent,
    FooterComponent,
    HeaderComponent,
    RandomImgComponent,
    SideComponent,
    CommentsComponent,
    


    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatDialogModule, // <--- Aqu??
    BrowserAnimationsModule, // <--- Aqu??
    MatButtonModule,
  ],
  providers: [
    SessionService,
    SessionResolver,
    PostService,
    PaginationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoConfirmacionComponent// <--- Aqu??
  ]
})
export class AppModule { }
