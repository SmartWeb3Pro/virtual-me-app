import React from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

interface VolumeButtonProps {
  isVolumeOff: boolean;
  handleVolume: () => void;
}

const VolumeButton: React.FC<VolumeButtonProps> = ({ isVolumeOff, handleVolume }) => (
  <button onClick={handleVolume}>
    {isVolumeOff ? <FaVolumeMute size={24} style={{ color: '#FF4500' }} /> : <FaVolumeUp size={24} style={{ color: '#00BFFF' }} />}
  </button>
);

export default VolumeButton;
