import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keycloak-frontend';

  username: string ;
  isLogged: boolean;
  isAdmin: boolean;

  constructor(private oAuthService:OAuthService ){
    this.username = "";
    this.isLogged = false;
    this.isAdmin = false;
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer : 'https://sso-sso1.apps.cluster-xgt47.xgt47.sandbox811.opentlc.com/auth/realms/tutorial', //provider de autenticacion
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
    this.oAuthService.loadDiscoveryDocument().then(() => this.oAuthService.tryLogin())
    .then(() => {
      if(this.oAuthService.getIdentityClaims()){
        this.isLogged = this.getIsLogged();
        this.isAdmin = this.getIsAdmin();
        const claims = this.oAuthService.getIdentityClaims();
        this.username =  ' ' + claims;
      }
    });
  }

  public getIsLogged():boolean{
    return (this.oAuthService.hasValidIdToken()&&this.oAuthService.hasValidAccessToken());
  }

  public getIsAdmin():boolean{
    const  token = this.oAuthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadaDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadaDecodedJson);
    //console.log(payloadDecoded.realm_access.roles);
    return payloadDecoded.realm_access.roles.indexOf("realm-admin") !== -1;
  }

}
