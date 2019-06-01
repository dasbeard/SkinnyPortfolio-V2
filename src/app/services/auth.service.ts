import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  isLoggedIn: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router:Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          this.isLoggedIn = true;
          return this.afs.doc(`admins/${user.uid}`).valueChanges();
        } else {
          this.isLoggedIn = false;
          return of(null);
        }
      })
    );
   }

   async googleSignIn() {
     const provider = new auth.GoogleAuthProvider();
     provider.setCustomParameters({
       prompt: "select_account"
     });

     const credential = await this.afAuth.auth.signInWithPopup(provider);
     this.isLoggedIn = true;
     return credential.user;
   }

   async signOut() {
     await this.afAuth.auth.signOut();
     this.isLoggedIn = false;
    //  this.router.navigate(["/"]);
   }

}
