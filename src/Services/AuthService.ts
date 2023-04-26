import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import { AuthActionType } from "../Redux/AuthState";
import store from "../Redux/Store";
import appConfig from "../Utils/Config";

class AuthService {

    // Login to backend:
    public async login(credentials: CredentialsModel): Promise<void> {
        // Send credentials to backend, get back response: 

        const response = await axios.post<string>(appConfig.authUrl, credentials);
        // Extract token: 
        const token = response.data;
        // Update redux:
        store.dispatch({ type: AuthActionType.Login, payload: token });
    }

    // Logout: 
    public logout(): void {
        // Update redux: 
        store.dispatch({ type: AuthActionType.Logout });
    }
}

const authService = new AuthService();

export default authService;
