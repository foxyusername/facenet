import "../css/welcome.css";
import "../css/welcome_responsive.css";
import {useNavigate} from "react-router-dom";

export default function Welcome({mask}){

  const history=useNavigate();

    return <div className="welcome_main_div">
      
  <div className="welcome_body">
   <div className="welcome_about">
   <p className="welcome_mask">{mask}</p>
   </div>
  <div className='welcome_introduction'>
    
     <h2 data-aos="fade-in">𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐅𝐚𝐜𝐞𝐍𝐞𝐭</h2>
  <div className="welcome_body_description" data-aos="fade-in">
     <p>ᴜɴʟᴇᴀꜱʜ ʏᴏᴜʀ ᴄʀᴇᴀᴛɪᴠɪᴛʏ, ᴄᴏɴɴᴇᴄᴛ ᴡɪᴛʜ ꜰʀɪᴇɴᴅꜱ, ᴀɴᴅ ꜱʜᴀʀᴇ ᴛʜᴇ ᴊᴏʏ ᴏꜰ ᴠɪꜱᴜᴀʟ ꜱᴛᴏʀʏᴛᴇʟʟɪɴɢ. ᴇxᴘʀᴇꜱꜱ ʏᴏᴜʀꜱᴇʟꜰ ᴛʜʀᴏᴜɢʜ ᴄᴀᴘᴛɪᴠᴀᴛɪɴɢ ɪᴍᴀɢᴇꜱ ᴀɴᴅ ᴇxᴘᴇʀɪᴇɴᴄᴇ ᴀ ᴡᴏʀʟᴅ ᴏꜰ ᴇɴᴅʟᴇꜱꜱ ᴘᴏꜱꜱɪʙɪʟɪᴛɪᴇꜱ</p>
  </div>
  <div className="welcome_button_div">
    <button className="button1" onClick={()=>{history('/login')}}>Login</button>
    <button onClick={()=>{history('/register')}}>Sign up</button>
  </div>
  </div>
  </div>
    </div>
}