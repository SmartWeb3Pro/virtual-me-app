import React from 'react';
import styles from './ChatComponent.module.css';
import { FaPaperclip, FaPaperPlane, FaSmile } from 'react-icons/fa';

interface ChatComponentProps {
  showChat: boolean;
  messages: string[];
  handleSendMessage: () => void;
  toggleEmojiPicker: () => void;
  showEmojiPicker: boolean;
  handleEmojiClick: (emoji: string) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  showChat,
  messages,
  handleSendMessage,
  toggleEmojiPicker,
  showEmojiPicker,
  handleEmojiClick,
}) => {
  return (
    <>
      {showChat && (
        <div className={styles.chatContainer}>
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div key={index} className={styles.message}>{message}</div>
            ))}
          </div>
          <div className={styles.chatInputContainer}>
            <textarea id="chatInput" className={styles.chatInput}></textarea>
            <div className={styles.chatButtonsContainer}>
              <button className={styles.chatEmojiButton} onClick={toggleEmojiPicker}>
                <FaSmile />
              </button>
              <label htmlFor="fileInput" className={styles.chatAttachButton}>
                <FaPaperclip />
              </label>
              <input id="fileInput" type="file" style={{ display: 'none' }} />
              <button className={styles.chatSendButton} onClick={handleSendMessage}>
                <FaPaperPlane />
              </button>
            </div>
            {showEmojiPicker && (
              <div className={styles.emojiPopup}>
                {['😊', '😂', '😍', '😢', '😎', '😡', '👍', '👎', '🙏', '💪', '❤️', '🔥', '🎉', '🌟', '🎁', '👋', '👏', '💔'].map((emoji) => (
                  <span key={emoji} onClick={() => handleEmojiClick(emoji)} style={{ cursor: 'pointer', padding: '5px' }}>
                    {emoji}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
