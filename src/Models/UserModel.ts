import ClientType from "./ClientType";

class UserModel {
    public clientType: ClientType;
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    public constructor(clientType: ClientType, id: number, name: string, email: string, password: string) {
        this.clientType = clientType;
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

}

export default UserModel;
