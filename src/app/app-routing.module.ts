import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { NewAlbumComponent } from './admin/new-album/new-album.component';
import { NewLinkComponent } from './admin/new-link/new-link.component';
import { RemoveAlbumComponent } from './admin/remove-album/remove-album.component';
import { RemoveLinkComponent } from './admin/remove-link/remove-link.component';
import { LoginComponent } from './admin/login/login.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
    children: []
  },
  {
    path: "about",
    pathMatch: "full",
    component: AboutPageComponent,
    children: []
  },
  {
    path: "contact",
    pathMatch: "full",
    component: ContactPageComponent,
    children: []
  },
  {
    path: "admin",
    component: LoginComponent,
    children: [
      { path: "", component: NewAlbumComponent },
      { path: "newLink", component: NewLinkComponent },
      { path: "removeAlbum", component: RemoveAlbumComponent },
      { path: "removeLink", component: RemoveLinkComponent },
    ]
  },

  {
    path: "**",
    component: HomePageComponent
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
