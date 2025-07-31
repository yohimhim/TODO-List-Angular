import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '426310881062-tboo273hl4nlqmfrhquaacahl8k3laq2.apps.googleusercontent.com',
  scope: 'openid profile email'
}

export interface UserInfo {
  info: {
    sub: string, //identifier for user
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfileSubject = new Subject<UserInfo>();
  private currentUserInfo: UserInfo | null = null;


  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocument().then( () => {
      oAuthService.tryLoginImplicitFlow().then( () => {
        if(!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo);
            console.log(JSON.stringify(userProfile));
            
            const profile = userProfile as UserInfo;

            const userId = profile.info.sub;
            console.log('User ID: ' + userId);

            const email = profile.info.email;
            console.log('Email: ' + email);

            const name = profile.info.name;
            console.log('Name: ' + name);

            const profilePicture = profile.info.picture;
            console.log('Profile Picture: ' + profilePicture);
            this.currentUserInfo = profile;
            this.userProfileSubject.next(profile);

          })
        }
      })
    })
  }

  get userEmail() {
    return this.currentUserInfo?.info.email ?? null;
  }

  get userProfilePicture() {
    return this.currentUserInfo?.info.picture ?? null;
  }

  
}
