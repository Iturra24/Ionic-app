export class User {
    id: number;
    username: string;
    mail: string;
    password: string

    constructor(id: number, username: string, mail: string, password: string){
        this.id = id;
        this.username = username,
        this.mail = mail,
        this.password = password
    }
}
