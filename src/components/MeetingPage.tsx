// import React, { useState, useEffect, useRef } from 'react';
// import BottomBar from './BottomBar'; // ایمپورت کامپوننت BottomBar
// import io from 'socket.io-client';

// // نوع داده برای پیام
// interface Message {
//   sender: string;
//   text: string;
//   type?: 'text' | 'file';
//   fileName?: string;
// }

// // نوع داده برای کاربر
// interface User {
//   id: string;
//   stream: MediaStream;
// }

// const MeetingPage: React.FC = () => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isVolumeOff, setIsVolumeOff] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [users, setUsers] = useState<User[]>([]);
//   const socket = useRef<any>(null); // رفرنس برای اتصال به سرور Socket.io

//   // تنظیم وضعیت میوت ویدیو، صدا، حجم صدا
//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//     if (localStream) {
//       localStream.getAudioTracks().forEach((track) => (track.enabled = !isMuted));
//     }
//   };

//   const handleVideo = () => {
//     setIsVideoOff(!isVideoOff);
//     if (localStream) {
//       localStream.getVideoTracks().forEach((track) => (track.enabled = !isVideoOff));
//     }
//   };

//   const handleVolume = () => setIsVolumeOff(!isVolumeOff);

//   // پایان تماس
//   const handleEndCall = () => {
//     socket.current.emit('leave-room');
//     socket.current.disconnect();
//     console.log('Call ended');
//     setLocalStream(null);
//     setUsers([]);
//   };

//   // نمایش یا مخفی کردن چت
//   const toggleChat = () => setShowChat(!showChat);
//   const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);

//   // ارسال پیام
//   const addMessage = (message: Message) => {
//     setMessages([...messages, message]);
//     socket.current.emit('send-message', message); // ارسال پیام به سرور
//   };

//   // اتصال به سرور و مدیریت استریم
//   useEffect(() => {
//     const initLocalStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setLocalStream(stream);
//         socket.current = io('http://localhost:3000'); // اتصال به سرور Socket.io

//         socket.current.emit('join-room', { userId: socket.current.id });

//         socket.current.on('user-connected', (userId: string) => {
//           console.log(`${userId} connected`);
//         });

//         socket.current.on('receive-message', (message: Message) => {
//           setMessages((prevMessages) => [...prevMessages, message]); // دریافت پیام از دیگر کاربران
//         });

//         socket.current.on('user-disconnected', (userId: string) => {
//           setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
//           console.log(`${userId} disconnected`);
//         });
//       } catch (error) {
//         console.error('Error accessing media devices:', error);
//       }
//     };

//     initLocalStream();

//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <div>
//         {/* نمایش ویدیو استریم محلی */}
//         {localStream && (
//           <video
//             ref={(video) => {
//               if (video && localStream) {
//                 video.srcObject = localStream;
//                 video.play();
//               }
//             }}
//             style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
//             muted
//             autoPlay
//           />
//         )}
//       </div>

//       {/* نمایش ویدیو دیگر کاربران */}
//       <div>
//         {users.map((user) => (
//           <div key={user.id}>
//             <video
//               ref={(video) => {
//                 if (video && user.stream) {
//                   video.srcObject = user.stream;
//                   video.play();
//                 }
//               }}
//               style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
//               autoPlay
//             />
//           </div>
//         ))}
//       </div>

//       {/* نمایش دیگر اجزای صفحه */}
//       <BottomBar
//         isMuted={isMuted}
//         toggleMute={toggleMute}
//         isVideoOff={isVideoOff}
//         handleVideo={handleVideo}
//         isVolumeOff={isVolumeOff}
//         handleVolume={handleVolume}
//         handleEndCall={handleEndCall}
//         toggleChat={toggleChat}
//         showChat={showChat}
//         addMessage={addMessage}
//         toggleEmojiPicker={toggleEmojiPicker}
//         showEmojiPicker={showEmojiPicker}
//         handleEmojiClick={(emoji: string) => {
//           const message = { sender: 'You', text: emoji };
//           addMessage(message);
//         }}
//         localStream={localStream}
//         messages={messages}
//       />
//     </div>
//   );
// };

// export default MeetingPage;




















import React, { useState, useEffect } from 'react';
import BottomBar from './BottomBar'; // ایمپورت کامپوننت BottomBar

const MeetingPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isVolumeOff, setIsVolumeOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string; type?: 'text' | 'file'; fileName?: string }[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const toggleMute = () => setIsMuted(!isMuted);
  const handleVideo = () => setIsVideoOff(!isVideoOff);
  const handleVolume = () => setIsVolumeOff(!isVolumeOff);
  const handleEndCall = () => {
    // پایان تماس
    console.log('Call ended');
  };
  const toggleChat = () => setShowChat(!showChat);
  const toggleEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker);
  const handleEmojiClick = (emoji: string) => {
    // افزودن ایموجی به پیام
    setMessages([...messages, { sender: 'You', text: emoji }]);
  };
  const addMessage = (message: { sender: string; text: string; type?: 'text' | 'file'; fileName?: string }) => {
    setMessages([...messages, message]);
  };

  // شبیه‌سازی راه‌اندازی استریم محلی
  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };
    initLocalStream();
  }, []);

  return (
    <div>
      {/* نمایش ویدیو استریم محلی */}
      <div>
        {localStream && (
          <video
            ref={(video) => {
              if (video && localStream) {
                video.srcObject = localStream;
                video.play();
              }
            }}
            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            muted={isMuted}
            autoPlay
          />
        )}
      </div>

      {/* نمایش دیگر اجزای صفحه */}
      <BottomBar
        isMuted={isMuted}
        toggleMute={toggleMute}
        isVideoOff={isVideoOff}
        handleVideo={handleVideo}
        isVolumeOff={isVolumeOff}
        handleVolume={handleVolume}
        handleEndCall={handleEndCall}
        toggleChat={toggleChat}
        showChat={showChat}
        addMessage={addMessage}
        toggleEmojiPicker={toggleEmojiPicker}
        showEmojiPicker={showEmojiPicker}
        handleEmojiClick={handleEmojiClick}
        localStream={localStream}
        messages={messages}
      />
    </div>
  );
};

export default MeetingPage;















