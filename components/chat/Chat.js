
import Message from './Message';
import Image from "next/image";
//import votrelogo1 from './votrelogo1.png';
import votrelogo2 from './votrelogo2.png';
import { Input, Upload, Button }  from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import UploadIcon from '../icons/Upload';


function Chat() {
  
  return (<div className="wrapper">
    <div className="menuTop"></div>
    <div className="ChatBox">
      
      <div className="menu">
            <div className="logo">
                <Image alt="logo" src={votrelogo2} draggable="false"/>
            </div>
            <div className="name">Agency/Company name</div>
            <div className="last"></div>
        </div>
    <ol className="chat">
        <Message avatar={votrelogo2} type="other" content="Bonjour, comment t'appels-tu ?" />
        <Message type="self" content="Bonjour je m'appel Jérôme" />
        <div className="input">
          <Upload className="upload"><Button className="uploadBtn" icon={<UploadIcon />}></Button></Upload>
          <input className="textarea" type="text" placeholder="Write a message..."/>
          <button className="submitBtn"></button>
        </div>
    </ol>
    
    </div>
    <div className="menuBottom"></div>
    </div>
  );
}

export default Chat;
