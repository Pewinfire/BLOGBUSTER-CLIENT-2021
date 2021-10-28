import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LogoutComponent } from './component/logout/logout.component';
import { SecretComponent } from './component/secret/secret.component';
import { SessionResolver } from './resolve/session.resolve';
import { PlistComponent } from './component/post/plist/plist.component';
import { ViewComponent } from './component/view/view.component';
import { CreateComponent } from './component/create/create.component';
import { UpdateComponent } from './component/update/update.component';
import { DeleteComponent } from './component/delete/delete.component';


const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { message: SessionResolver } },
  { path: 'home', component: HomeComponent, resolve: { message: SessionResolver } },
  { path: 'login', component: LoginComponent, resolve: { message: SessionResolver } },
  { path: 'logout', component: LogoutComponent, resolve: { message: SessionResolver } },
  { path: 'secret', component: SecretComponent, resolve: { message: SessionResolver } },
  { path: 'plist', component: PlistComponent, resolve: { message: SessionResolver } },
  { path: 'view/:id', component: ViewComponent, resolve: { message: SessionResolver } },
  { path: 'create', component: CreateComponent, resolve: { message: SessionResolver } },
  { path: 'update/:id', component: UpdateComponent, resolve: { message: SessionResolver } },
  { path: 'delete/:id', component: DeleteComponent, resolve: { message: SessionResolver } },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
