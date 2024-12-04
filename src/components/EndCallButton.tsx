import React from 'react';
import { FaPhoneSlash } from 'react-icons/fa';

interface EndCallButtonProps {
  handleEndCall: () => void;
}

const EndCallButton: React.FC<EndCallButtonProps> = ({ handleEndCall }) => (
  <button onClick={handleEndCall}>
    <FaPhoneSlash size={24} style={{ color: '#FF0000' }} />
  </button>
);

export default EndCallButton;
