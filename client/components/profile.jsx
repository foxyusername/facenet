import { useEffect, useState } from "react";
import "../css/profile.css";
import axios from "axios";
import {Image} from "cloudinary-react";
import "../css/profile_responsive.css";
export default function Profile({checked,url,heart,comment,share,trash}){
 const [editprofile,seteditprofile]=useState(false);
 const [image,setimage]=useState();
 const [profile_image,setprofile_image]=useState('');
 const [checker,setchecker]=useState(false);
 const [show,setshow]=useState(false);
 const [data,setdata]=useState([]);
 const [icon,seticon]=useState(false);
 const [addbio,setaddbio]=useState('');
 const [bio,setbio]=useState([]);
 const [clicked,setclicked]=useState(false);
 const [showbio,setshowbio]=useState(false);
url(profile_image);

 useEffect(()=>{
  get();
},[checker===false])

function editProfile(){
  if(editprofile){
    seteditprofile(false)
    setchecker(false);
    setclicked(false);
    setaddbio('');
  } else{
    seteditprofile(true)
  }
  seticon(false);
}

function get(){
    axios.post('http://localhost:3000/getprofile_photos',{
    username: localStorage.getItem('user')
  }).then((res)=>{
   setprofile_image(res.data[0].profile_image);
  })
}

function chooseFile(e){
  setimage(e.target.files[0]);
}
function upload(){
  let formdata=new FormData()
  formdata.append('file',image);
  formdata.append('upload_preset','lpihnza5');
   axios.post('https://api.cloudinary.com/v1_1/dldonwgcr/image/upload',formdata).then((res)=>{
   axios.post('http://localhost:3000/insertprofile',{
  username: localStorage.getItem('user'),
  image: res.data.public_id
})
  
localStorage.setItem('profile_img',res.data.public_id);

   }).catch((err)=>console.log(err))
}
useEffect(()=>{
  upload();
},[checker===true])

function change(){
  if(!checker && image){
    setchecker(true)
  }
  if(image){
    seticon(true);
  }
   
}
function showcomments(){
  if(show){
    setshow(false)
  }else{
    setshow(true)
  }
}

useEffect(()=>{
   axiosposts();
},[checker===false])

useEffect(() => {
  getbio();
}, []);

async function getbio() {
  try {
   await axios.get('http://localhost:3000/getmybio?username=' + localStorage.getItem('user')).then((res)=>{setbio(res.data)});
   console.log(bio); 
  } catch (err) {
    console.log(err);
  }
}


function axiosposts(){
  axios.post('http://localhost:3000/getprofileposts',{
    username: localStorage.getItem('user')
  }).then((res)=>setdata(res.data)).catch((err)=>console.log(err))
}

function newbio(e){
  setaddbio(e.target.value);
}

async function submitaddbio(){
  if(addbio.length>0){

await  axios.post('http://localhost:3000/updatebio',
  {bio:addbio,username: localStorage.getItem('user')}).then(res=>console.log(res)).catch((err)=>console.log(err))

  axios.get('http://localhost:3000/getbio?username='+localStorage.getItem('user')+'').then((res)=>setbio(res.data)).catch((err)=>console.log(err))
 setaddbio('');  
console.log(bio)

if(clicked){
  setclicked(false)
}else{
  setclicked(true)
}

}
}

async function deletedbio(){
  await axios.post('http://localhost:3000/delete',{username: localStorage.getItem('user'),bio:''}).catch((err)=>console.log(err))
  axios.get('http://localhost:3000/getdeletedbio?username='+localStorage.getItem('user')+'').then((res)=>{setbio(res.data)}).catch((err)=>console.log(err))
  console.log('clicked');
  console.log(bio);
}

  return <div className="profile_main_div">
    <div className="show_bio_div">
    <div className="show_bio"><p className="show_bio_p" onClick={()=>{showbio ? setshowbio(false) : setshowbio(true)}}>Bio</p></div>
    <div></div>
   </div>
   <div className="profile_image">
  {editprofile ? <div className="choose_file_div" data-aos="fade-in" data-aos-duration="250"> 
    <input type="file" id="edit_profile_input" onChange={chooseFile} />
    <p onClick={change}>{icon && image ? checked: '+'}</p>
    </div> :null}
   {profile_image !==null ? <Image cloudName="dldonwgcr" publicId={profile_image} style={editprofile ? {filter:'blur(2px)'}:null} /> : <img src="https://avatars.githubusercontent.com/u/112616706?v=4" />}
    <p>{localStorage.getItem('user')}</p>
    </div>

  <div className="edit_profile"><button onClick={editProfile}>{editprofile ?"DONE": 'Edit Profile'}</button></div>
 {editprofile ? <div  className="change_name" data-aos="fade-left">
      <input type="text" placeholder="Add Bio" onChange={newbio} value={addbio}/> 
     <button onClick={submitaddbio}>{'+'} </button>
   </div> :null}
 {bio.map((result,index)=>{
return <div className="profile_bio" key={index}>
    {editprofile && result.bio && result.bio.length>0 ? <button onClick={deletedbio}>{trash}</button>:null}
  {result.bio && result.bio.length>0 ? <p>{result.bio}</p>:null}
   </div>
 })};

{data.map((result,index)=>{
return (
<div className="profile_posts" data-aos="fade-in" data-aos-once='true' key={index}>
<div className="description_profile"><p>{result.description}</p></div>
<div className="image_div"> <Image cloudName='dldonwgcr' publicId={result.image} /></div>
 <div className="like_comment_share2">
<div className="display"> <p>{heart}</p>
 <p className="likecount">{result.likecount}</p>
 </div>
 <p onClick={showcomments} className="single">{comment}</p>
 <p>{share}</p>
</div>
</div>
)})}
  </div>
}