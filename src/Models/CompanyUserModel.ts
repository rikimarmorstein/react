import ClientType from "./ClientType";
import UserModel from "./UserModel";

class CompanyUserModel extends UserModel {

    public constructor(clientType: ClientType, id: number, name: string, email: string, password: string) {
        super(clientType, id, name, email, password);
    }
}

export default CompanyUserModel;
