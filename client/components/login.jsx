import { useEffect, useState } from "react";
import "../css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import * as yup from "yup";

export default function Login({email_icon,password_icon,user}){
 const [login_username,setlogin_username]=useState('');
 const [login_password,setlogin_password]=useState('');
 const [errorMsg,seterrMsg]=useState('');

const history=useNavigate();
function handlesubmit(){
  axios.post('http://localhost:3000/login',{
    login_username:localStorage.getItem('user'),
    login_password:login_password
  }).then((res)=>{
    if(res.data.auth){
  localStorage.setItem('token',"bearer "+ res.data.token);   //setting localstorage to true if user inputs correct info
  history('/home');
seterrMsg('');
  }else if(!res.data.auth && localStorage.getItem('user').length>0 && login_password.length>0){
    seterrMsg('no accounts found');
  }
  console.log(res);

}).catch((err)=>console.log(err));
console.log(errorMsg)

}
function submitform(e){
e.preventDefault();
}
useEffect(()=>{
  if(localStorage.getItem('token')){
  history('/home');
  }
},[])


return <div className="login_main_div">
   <h1 className="facenet_header">FaceNet</h1>
    
<div className="login_div">
 <form onSubmit={submitform}>
    <div className="login_div_box">
   <p className="login_err">{errorMsg}</p>
  <div className="login_email"><label>{user}</label>  <input  placeholder="username..." id="email" type="text" onChange={(e)=>{localStorage.setItem('user',e.target.value)}} required /></div>
  <div className="login_password"><label>{password_icon}</label>  <input placeholder="password..." id="password" type="password" maxLength={16} required onChange={(e)=>{setlogin_password(e.target.value)}} /></div>
  <button type="submit" onClick={handlesubmit}>submit</button>
  <a href="/register" className="signup_message">create new account</a>
</div>
</form>
</div>
    </div>
}