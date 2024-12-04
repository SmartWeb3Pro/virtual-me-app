import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

const AudioCallPage: React.FC = () => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [remotePeerId, setRemotePeerId] = useState<string>('');
  const [isCallStarted, setIsCallStarted] = useState(false);
  const peer = new Peer();

  useEffect(() => {
    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          const audioElement = document.getElementById('remoteAudio') as HTMLAudioElement;
          audioElement.srcObject = remoteStream;
          audioElement.play();
        });
      });
    });
  }, [peer]);

  const startCall = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const call = peer.call(remotePeerId, stream);
      call.on('stream', (remoteStream) => {
        const audioElement = document.getElementById('remoteAudio') as HTMLAudioElement;
        audioElement.srcObject = remoteStream;
        audioElement.play();
      });
    });
    setIsCallStarted(true);
  };

  return (
    <div>
      <h2>Audio Call</h2>
      {peerId && <p>Your ID: {peerId}</p>}
      <input
        type="text"
        placeholder="Enter remote peer ID"
        value={remotePeerId}
        onChange={(e) => setRemotePeerId(e.target.value)}
      />
      <button onClick={startCall}>Start Call</button>
      {isCallStarted && (
        <div>
          <h3>Call in Progress</h3>
          <audio id="remoteAudio" controls></audio>
        </div>
      )}
    </div>
  );
};

export default AudioCallPage;
