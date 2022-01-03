import Image from "next/image";
import { Avatar } from 'antd'

function Message ({type, content, avatar}) {

    return (
        <li className={type}>
            { type === "other" && avatar && (<div className="avatar">
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
            </div>)}
            <div className="msg">
                <p>{content}</p>
                {/* <time>20:18</time> */}
            </div>
            
        </li>
    )

}

export default Message;