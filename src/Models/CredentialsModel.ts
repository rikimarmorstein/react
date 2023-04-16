import ClientType from "./ClientType";

class CredentialsModel {
    public id?: number;

	public clientType?: ClientType;
    public name?: string;
    public email?: string;
    public password?: string;

}

export default CredentialsModel;
