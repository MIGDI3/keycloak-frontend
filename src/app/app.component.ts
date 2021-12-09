import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keycloak-frontend';

  constructor(private oAuthService:OAuthService ){
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer : 'https://sso-sso1.apps.cluster-xgt47.xgt47.sandbox811.opentlc.com/auth', //provider de autenticacion
    redirectUri: window.location.origin,
    clientId: 'tutorial-frontend',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  }
  
  configure(): void {
    this.oAuthService.configure(this.authConfig);
    this.oAuthService.tokenValidationHandler = new NullValidationHandler;
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocument().then(() => this.oAuthService.tryLogin());
  }

  login():void {
    this.oAuthService.initImplicitFlowInternal();
  }

  logout():void {
    this.oAuthService.logOut();
  }

}
