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
import { Avatar, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, makeStyles } from "@mui/material";
import {MdAttachEmail} from "react-icons/md";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";


import "./Login.css";

import React, { useState } from "react";

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


    const [value, setValue] = React.useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
};

    // const {register,handleSubmit}=useForm<CredentialsModel>();
    // const navigate=useNavigate();
    const [values, setValues] = useState({
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });

  
  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
    return (
        <div className="Login">

			<form onSubmit={handleSubmit(send)}>
                
                {/* <label>Client Type: </label>
                <select defaultValue="" required {...register("clientType")}>
                    <option disabled value="">Select Client Type...</option>
                    <option value={ClientType.ADMINISTRATOR}>Admin</option>
                    <option value={ClientType.COMPANY}>Company</option>
                    <option value={ClientType.CUSTOMER}>Customer</option>
                    
                </select> */} 
<FormControl component="fieldset">
      <FormLabel component="legend">Client Type:</FormLabel>
      <RadioGroup row  value={value} onChange={handleChangeEmail} >
        <FormControlLabel required {...register("clientType")}  value={ClientType.ADMINISTRATOR} control={<Radio />} label="ADMIN" />
           <FormControlLabel required {...register("clientType")} value={ClientType.COMPANY} control={<Radio />} label="COMPANY" /> 
        <FormControlLabel required {...register("clientType")} value={ClientType.CUSTOMER} control={<Radio />} label="CUSTOMER" /> 
        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>
    </FormControl>
                {/* <label>Email: </label>
                <input type="email" required {...register("email")} /> */}
                                 <FormControl id="email" defaultValue="Small" size="small">  
                <TextField id="email" label="Email" size="small"  variant="outlined" type="email" {...register("email")} InputProps={{
                endAdornment: <InputAdornment position="end"><MdAttachEmail/></InputAdornment>,
              }}
        //          InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="end">
        //       <BsFillSuitHeartFill />
        //     </InputAdornment>
        //   ),
        // }}
        /> 

         </FormControl>
{/* <FormControl id="password"  size="small">  
          <InputLabel    variant="filled">Email</InputLabel>
                <OutlinedInput
             required {...register ("email")}

             endAdornment={<InputAdornment position="end"><MdAttachEmail/>
              
              </InputAdornment>
            }
          />
           </FormControl> */}

                {/* <label>Password: </label>
                 <input type="password" required {...register("password")} /> */}
            
              
                 <FormControl id="password" defaultValue="Small" size="small">  
          <InputLabel  htmlFor="outlined-adornment-password"  variant="filled">Password</InputLabel>
                <OutlinedInput
            id="outlined-adornment-password"   required {...register ("password")}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <AiFillEye className="eye"/> : <AiFillEyeInvisible className="eye"/>}
                </IconButton>
              </InputAdornment>
            }
          />
           </FormControl>
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


                <button id="button">Login</button>

            </form>
            
        </div>
    );
}

export default Login;

