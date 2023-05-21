import { useEffect, useState } from "react";
import "../css/addpost.css";
import axios from "axios";
import { Navigate,useNavigate } from "react-router-dom";
export default function Post(){
const [description,setdescription]=useState();
const [image,setimage]=useState();

const history=useNavigate();

function func_description(e){
 setdescription(e.target.value);
}
function func_image(e){
  setimage(e.target.files[0]);
}

function post_click(){
  let formdata=new FormData();
  formdata.append('file',image);
  formdata.append('upload_preset','lpihnza5');
axios.post('https://api.cloudinary.com/v1_1/dldonwgcr/image/upload',formdata).then((res)=>{

axios.post('http://localhost:3000/createpost',{
  description: description,
  image: res.data.public_id,
  username: localStorage.getItem('user'),
})
}).catch((err)=>console.log(err));
history('/home');
}
return <div className="Post_main_div">
        <div className="info_bag">
    <div className="choose_image">
        <h2>Image</h2>
        <input type="file" onChange={func_image} required/>
      </div> 
      <div className="choose_description">
        <h2>Description</h2>
     <input type="text" onChange={func_description} required/>   
    </div> 
    <div className="submit_post">
    <button type="submit" onClick={post_click}>ᴄʀᴇᴀᴛᴇ</button>
    </div>
    </div>
    </div>
}