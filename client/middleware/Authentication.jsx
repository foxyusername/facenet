import React, { useState } from "react";
import {Outlet,Navigate} from "react-router-dom";


 function Authentication(){

  if(localStorage.getItem('token')){
  return <Outlet/>
}else{
  return <Navigate to="/login" />
}

}

export default Authentication;