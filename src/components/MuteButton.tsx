import React from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

interface MuteButtonProps {
  isMuted: boolean;
  toggleMute: () => void;
  micColor: string;
}

const MuteButton: React.FC<MuteButtonProps> = ({ isMuted, toggleMute, micColor }) => (
  <button onClick={toggleMute}>
    {isMuted ? <FaMicrophoneSlash size={24} style={{ color: micColor }} /> : <FaMicrophone size={24} style={{ color: micColor }} />}
  </button>
);

export default MuteButton;
