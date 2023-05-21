import { useEffect, useState } from "react";
import "../css/registration.css";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {Navigate, useNavigate} from "react-router-dom";

export default function Register({email_icon,password_icon,mask,user,error,token}){
const [errormessage,seterrormessage]=useState('');
const [myusername,setmyusername]=useState('');
const navigate=useNavigate();

let schema=yup.object().shape({
    username: yup.string().required().max(40),
    age: yup.number().required().min(18),
    email: yup.string().email().required(),
    password: yup.string().required().min(5).max(16),
    confirm_password: yup.string().oneOf([yup.ref('password'),null]).required() 

})


const {register,handleSubmit,formState: {errors} }=useForm({
    resolver:yupResolver(schema),
});
 function submitform(data){
  axios.post('http://localhost:3000/register',data).then((res)=>{
    console.log(res);
    if(res.data==='error'){ 
        seterrormessage('username has already been used');
      }else{
        console.log('else has been active')
        navigate('/home');
      localStorage.setItem('token',res.data);
      localStorage.setItem('user',data.username);
    }
    }).catch(err=>console.log(err))
 console.log('jkrgfbiherfberhifberhierjin');
  }
useEffect(()=>{
  if(localStorage.getItem('token')){
    navigate('/home');
  }
},[])
return <div className="register_main_div">
    <h1 className="mask">{mask}</h1>
{errormessage.length>0 ? <h3 className="error_h3">{error}   {errormessage}</h3>:null}
  <div className="register_box">  
  <form onSubmit={handleSubmit(submitform)}>
    <div className="register_box_username">
       <input type="text" placeholder="username..." {...register('username') }/>
    {errors?.username?.message ? <p>{errors?.username?.message}</p>
:null}</div>
    
  <div className="register_box_age">
     <input type="number" placeholder="age..."{...register('age')} />
     {errors?.age?.message ?<p>{errors?.age?.message}</p>
:null}
     </div>
    <div className="register_box_email">
        <input type="text" placeholder="email..." {...register('email')}/>
        {errors?.email?.message ? <p>{errors?.email?.message}</p>
:null}
    </div>
<div className="register_box_password">
    <input type="password" placeholder="password..."{...register('password')} />

    {errors?.password?.message ? <p>{errors?.password?.message}</p>
:null}
</div>
<div className="register_box_confirmpassword">
    <input type="password" placeholder="confirm password..." {...register('confirm_password')} />
    {errors?.confirm_password?.message ? <p>{errors?.confirm_password?.message}</p>
:null}
</div>

<button type="submit" onClick={()=>seterrormessage('')}>submit</button>

</form>

  </div>
  </div>
}