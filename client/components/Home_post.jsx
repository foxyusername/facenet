import React, { useEffect, useState } from "react";
import "../css/home_posts.css";
import {useParams} from "react-router-dom";
import axios from 'axios';
import {Image} from 'cloudinary-react';
import "../css/home_posts_responsive.css";

 export default function Home_post({heart,share,comment,send,trash}){
const [post_data,setpost_data]=useState([]);
const [newcomment,setnewcomment]=useState('');
const [comment_data,setcomment_data]=useState([]);
const [rerender,setrerender]=useState();
 const {id}=useParams();

 useEffect(()=>{
  axios.get('http://localhost:3000/getpost?userId='+id+'').then((res)=>{setpost_data(res.data)}).catch((err)=>console.log(err));
  console.log(post_data);

},[]);

useEffect(()=>{
   axios.get('http://localhost:3000/getcomments?userid='+id+'').then((res)=>setcomment_data(res.data)).catch((err)=>console.log(err));
  console.log(comment_data);
},[])
function inputValue(e){
   setnewcomment(e.target.value);
 }

async function commented(){
   if(newcomment.length>0){

await axios.post('http://localhost:3000/insertcomment',{
   comment: newcomment,
   postId: id,
   username: localStorage.getItem('user'),
   public_id: localStorage.getItem('profile_img')
}).then((response)=>{
  //const addcomment={comment: newcomment,post_id: id,user: localStorage.getItem('user'), profile_image: localStorage.getItem('profile_img')}
//setcomment_data([addcomment,...comment_data]);
setnewcomment('');
console.log(response); 
});

axios.get('http://localhost:3000/getaddedcomments?userid='+id+'').then((res)=>setcomment_data(res.data)).catch((err)=>console.log(err))

}
}

function getcommentid(commentid){
   console.log(commentid);
 axios.post('http://localhost:3000/deletecomment',{commentId: commentid, postId: id,username: localStorage.getItem('user')}).then((res)=>setcomment_data(res.data)).catch((err)=>console.log(err));

}

    return <div className="singlepost_main_div">
      <div className="left_side">
   {post_data.map((result,index)=>{

   return  <div className="single_post" key={index}>
        <div className="single_post_desc"><p>{result.description}</p></div>
        <div className="single_post_image"><Image cloudName="dldonwgcr" publicId={result.image} /></div>
      <div className="single_post_emotions">
      <div className="make_it_flex">   
         <p>{heart}</p>
        <p>{result.likecount}</p>
       </div>
       <p>{comment}</p>  
       <p>{share}</p>    
      </div>
      </div> 
})}
</div>
<div className="right_side">
  <div className="single_post_addcomment">
   <input type="text" placeholder="addcomment..." value={newcomment} onChange={inputValue}/>
   <button onClick={commented}>{send}</button>
  </div>
  
  <div className="single_post_allcomments">
   {comment_data.map((result,index)=>{

return <div key={index}><div className="single_post_comment" >
{result.profile_image!=="null" ? <Image cloudName="dldonwgcr" publicId={result.profile_image}/>: <img src="https://avatars.githubusercontent.com/u/112616706?v=4" />}
<div className="information"> 
    <p className="user_name">{result.user}</p>
    <p className="comment_p">{result.comment}</p>
   </div>
   </div>
   <p className="delete" onClick={()=>getcommentid(result.id)}>{trash}</p> 
   </div>

  })}
  </div>
</div>

    </div>  
 }