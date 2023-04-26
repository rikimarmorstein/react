import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import CredentialsModel from "../../../Models/CredentialsModel";
import { logoutAction as logoutCompany } from "../../../Redux/CompanyState";
import { logoutAction as logoutCoupon } from "../../../Redux/CouponState";
import { logoutAction as logoutCustomer } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { MdAttachEmail } from "react-icons/md";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import React, { useState } from "react";
import "./Login.css";


function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();

  const navigate = useNavigate();

  function send(credentials: CredentialsModel) {
    authService.login(credentials).then(() => {
      notificationService.success("Welcome!");
      runLogoutTimer();
      if (credentials.clientType === "ADMIN") {
        navigate("/admin-home");
      }
      if (credentials.clientType === "COMPANY") {
        navigate("/company-home");

      } if (credentials.clientType === "CUSTOMER") {
        navigate("/customer-home");
      }
    })
      .catch((err) =>
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

    }, 1_800_000) // 30:00 minutes - 1800000

  }

  const [value, setValue] = React.useState('');

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };


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


  function isValidateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }


  return (
    <div className="Login">

      <form onSubmit={handleSubmit(send)} >

        <label>Client Type: </label>  <FaUserAlt className="userIcon" /><br />
        <table ><tbody><tr>
          <td ><input type="radio" id="ADMINISTRATOR" name="ADMINISTRATOR" value={ClientType.ADMINISTRATOR} aria-label="ADMIN" required {...register("clientType")} /><span>Admin</span>              </td>
          <td ><input type="radio" id="Company" name="Company" value={ClientType.COMPANY} aria-label="Company" required {...register("clientType")} /><span>Company</span>              </td>
          <td ><input type="radio" id="Customer" name="Customer" value={ClientType.CUSTOMER} aria-label="Customer" required {...register("clientType")} /><span>Customer</span></td></tr></tbody></table ><br /><br />
        <TextField id="email" label="email" variant="outlined" required {...register("email",
          {
            required: { value: true, message: "Missing email" },
            validate: (value) => isValidateEmail(value) || "Invalid email address",
            minLength: { value: 2, message: "Email too short" }
          }
        )}
          InputProps={{
            endAdornment: <InputAdornment position="end"><MdAttachEmail className="emailIcon" /></InputAdornment>,
          }}
        /> <span>Must include @ and .</span><br /><br />

        <FormControl id="password" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" variant="outlined" >Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            required {...register("password")}
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
                  {values.showPassword ? <BsEye className="eye" /> : <BsEyeSlash className="eye" />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl><br />

        <Button id="button" variant="outlined" color="primary" type="submit">Login</Button>
      </form>

    </div>
  );
}

export default Login;

