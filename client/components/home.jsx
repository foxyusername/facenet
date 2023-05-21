import { useEffect, useState } from "react";
import "../css/home.css";
import {Navigate, useNavigate} from "react-router-dom";
import "../css/home_responsive.css";
import axios from "axios";
import {Image} from 'cloudinary-react';
export default function Home({arrow,share,comment,heart}){
  const [profile_information,setprofile_information]=useState(false);
  const [show_comment,setshow_coment]=useState(false);
const [imageurl,setimageurl]=useState('');
const [data,setdata]=useState([]);
const [result_id,setresult_id]=useState();
const [comment_value,setcommentvalue]=useState('');
const [comment_data,setcomment_data]=useState([]);




useEffect(()=>{
 axios.get('http://localhost:3000/getposts').then((res)=>{setdata(res.data)}).catch((err)=>console.log(err));
},[])

  let history=useNavigate();
  function log_out(){
    localStorage.removeItem('token');
    localStorage.removeItem('profile_img');
    localStorage.removeItem('user');
   history('/login');
  }
  
useEffect(() => {
  fetchData();
}, []);


const fetchData = async () => {
    const response = await axios.post('http://localhost:3000/getprofile_photos', {
      username: localStorage.getItem('user')
    });
    setimageurl(response.data[0].profile_image);
    localStorage.setItem('profile_img',response.data[0].profile_image);
};

function setcomment(e){
setcommentvalue(e.target.value);
}
function likedpost(postId){
  axios.post('http://localhost:3000/userliked', {
    username: localStorage.getItem('user'),
    post_id: postId
  }).then((res)=>{setdata(res.data)}).catch((err)=>console.log(err))
  console.log(data);
}


  return <div className="home_main_div" >
    <nav>
     <div className="home_profile">
        <div className="profile_image_p">
     <p style={{rotate:profile_information ? "180deg":null}} onClick={()=>{profile_information ? setprofile_information(false): setprofile_information(true)}}>{arrow}</p>
      {imageurl!==null ?  <Image cloudName="dldonwgcr" publicId={imageurl} onClick={()=>history('/profile')}/>: <img onClick={()=>history('/profile')} src="https://avatars.githubusercontent.com/u/112616706?v=4" />}
     </div>
     </div>
    {profile_information ? <div className="profile_information" data-aos="fade-in" data-aos-duration="300">
     <p>Settings & Privacy</p>
     <p>Help & Support</p>
     <p>Display & bright</p>
     <p>Give Feedback</p>
     <p id="log_out" onClick={log_out}>Log out</p>
     </div>:null}
    </nav>
  <div className="home_body">
    <div className="addpost"><h2 onClick={()=>{history('/createpost')}}>𝐜𝐫𝐞𝐚𝐭𝐞 𝐩𝐨𝐬𝐭</h2></div>


{data.map((result,index)=>{
  //maping the data

function submitcomment(){

    setshow_coment(true);
    if(comment_value.length>0){
      axios.post('http://localhost:3000/addcomment',{
      post_id: result.id,
      username: localStorage.getItem('user'),
      comment: comment_value
    }).then((res)=>{
      setcomment_data(res.data)
    })
    }

 setcommentvalue('');   
    
}

function getcomment(){
 
 if(show_comment){
  setshow_coment(false)
}else{
  setshow_coment(true);
  axios.post('http://localhost:3000/getcomment',{post_id: result.id}).then((res)=>{
  setcomment_data(res.data);
})
 }
 localStorage.setItem('postId',result.id);
history('/post_comments/'+localStorage.getItem('postId')+'');
}


return (<div className="home_body_post" key={result.id} data-aos="fade-in" data-aos-once="true">
<div className="description"><p>{result.description}</p></div>
<Image cloudName="dldonwgcr" publicId={result.image}/>
<div className="like_comment_share">
<div className="like_count_div">
 
   <p style={{color:'black'}} onClick={()=>likedpost(result.id)}>{heart}</p>  
<p className="like_count">{result.likecount}</p>
</div>
<p className="commenting" onClick={getcomment}>{comment}</p>  
<p>{share}</p> 
</div>
{show_comment &&
 <div className="addcomment_div"><input type="text" value={comment_value} className="comment_input" placeholder="add comment" onChange={setcomment}/>
<button onClick={submitcomment}>+</button>
</div>
}
{comment_data.map((result1,index)=>{
 if(show_comment){

 return  <div className="all_comments">
<div className="single_comment">
<img />
<p>{result1.comment}</p>
</div>
</div>
 }
})}

</div>

)
})}
</div>

</div>

}



