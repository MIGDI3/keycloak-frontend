export class Usuario {
    userName:string;
    email:string;
    firstName:string;
    lastName:string;
    password:string;

    constructor(userName:string, email:string, firstName:string, lastName:string, password:string){
        this.userName=userName;
        this.email = email;
        this.firstName=firstName;
        this.lastName=lastName;
        this.password=password;
    }
}
