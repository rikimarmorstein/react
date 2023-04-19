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
import { Avatar, Button, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, colors, makeStyles } from "@mui/material";
import {MdAttachEmail} from "react-icons/md";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {FaUserAlt} from "react-icons/fa";



import React, { useState } from "react";
import "./Login.css";


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

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  
  function isValidateEmail(email : string) : boolean{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}
    return (
        <div className="Login">

			{/* <form onSubmit={handleSubmit(send)}> */}
      <form onSubmit={handleSubmit(send)} >
 
                {/* <label>Client Type: </label>
                <select defaultValue="" required {...register("clientType")}>
                    <option disabled value="">Select Client Type...</option>
                    <option value={ClientType.ADMINISTRATOR}>Admin</option>
                    <option value={ClientType.COMPANY}>Company</option>
                    <option value={ClientType.CUSTOMER}>Customer</option>
                    
                </select> */} 

 <label>Client Type: </label>  <FaUserAlt className="userIcon"/>            <br />
 <table >
                {/* <select defaultValue="" required {...register("clientType")}>
                    <option disabled value="">Client Type</option>
                    <option value={ClientType.ADMINISTRATOR}>Admin</option>
                    <option value={ClientType.COMPANY}>Company</option>
                </select>  */}
                {/* <RadioGroup row> */}
                
                <tr>
        <td >        <input  type="radio" id="ADMINISTRATOR" name="ADMINISTRATOR" value={ClientType.ADMINISTRATOR} aria-label="ADMIN" required {...register("clientType")}/><span>Admin</span>              </td>

        <td >       <input type="radio" id="Company" name="Company" value={ClientType.COMPANY} aria-label="Company" required {...register("clientType")}/><span>Company</span>              </td>


        <td >     <input type="radio" id="Customer" name="Customer" value={ClientType.CUSTOMER} aria-label="Customer" required {...register("clientType")}/><span>Customer</span>              </td></tr></table >

              <br />
              <br />
{/* </RadioGroup> */}

{/* <FormControl component="fieldset">
      <FormLabel component="legend">Client Type:</FormLabel>
      <RadioGroup   value={value} onChange={handleChangeUser} defaultValue="" >
        <FormControlLabel required {...register("clientType")}  value={ClientType.ADMINISTRATOR} control={<Radio />} label="ADMIN" />
           <FormControlLabel required {...register("clientType")} value={ClientType.COMPANY} control={<Radio />} label="COMPANY" /> 
        <FormControlLabel required {...register("clientType")} value={ClientType.CUSTOMER} control={<Radio />} label="CUSTOMER" /> 
      </RadioGroup>
    </FormControl> */}
                {/* <label>Email: </label>
                <input type="email" required {...register("email")} /> */}
                                  {/* <FormControl id="email" defaultValue="Small" size="small">  
                <TextField id="email" label="Email" size="small"  variant="outlined" type="email" {...register("email")} InputProps={{
                endAdornment: <InputAdornment position="end"><MdAttachEmail/></InputAdornment>,
              }}
       
              
        /> 

         </FormControl> */}
        





                 {/* <FormControl id="password" defaultValue="Small" size="small">  
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
           </FormControl> */}
                
                <TextField id="email" label="email" variant="outlined" required {...register ("email",
                    {
                      required: { value: true, message: "Missing email" },
                      validate: (value) => isValidateEmail(value)|| "Invalid email address",
                      minLength:{value:2, message:"Email too short"}   
                  }
                )}
              InputProps={{
                endAdornment: <InputAdornment position="end"><MdAttachEmail className="emailIcon"/></InputAdornment>,
              }}
       />
                <br />
                <br />
                <FormControl id="password" variant="outlined">  
          <InputLabel htmlFor="outlined-adornment-password" variant="outlined" >Password</InputLabel>
                <OutlinedInput
            id="outlined-adornment-password"
            required {...register ("password")} 
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
                  {values.showPassword ? <BsEye className="eye"/> : <BsEyeSlash className="eye"/>}
                </IconButton>
              </InputAdornment>
            }
          />
           </FormControl>
                <br />
                
                {/* <FormControl variant="outlined" style={{'width': '100%'}} >
        <InputLabel id="demo-simple-select-outlined-label">Client Type:</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Client Type"
          required {...register ("clientType")}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={ClientType.CUSTOMER}>Customer</MenuItem>
          <MenuItem value={ClientType.COMPANY}>Company</MenuItem>
        </Select>
      </FormControl>
      <br /> */}
                <br />
                <Button variant="outlined" color="primary" type="submit">
                    Login
                </Button>
            </form>
                {/* <button id="button">Login</button> */}

            {/* </form> */}
            
        </div>
    );
}

export default Login;

