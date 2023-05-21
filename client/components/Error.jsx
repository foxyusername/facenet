import "../css/error.css";

export default function Error({emoji}){
    return <div className="error_main_div">
        <div className="error_header">
        <h1>404</h1>    
        </div>
    <div className="error_body">
   <p>Sorry,couldn't find the page {emoji}</p>
    </div>
    </div>
}