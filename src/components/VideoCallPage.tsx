import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';  // استفاده از روش صحیح برای وارد کردن socket.io-client

const VideoCallPage: React.FC = () => {
  const [isVolumeOff, setIsVolumeOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);  // برای پیام‌ها

  // اتصال به socket.io
  useEffect(() => {
    const socket = io('https://your-server-url');  // به آدرس سرور خود متصل شوید
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // گوش دادن به پیام‌ها از سرور
    socket.on('message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);  // به‌روزرسانی پیام‌ها
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const toggleVolume = () => {
    setIsVolumeOff(!isVolumeOff);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      <h1>Video Call Page</h1>
      {/* نمایش ویدیو */}
      <div className="video-container">
        <video id="videoElement" autoPlay muted></video>
      </div>

      {/* کنترل صدا */}
      <button onClick={toggleVolume}>
        {isVolumeOff ? 'Unmute' : 'Mute'}
      </button>

      {/* نمایش چت */}
      <button onClick={toggleChat}>
        {showChat ? 'Hide Chat' : 'Show Chat'}
      </button>

      {showChat && (
        <div className="chat-container">
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>  // نمایش پیام‌ها
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;








// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash, FaPhone, FaVolumeUp, FaVolumeMute, FaComments, FaPaperclip, FaPaperPlane, FaSmile } from 'react-icons/fa';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import styles from './VideoCallPage.module.css';

// // کامپوننت آواتار
// const AvatarModel: React.FC<{ url: string }> = ({ url }) => {
//   const { scene } = useGLTF(url);
//   return (
//     <primitive
//       object={scene}
//       scale={10}
//       position={[0, -5, 0]} /* مرکزیت بهتر */
//     />
//   );
// };

// const VideoCallPage: React.FC = () => {
//   const location = useLocation();
//   const { avatar } = location.state as { avatar: string };

//   const avatarUrlMale = "https://models.readyplayer.me/67312f082e4d5adddc2f2ac3.glb";
//   const avatarUrlFemale = "https://models.readyplayer.me/673479901fe0339526a0bccd.glb";

//   const userAvatar = avatar === avatarUrlMale ? avatarUrlFemale : avatarUrlMale;
//   const peerAvatar = avatar === avatarUrlMale ? avatarUrlMale : avatarUrlFemale;

//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isVolumeOff, setIsVolumeOff] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [messages, setMessages] = useState<string[]>([]);

//   const handleMute = () => setIsMuted(!isMuted);
//   const handleVideo = () => setIsVideoOff(!isVideoOff);
//   const handleVolume = () => setIsVolumeOff(!isVolumeOff);
//   const handleEndCall = () => setCallEnded(!callEnded);
//   const toggleChat = () => setShowChat(!showChat);
//   const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

//   const handleCloseChat = () => setShowChat(false);
//   const handleSendMessage = () => {
//     const messageInput = (document.getElementById("chatInput") as HTMLTextAreaElement).value;
//     setMessages([...messages, messageInput]);
//     (document.getElementById("chatInput") as HTMLTextAreaElement).value = '';
//   };

//   const handleEmojiClick = (emoji: string) => {
//     const messageInput = (document.getElementById("chatInput") as HTMLTextAreaElement);
//     messageInput.value += emoji;
//     setShowEmojiPicker(false);
//   };

//   return (
//     <div className={styles.videoCallContainer}>
//       {/* آواتار بزرگ */}
//       <div className={styles.videoAvatarContainer}>
//         <Canvas className={styles.canvas}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} />
//           <OrbitControls
//             enablePan={false}
//             enableZoom={false}
//             minPolarAngle={Math.PI / 2.3}
//             maxPolarAngle={Math.PI / 2.3}
//           />
//           <AvatarModel url={peerAvatar} />
//         </Canvas>
//       </div>

//       {/* آواتار کوچک */}
//       <div className={styles.userAvatar}>
//         <Canvas className={styles.canvasSmall}>
//           <ambientLight intensity={0.5} />
//           <directionalLight position={[10, 10, 5]} />
//           <OrbitControls
//             enablePan={false}
//             enableZoom={false}
//             minPolarAngle={Math.PI / 2.3}
//             maxPolarAngle={Math.PI / 2.3}
//           />
//           <AvatarModel url={userAvatar} />
//         </Canvas>
//       </div>

//       {/* کنترل‌ها */}
//       <div className={styles.controls}>
//         <button onClick={handleVolume} className={styles.controlButton}>
//           {isVolumeOff ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
//         </button>
//         <button onClick={handleVideo} className={styles.controlButton}>
//           {isVideoOff ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
//         </button>
//         <button onClick={handleEndCall} className={`${styles.controlButton} ${callEnded ? '' : styles.endCall}`}>
//           {callEnded ? <FaPhone size={24} style={{color: 'green'}} /> : <FaPhoneSlash size={24} />}
//         </button>
//         <button onClick={handleMute} className={styles.controlButton} style={{ backgroundColor: isMuted ? 'red' : '' }}>
//           {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
//         </button>
//         <button onClick={toggleChat} className={styles.controlButton}>
//           <FaComments size={24} />
//         </button>
//       </div>

//       {/* پاپ آپ چت */}
//       {showChat && (
//         <div className={styles.chatPopup}>
//           <div className={styles.chatHeader}>
//             <span>Chat</span>
//             <button onClick={handleCloseChat}>X</button>
//           </div>
//           <div className={styles.chatBody}>
//             {messages.map((message, index) => (
//               <div key={index} className={styles.chatMessage}>
//                 {message}
//               </div>
//             ))}
//           </div>
//           <div className={styles.chatInputContainer}>
//             <textarea id="chatInput" className={styles.chatInput}></textarea>
//             <div className={styles.chatButtonsContainer}>
//               <button className={styles.chatEmojiButton} onClick={toggleEmojiPicker}>
//                 <FaSmile />
//               </button>
//               <label htmlFor="fileInput" className={styles.chatAttachButton}>
//                 <FaPaperclip />
//               </label>
//               <input id="fileInput" type="file" style={{ display: 'none' }} />
//               <button className={styles.chatSendButton} onClick={handleSendMessage}>
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </div>
//           {showEmojiPicker && (
//             <div className={styles.emojiPopup}>
//               {['😊', '😂', '😍', '😢', '😎', '😡', '👍', '👎', '🙏', '💪', '❤️', '🔥', '🎉', '🌟', '🎁', '👋', '👏', '💔'].map((emoji) => (
//                 <span key={emoji} onClick={() => handleEmojiClick(emoji)} style={{ cursor: 'pointer', padding: '5px' }}>
//                   {emoji}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCallPage;


