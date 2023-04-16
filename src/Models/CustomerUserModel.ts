import ClientType from "./ClientType";
import UserModel from "./UserModel";

class CustomerUserModel extends UserModel {
	// public firstName: string;
	// public lastName: string;

    public constructor(clientType: ClientType, id: number,name:string, email: string, password: string) {
        super(clientType, id,name, email, password);
        // this.firstName = firstName;
        // this.lastName = lastName;
    }
}

export default CustomerUserModel;
