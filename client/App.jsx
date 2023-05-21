
import Login from "/components/login";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faLock,faMasksTheater,faUser,faXmark,faCaretDown,faHeart,faComment,faShare,faCheck,faPaperPlane,faTrash,faFaceSadTear} from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router,Routes,Route, Navigate } from "react-router-dom";
import Register from "/components/registration";
import Home from "./components/home";
import Post from "./components/Addpost";
import Profile from "/components/profile";
import Authentication  from "./middleware/Authentication";
import { useState } from "react";
import Home_post from "./components/Home_post";
import Error from "./components/Error";
import Welcome from "./components/welcomepage";
import About from "./components/about";
function App() {
const [url,seturl]=useState('');
return <div>
  <Router>
    <Routes>
    <Route path="/" element={<Welcome mask={<FontAwesomeIcon icon={faMasksTheater} />} />} />
    <Route path="*" element={<Error emoji={<FontAwesomeIcon icon={faFaceSadTear}  />}/>} />
    <Route path="about" element={<About />} />
   <Route path="/login" element={  <Login email_icon={<FontAwesomeIcon icon={faEnvelope} />} password_icon={<FontAwesomeIcon icon={faLock} />} user={<FontAwesomeIcon icon={faUser} />} /> } />
   <Route path="/register" element={  <Register  email_icon={<FontAwesomeIcon icon={faEnvelope} />} password_icon={<FontAwesomeIcon icon={faLock} />} mask={<FontAwesomeIcon icon={faMasksTheater} />} user={<FontAwesomeIcon icon={faUser} />} error={<FontAwesomeIcon icon={faXmark} />}/>}/>
      <Route element={<Authentication />}>
      <Route path="/home" element={<Home arrow={<FontAwesomeIcon icon={faCaretDown} />} heart={<FontAwesomeIcon icon={faHeart} />} comment={<FontAwesomeIcon icon={faComment} />} share={<FontAwesomeIcon icon={faShare} imageurl={url} />}/>} />
     <Route path="/createpost" element={<Post />} />
     <Route path="/profile" element={<Profile trash={<FontAwesomeIcon icon={faTrash} />} checked={<FontAwesomeIcon icon={faCheck} />} url={seturl}  heart={<FontAwesomeIcon icon={faHeart} />} comment={<FontAwesomeIcon icon={faComment}/>} share={<FontAwesomeIcon icon={faShare} />} />}/>
      <Route path='/post_comments/:id' element={<Home_post checked={<FontAwesomeIcon icon={faCheck} />} url={seturl}  heart={<FontAwesomeIcon icon={faHeart} />} comment={<FontAwesomeIcon icon={faComment}/>} share={<FontAwesomeIcon icon={faShare} />} send={<FontAwesomeIcon icon={faPaperPlane} />} trash={<FontAwesomeIcon icon={faTrash} />}/>}/>

  </Route>
    </Routes>
  </Router>
  </div>
}
export default App;
