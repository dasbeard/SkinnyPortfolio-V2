import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { LayoutModule } from "@angular/cdk/layout";

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatCardModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatExpansionModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule, StorageBucket } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";

import { NgMasonryGridModule } from 'ng-masonry-grid';

import { Keys } from "../../keys";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewLinkComponent } from './admin/new-link/new-link.component';
import { RemoveLinkComponent } from './admin/remove-link/remove-link.component';
import { RemoveAlbumComponent } from './admin/remove-album/remove-album.component';
import { NewAlbumComponent, uploadSnackBar } from './admin/new-album/new-album.component';
import { LoginComponent } from './admin/login/login.component';
import { ListLinksComponent } from './components/list-links/list-links.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DisplayAlbumComponent } from './components/display-album/display-album.component';
import { BannerComponent } from './components/banner/banner.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { PhotographyPageComponent } from './pages/photography-page/photography-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NewLinkComponent,
    RemoveLinkComponent,
    RemoveAlbumComponent,
    NewAlbumComponent,
    uploadSnackBar,
    LoginComponent,
    ListLinksComponent,
    ContactPageComponent,
    AboutPageComponent,
    HomePageComponent,
    DisplayAlbumComponent,
    BannerComponent,
    MainNavComponent,
    AdminNavComponent,
    PhotographyPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(Keys.firebase),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatExpansionModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgMasonryGridModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [uploadSnackBar]
})
export class AppModule { }
