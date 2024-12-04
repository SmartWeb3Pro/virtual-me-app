import React, { useState, useEffect, useRef } from 'react';
import { FaPaperclip, FaPaperPlane, FaSmile } from 'react-icons/fa';
import styles from './ChatPopup.module.css';
import io from 'socket.io-client';

interface Message {
  sender: string;
  text: string;
  type?: 'text' | 'file';
  fileName?: string;
}

interface ChatPopupProps {
  showChat: boolean;
  messages: Message[];
  addMessage: (message: Message) => void;
  toggleEmojiPicker: () => void;
  showEmojiPicker: boolean;
  handleEmojiClick: (emoji: string) => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  showChat,
  messages,
  addMessage,
  toggleEmojiPicker,
  showEmojiPicker,
  handleEmojiClick,
}) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    socketRef.current.on('receive-message', (message: Message) => {
      addMessage(message);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [addMessage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      const msg: Message = { sender: 'You', text: message, type: 'text' };
      socketRef.current.emit('send-message', msg);
      addMessage(msg);
      setMessage('');
    } else if (file) {
      const msg: Message = { sender: 'You', text: file.name, type: 'file', fileName: file.name };
      socketRef.current.emit('send-message', msg);
      addMessage(msg);
      setFile(null);
    }
  };

  return (
    <>
      {showChat && (
        <div className={styles.chatPopup}>
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === 'You' ? styles.messageSelf : styles.messageOther}
              >
                {msg.type === 'file' ? (
                  <a href="#" download={msg.fileName} className={styles.fileLink}>
                    📎 {msg.text}
                  </a>
                ) : (
                  msg.text
                )}
              </div>
            ))}
          </div>
          <div className={styles.chatInputContainer}>
            <textarea
              id="chatInput"
              className={styles.chatInput}
              value={message}
              onChange={handleInputChange}
              placeholder="Type a message..."
            ></textarea>
            <div className={styles.chatButtonsContainer}>
              <button className={styles.chatEmojiButton} onClick={toggleEmojiPicker}>
                <FaSmile />
              </button>
              <label htmlFor="fileInput" className={styles.chatAttachButton}>
                <FaPaperclip />
              </label>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button className={styles.chatSendButton} onClick={handleSend}>
                <FaPaperPlane />
              </button>
            </div>
            {showEmojiPicker && (
              <div className={styles.emojiPopup}>
                {['😊', '😂', '😍', '😢', '😎', '😡', '👍', '👎', '🙏', '💪', '❤️', '🔥', '🎉'].map(
                  (emoji) => (
                    <span
                      key={emoji}
                      onClick={() => {
                        handleEmojiClick(emoji);
                        setMessage((prev) => prev + emoji);
                      }}
                      style={{ cursor: 'pointer', padding: '5px' }}
                    >
                      {emoji}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPopup;












// import React, { useState, useEffect, useRef } from 'react';
// import { FaPaperclip, FaPaperPlane, FaSmile } from 'react-icons/fa';
// import styles from './ChatPopup.module.css';
// import io from 'socket.io-client';

// interface Message {
//   sender: string;
//   text: string;
//   type?: 'text' | 'file';
//   fileName?: string;
// }

// interface ChatPopupProps {
//   showChat: boolean;
//   messages: Message[];
//   addMessage: (message: Message) => void;
//   toggleEmojiPicker: () => void;
//   showEmojiPicker: boolean;
//   handleEmojiClick: (emoji: string) => void;
// }

// const ChatPopup: React.FC<ChatPopupProps> = ({
//   showChat,
//   messages,
//   addMessage,
//   toggleEmojiPicker,
//   showEmojiPicker,
//   handleEmojiClick,
// }) => {
//   const [message, setMessage] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const socketRef = useRef<any>(null);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:3000');

//     socketRef.current.on('receive-message', (message: Message) => {
//       addMessage(message);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };
//   }, [addMessage]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMessage(e.target.value);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSend = () => {
//     if (message.trim()) {
//       const msg: Message = { sender: 'You', text: message, type: 'text' };
//       socketRef.current.emit('send-message', msg);
//       addMessage(msg);
//       setMessage('');
//     } else if (file) {
//       const msg: Message = { sender: 'You', text: file.name, type: 'file', fileName: file.name };
//       socketRef.current.emit('send-message', msg);
//       addMessage(msg);
//       setFile(null);
//     }
//   };

//   return (
//     <>
//       {showChat && (
//         <div className={styles.chatPopup}>
//           <div className={styles.chatMessages}>
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={msg.sender === 'You' ? styles.messageSelf : styles.messageOther}
//               >
//                 {msg.type === 'file' ? (
//                   <a href="#" download={msg.fileName} className={styles.fileLink}>
//                     📎 {msg.text}
//                   </a>
//                 ) : (
//                   msg.text
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className={styles.chatInputContainer}>
//             <textarea
//               id="chatInput"
//               className={styles.chatInput}
//               value={message}
//               onChange={handleInputChange}
//               placeholder="Type a message..."
//             ></textarea>
//             <div className={styles.chatButtonsContainer}>
//               <button className={styles.chatEmojiButton} onClick={toggleEmojiPicker}>
//                 <FaSmile />
//               </button>
//               <label htmlFor="fileInput" className={styles.chatAttachButton}>
//                 <FaPaperclip />
//               </label>
//               <input
//                 id="fileInput"
//                 type="file"
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//               />
//               <button className={styles.chatSendButton} onClick={handleSend}>
//                 <FaPaperPlane />
//               </button>
//             </div>
//             {showEmojiPicker && (
//               <div className={styles.emojiPopup}>
//                 {['😊', '😂', '😍', '😢', '😎', '😡', '👍', '👎', '🙏', '💪', '❤️', '🔥', '🎉'].map(
//                   (emoji) => (
//                     <span
//                       key={emoji}
//                       onClick={() => {
//                         handleEmojiClick(emoji);
//                         setMessage((prev) => prev + emoji);
//                       }}
//                       style={{ cursor: 'pointer', padding: '5px' }}
//                     >
//                       {emoji}
//                     </span>
//                   )
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatPopup;





// import React, { useState } from "react";
// import { FaPaperclip, FaPaperPlane, FaSmile } from "react-icons/fa";
// import styles from "./ChatPopup.module.css";

// interface ChatPopupProps {
//   showChat: boolean;
//   messages: { sender: string; text: string; type?: "text" | "file"; fileName?: string }[];
//   handleSendMessage: (message: { sender: string; text: string; type?: "text" | "file"; fileName?: string }) => void;
//   toggleEmojiPicker: () => void;
//   showEmojiPicker: boolean;
//   handleEmojiClick: (emoji: string) => void;
// }

// const ChatPopup: React.FC<ChatPopupProps> = ({
//   showChat,
//   messages,
//   handleSendMessage,
//   toggleEmojiPicker,
//   showEmojiPicker,
//   handleEmojiClick,
// }) => {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMessage(e.target.value);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleSend = () => {
//     if (message.trim()) {
//       handleSendMessage({ sender: "You", text: message });
//       setMessage("");
//     } else if (file) {
//       handleSendMessage({
//         sender: "You",
//         text: file.name,
//         type: "file",
//         fileName: file.name,
//       });
//       setFile(null);
//     }
//   };

//   return (
//     <>
//       {showChat && (
//         <div className={styles.chatPopup}>
//           <div className={styles.chatMessages}>
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={msg.sender === "You" ? styles.messageSelf : styles.messageOther}
//               >
//                 {msg.type === "file" ? (
//                   <a href="#" download={msg.fileName} className={styles.fileLink}>
//                     📎 {msg.text}
//                   </a>
//                 ) : (
//                   msg.text
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className={styles.chatInputContainer}>
//             <textarea
//               id="chatInput"
//               className={styles.chatInput}
//               value={message}
//               onChange={handleInputChange}
//               placeholder="Type a message..."
//             ></textarea>
//             <div className={styles.chatButtonsContainer}>
//               <button className={styles.chatEmojiButton} onClick={toggleEmojiPicker}>
//                 <FaSmile />
//               </button>
//               <label htmlFor="fileInput" className={styles.chatAttachButton}>
//                 <FaPaperclip />
//               </label>
//               <input
//                 id="fileInput"
//                 type="file"
//                 onChange={handleFileChange}
//                 style={{ display: "none" }}
//               />
//               <button className={styles.chatSendButton} onClick={handleSend}>
//                 <FaPaperPlane />
//               </button>
//             </div>
//             {showEmojiPicker && (
//               <div className={styles.emojiPopup}>
//                 {["😊", "😂", "😍", "😢", "😎", "😡", "👍", "👎", "🙏", "💪", "❤️", "🔥", "🎉"].map(
//                   (emoji) => (
//                     <span
//                       key={emoji}
//                       onClick={() => {
//                         handleEmojiClick(emoji);
//                         setMessage((prev) => prev + emoji);
//                       }}
//                       style={{ cursor: "pointer", padding: "5px" }}
//                     >
//                       {emoji}
//                     </span>
//                   )
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatPopup;
