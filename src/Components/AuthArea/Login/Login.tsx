import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import CredentialsModel from "../../../Models/CredentialsModel";
import { logoutAction as logoutCompany } from "../../../Redux/CompanyState";
import { logoutAction as logoutCoupon} from "../../../Redux/CouponState";
import { logoutAction as logoutCustomer } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";
import { FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles } from "@mui/material";

import React from "react";

function Login(): JSX.Element {
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

        function send(credentials: CredentialsModel) {
        authService.login(credentials).then(()=>{
            notificationService.success("Welcome!");
      runLogoutTimer();
             if(credentials.clientType==="ADMIN"){
                 navigate("/admin-home");
            }
            if(credentials.clientType==="COMPANY"){
                 navigate("/company-home");
                
           }if(credentials.clientType==="CUSTOMER"){
            navigate("/customer-home");
           
      }
         })
             .catch((err)=>
              notificationService.error(err)
           );
                    
            
                   
        }
        const runLogoutTimer = () => {

        setTimeout(() => {
            authService.logout();
            store.dispatch(logoutCompany());
            store.dispatch(logoutCoupon());
            store.dispatch(logoutCustomer());

            navigate("/login")
    
        }, 1_800_000 ) // 30:00 minutes - 1800000
    
      }

    //   interface State {
        
    //     password: string;
    //     showPassword: boolean;

    //   }

    // //   const classes = useStyles();
    //   const [values, setValues] = React.useState<State>({
    //     password: '',
        
    //     showPassword: false
    //   });
    
    //   const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValues({ ...values, [prop]: event.target.value });
    //   };
    
    //   const handleClickShowPassword = () => {
    //     setValues({ ...values, showPassword: !values.showPassword });
    //   };
    
    //   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    //   };
    
    return (
        <div className="Login">

			<form onSubmit={handleSubmit(send)}>
                
                <label>Client Type: </label>
                <select defaultValue="" required {...register("clientType")}>
                    <option disabled value="">Select Client Type...</option>
                    <option value={ClientType.ADMINISTRATOR}>Admin</option>
                    <option value={ClientType.COMPANY}>Company</option>
                    <option value={ClientType.CUSTOMER}>Customer</option>
                    
                </select>

                <label>Email: </label>
                <input type="email" required {...register("email")} />

                <label>Password: </label>
                 <input type="password" required {...register("password")} />
                {/* <FormControl > */}

                {/* <InputLabel htmlFor="standard-adornment-password" required {...register("password")}>Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                {/* </IconButton>
              </InputAdornment>
             }
          {/* /> */}
        {/* </FormControl> */}
        {/* </FormControl> */}


                <button>Login</button>

            </form>
        </div>
    );
}

export default Login;

