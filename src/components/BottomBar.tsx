import React, { useEffect, useState } from 'react';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
  FaVolumeUp,
  FaVolumeMute,
  FaComments,
} from 'react-icons/fa';
import styles from './BottomBar.module.css';
import ChatPopup from './ChatPopup'; // Importing the ChatPopup component

interface BottomBarProps {
  isMuted: boolean;
  toggleMute: () => void;
  isVideoOff: boolean;
  handleVideo: () => void;
  isVolumeOff: boolean;
  handleVolume: () => void;
  handleEndCall: () => void;
  toggleChat: () => void;
  showChat: boolean;
  addMessage: (message: { sender: string; text: string; type?: 'text' | 'file'; fileName?: string }) => void;
  toggleEmojiPicker: () => void;
  showEmojiPicker: boolean;
  handleEmojiClick: (emoji: string) => void;
  localStream: MediaStream | null;
  messages: { sender: string; text: string; type?: 'text' | 'file'; fileName?: string }[];
}

const BottomBar: React.FC<BottomBarProps> = ({
  isMuted,
  toggleMute,
  isVideoOff,
  handleVideo,
  isVolumeOff,
  handleVolume,
  handleEndCall,
  toggleChat,
  showChat,
  addMessage,
  toggleEmojiPicker,
  showEmojiPicker,
  handleEmojiClick,
  localStream,
  messages,
}) => {
  const [micVolume, setMicVolume] = useState(0);

  useEffect(() => {
    if (localStream) {
      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(localStream);
      const analyser = audioContext.createAnalyser();
      mediaStreamSource.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const getVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let values = 0;
        for (let i = 0; i < bufferLength; i++) {
          values += dataArray[i];
        }
        const average = values / bufferLength;
        setMicVolume(average);
      };

      const interval = setInterval(getVolume, 100);
      return () => clearInterval(interval);
    }
  }, [localStream]);

  const micColor = micVolume > 30 ? '#00FF00' : '#FF0000';

  return (
    <div className={styles.bottomBar}>
      <button onClick={handleVolume} className={styles.controlButton}>
        {isVolumeOff ? (
          <FaVolumeMute size={24} style={{ color: '#FF4500' }} />
        ) : (
          <FaVolumeUp size={24} style={{ color: '#00BFFF' }} />
        )}
      </button>
      <button onClick={handleVideo} className={styles.controlButton}>
        {isVideoOff ? (
          <FaVideoSlash size={24} style={{ color: '#FF0000' }} />
        ) : (
          <FaVideo size={24} style={{ color: '#00FF00' }} />
        )}
      </button>
      <button onClick={handleEndCall} className={styles.controlButton}>
        <FaPhoneSlash size={24} style={{ color: '#FF0000' }} />
      </button>
      <button onClick={toggleMute} className={styles.controlButton}>
        {isMuted ? (
          <FaMicrophoneSlash size={24} style={{ color: micColor }} />
        ) : (
          <FaMicrophone size={24} style={{ color: micColor }} />
        )}
      </button>
      <button onClick={toggleChat} className={styles.controlButton}>
        <FaComments size={24} />
      </button>
      <ChatPopup
        showChat={showChat}
        messages={messages}
        addMessage={addMessage}
        toggleEmojiPicker={toggleEmojiPicker}
        showEmojiPicker={showEmojiPicker}
        handleEmojiClick={handleEmojiClick}
      />
    </div>
  );
};

export default BottomBar;











// import React, { useEffect, useState } from 'react';
// import {
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaVideo,
//   FaVideoSlash,
//   FaPhoneSlash,
//   FaVolumeUp,
//   FaVolumeMute,
//   FaComments,
// } from 'react-icons/fa';
// import styles from './BottomBar.module.css';
// import ChatPopup from './ChatPopup'; // اضافه کردن ایمپورت

// interface BottomBarProps {
//   isMuted: boolean;
//   toggleMute: () => void;
//   isVideoOff: boolean;
//   handleVideo: () => void;
//   isVolumeOff: boolean;
//   handleVolume: () => void;
//   handleEndCall: () => void;
//   toggleChat: () => void;
//   showChat: boolean;
//   addMessage: (message: { sender: string; text: string; type?: 'text' | 'file'; fileName?: string }) => void;
//   toggleEmojiPicker: () => void;
//   showEmojiPicker: boolean;
//   handleEmojiClick: (emoji: string) => void;
//   localStream: MediaStream | null;
//   messages: { sender: string; text: string; type?: 'text' | 'file'; fileName?: string }[];
// }

// const BottomBar: React.FC<BottomBarProps> = ({
//   isMuted,
//   toggleMute,
//   isVideoOff,
//   handleVideo,
//   isVolumeOff,
//   handleVolume,
//   handleEndCall,
//   toggleChat,
//   showChat,
//   addMessage,
//   toggleEmojiPicker,
//   showEmojiPicker,
//   handleEmojiClick,
//   localStream,
//   messages,
// }) => {
//   const [micVolume, setMicVolume] = useState(0);

//   useEffect(() => {
//     if (localStream) {
//       const audioContext = new AudioContext();
//       const mediaStreamSource = audioContext.createMediaStreamSource(localStream);
//       const analyser = audioContext.createAnalyser();
//       mediaStreamSource.connect(analyser);
//       analyser.fftSize = 256;
//       const bufferLength = analyser.frequencyBinCount;
//       const dataArray = new Uint8Array(bufferLength);

//       const getVolume = () => {
//         analyser.getByteFrequencyData(dataArray);
//         let values = 0;
//         for (let i = 0; i < bufferLength; i++) {
//           values += dataArray[i];
//         }
//         const average = values / bufferLength;
//         setMicVolume(average);
//       };

//       const interval = setInterval(getVolume, 100);
//       return () => clearInterval(interval);
//     }
//   }, [localStream]);

//   const micColor = micVolume > 30 ? '#00FF00' : '#FF0000';

//   return (
//     <div className={styles.bottomBar}>
//       <button onClick={handleVolume} className={styles.controlButton}>
//         {isVolumeOff ? <FaVolumeMute size={24} style={{ color: '#FF4500' }} /> : <FaVolumeUp size={24} style={{ color: '#00BFFF' }} />}
//       </button>
//       <button onClick={handleVideo} className={styles.controlButton}>
//         {isVideoOff ? <FaVideoSlash size={24} style={{ color: '#FF0000' }} /> : <FaVideo size={24} style={{ color: '#00FF00' }} />}
//       </button>
//       <button onClick={handleEndCall} className={styles.controlButton}>
//         <FaPhoneSlash size={24} style={{ color: '#FF0000' }} />
//       </button>
//       <button onClick={toggleMute} className={styles.controlButton}>
//         {isMuted ? <FaMicrophoneSlash size={24} style={{ color: micColor }} /> : <FaMicrophone size={24} style={{ color: micColor }} />}
//       </button>
//       <button onClick={toggleChat} className={styles.controlButton}>
//         <FaComments size={24} />
//       </button>
//       <ChatPopup
//         showChat={showChat}
//         messages={messages}
//         addMessage={addMessage}
//         toggleEmojiPicker={toggleEmojiPicker}
//         showEmojiPicker={showEmojiPicker}
//         handleEmojiClick={handleEmojiClick}
//       />
//     </div>
//   );
// };

// export default BottomBar;


















// import React, { useEffect, useState } from 'react';
// import {
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaVideo,
//   FaVideoSlash,
//   FaPhoneSlash,
//   FaVolumeUp,
//   FaVolumeMute,
//   FaComments,
// } from 'react-icons/fa';
// import styles from './BottomBar.module.css';
// import ChatPopup from './ChatPopup'; // اضافه کردن ایمپورت

// interface BottomBarProps {
//   isMuted: boolean;
//   toggleMute: () => void;
//   isVideoOff: boolean;
//   handleVideo: () => void;
//   isVolumeOff: boolean;
//   handleVolume: () => void;
//   handleEndCall: () => void;
//   toggleChat: () => void;
//   showChat: boolean;
//   addMessage: (message: { sender: string; text: string; type?: 'text' | 'file'; fileName?: string }) => void;
//   toggleEmojiPicker: () => void;
//   showEmojiPicker: boolean;
//   handleEmojiClick: (emoji: string) => void;
//   localStream: MediaStream | null;
//   messages: { sender: string; text: string; type?: 'text' | 'file'; fileName?: string }[];
// }

// const BottomBar: React.FC<BottomBarProps> = ({
//   isMuted,
//   toggleMute,
//   isVideoOff,
//   handleVideo,
//   isVolumeOff,
//   handleVolume,
//   handleEndCall,
//   toggleChat,
//   showChat,
//   addMessage,
//   toggleEmojiPicker,
//   showEmojiPicker,
//   handleEmojiClick,
//   localStream,
//   messages,
// }) => {
//   const [micVolume, setMicVolume] = useState(0);

//   useEffect(() => {
//     if (localStream) {
//       const audioContext = new AudioContext();
//       const mediaStreamSource = audioContext.createMediaStreamSource(localStream);
//       const analyser = audioContext.createAnalyser();
//       mediaStreamSource.connect(analyser);
//       analyser.fftSize = 256;
//       const bufferLength = analyser.frequencyBinCount;
//       const dataArray = new Uint8Array(bufferLength);

//       const getVolume = () => {
//         analyser.getByteFrequencyData(dataArray);
//         let values = 0;
//         for (let i = 0; i < bufferLength; i++) {
//           values += dataArray[i];
//         }
//         const average = values / bufferLength;
//         setMicVolume(average);
//       };

//       const interval = setInterval(getVolume, 100);
//       return () => clearInterval(interval);
//     }
//   }, [localStream]);

//   const micColor = micVolume > 30 ? '#00FF00' : '#FF0000';

//   return (
//     <div className={styles.bottomBar}>
//       <button onClick={handleVolume} className={styles.controlButton}>
//         {isVolumeOff ? <FaVolumeMute size={24} style={{ color: '#FF4500' }} /> : <FaVolumeUp size={24} style={{ color: '#00BFFF' }} />}
//       </button>
//       <button onClick={handleVideo} className={styles.controlButton}>
//         {isVideoOff ? <FaVideoSlash size={24} style={{ color: '#FF0000' }} /> : <FaVideo size={24} style={{ color: '#00FF00' }} />}
//       </button>
//       <button onClick={handleEndCall} className={styles.controlButton}>
//         <FaPhoneSlash size={24} style={{ color: '#FF0000' }} />
//       </button>
//       <button onClick={toggleMute} className={styles.controlButton}>
//         {isMuted ? <FaMicrophoneSlash size={24} style={{ color: micColor }} /> : <FaMicrophone size={24} style={{ color: micColor }} />}
//       </button>
//       <button onClick={toggleChat} className={styles.controlButton}>
//         <FaComments size={24} />
//       </button>
//       <ChatPopup
//         showChat={showChat}
//         messages={messages}
//         addMessage={addMessage} // اینجا باید `addMessage` باشد
//         toggleEmojiPicker={toggleEmojiPicker}
//         showEmojiPicker={showEmojiPicker}
//         handleEmojiClick={handleEmojiClick}
//       />
//     </div>
//   );
// };

// export default BottomBar;
