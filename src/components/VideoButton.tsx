import React from 'react';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';

interface VideoButtonProps {
  isVideoOff: boolean;
  handleVideo: () => void;
}

const VideoButton: React.FC<VideoButtonProps> = ({ isVideoOff, handleVideo }) => (
  <button onClick={handleVideo}>
    {isVideoOff ? <FaVideoSlash size={24} style={{ color: '#FF0000' }} /> : <FaVideo size={24} style={{ color: '#00FF00' }} />}
  </button>
);

export default VideoButton;
