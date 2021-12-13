import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keycloak-frontend';

  username: string ='';
  isLogged: boolean = false;
  isAdmin: boolean = false;

  constructor(private oAuthService:OAuthService, private messageService:MessageService ){
    /*this.username = "";
    this.isLogged = false;
    this.isAdmin = false;*/
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer : 'http://localhost:8180/auth/realms/tutorial', //provider de autenticacion
    redirectUri: window.location.origin,
    clientId: 'tutorial-frontend',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  }
  
  configure(): void {
    this.oAuthService.configure(this.authConfig);
    this.oAuthService.tokenValidationHandler = new NullValidationHandler();
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocument().then(() => this.oAuthService.tryLogin())
    .then(() => {
      if(this.oAuthService.hasValidAccessToken()&&this.oAuthService.hasValidIdToken()){
        this.isLogged = this.getIsLogged();
        this.isAdmin = this.getIsAdmin();
        this.username =  this.getName();
        this.messageService.sendMessage(this.getName());
      }
    });
  }

  public getName():string {
    let claims = this.oAuthService.getIdentityClaims();
    const resultado1 = JSON.stringify(claims);
    const valores =resultado1.split(",");
    const largo = valores[13].length - 1;
    const resultado = valores[13].substring(8,largo);
    console.log(resultado);
    if (!claims) return "";
    return resultado;
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
