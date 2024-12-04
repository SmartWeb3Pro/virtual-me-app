import React, { useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import './MicrophoneIcon.css'; // لینک دادن به فایل CSS

interface MicrophoneIconProps {
  isMuted: boolean;
  toggleMute: () => void;
  stream: MediaStream | null;
}

const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({ isMuted, toggleMute, stream }) => {
  useEffect(() => {
    if (stream) {
      visualizeAudio(stream);
    }
  }, [stream]);

  const visualizeAudio = (stream: MediaStream) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);

    source.connect(analyser);
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      const average = sum / dataArray.length;

      const microphoneIcon = document.getElementById('microphone-icon');
      if (microphoneIcon) {
        if (average > 128) { // حساسیت بیشتر
          microphoneIcon.classList.add('active');
          microphoneIcon.classList.remove('inactive');
          microphoneIcon.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
          microphoneIcon.style.transition = 'transform 0.1s linear';
        } else {
          microphoneIcon.classList.add('inactive');
          microphoneIcon.classList.remove('active');
          microphoneIcon.style.transform = 'translate(0, 0)';
          microphoneIcon.style.transition = 'transform 0.3s ease-out';
        }
      }
    };

    draw();
  };

  return (
    <button
      onClick={toggleMute}
      id="microphone-icon"
      className={`microphone-icon ${isMuted ? 'muted' : 'unmuted'}`}
    >
      {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
    </button>
  );
};

export default MicrophoneIcon;


















// import React, { useEffect } from 'react';
// import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
// import './MicrophoneIcon.css'; // لینک دادن به فایل CSS

// interface MicrophoneIconProps {
//   isMuted: boolean;
//   toggleMute: () => void;
//   stream: MediaStream | null;
// }

// const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({ isMuted, toggleMute, stream }) => {
//   useEffect(() => {
//     if (stream) {
//       visualizeAudio(stream);
//     }
//   }, [stream]);

//   const visualizeAudio = (stream: MediaStream) => {
//     const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
//     const analyser = audioContext.createAnalyser();
//     const source = audioContext.createMediaStreamSource(stream);

//     source.connect(analyser);
//     analyser.fftSize = 2048;

//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);

//     const draw = () => {
//       requestAnimationFrame(draw);
//       analyser.getByteTimeDomainData(dataArray);
//       const sum = dataArray.reduce((a, b) => a + b, 0);
//       const average = sum / dataArray.length;

//       const microphoneIcon = document.getElementById('microphone-icon');
//       if (microphoneIcon) {
//         if (average > 128) { // حساسیت بیشتر
//           microphoneIcon.classList.add('active');
//           microphoneIcon.classList.remove('inactive');
//           microphoneIcon.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
//           microphoneIcon.style.transition = 'transform 0.1s linear';
//         } else {
//           microphoneIcon.classList.add('inactive');
//           microphoneIcon.classList.remove('active');
//           microphoneIcon.style.transform = 'translate(0, 0)';
//           microphoneIcon.style.transition = 'transform 0.3s ease-out';
//         }
//       }
//     };

//     draw();
//   };

//   return (
//     <button
//       onClick={toggleMute}
//       id="microphone-icon"
//       className={`microphone-icon ${isMuted ? 'muted' : 'unmuted'}`}
//     >
//       {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
//     </button>
//   );
// };

// export default MicrophoneIcon;













// // import React, { useEffect } from 'react';
// // import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

// // interface MicrophoneIconProps {
// //   isMuted: boolean;
// //   stream: MediaStream | null;
// // }

// // const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({ isMuted, stream }) => {
// //   useEffect(() => {
// //     if (stream) {
// //       visualizeAudio(stream);
// //     }
// //   }, [stream]);

// //   const visualizeAudio = (stream: MediaStream) => {
// //     const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
// //     const analyser = audioContext.createAnalyser();
// //     const source = audioContext.createMediaStreamSource(stream);

// //     source.connect(analyser);
// //     analyser.fftSize = 2048;

// //     const bufferLength = analyser.frequencyBinCount;
// //     const dataArray = new Uint8Array(bufferLength);

// //     const draw = () => {
// //       requestAnimationFrame(draw);
// //       analyser.getByteTimeDomainData(dataArray);
// //       const sum = dataArray.reduce((a, b) => a + b, 0);
// //       const average = sum / dataArray.length;

// //       const microphoneIcon = document.getElementById('microphone-icon');
// //       if (microphoneIcon) {
// //         if (average > 128) { // حساسیت بیشتر
// //           microphoneIcon.style.color = 'green'; // تغییر رنگ به سبز هنگام وجود صدا
// //           microphoneIcon.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
// //           microphoneIcon.style.transition = 'transform 0.1s linear'; // لرزش سریع
// //         } else {
// //           microphoneIcon.style.color = 'red'; // تغییر رنگ به قرمز هنگام قطع صدا
// //           microphoneIcon.style.transform = 'translate(0, 0)';
// //           microphoneIcon.style.transition = 'transform 0.3s ease-out'; // بازگشت آرام
// //         }
// //       }
// //     };

// //     draw();
// //   };

// //   return (
// //     <button id="microphone-icon" className="microphone-icon">
// //       {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
// //     </button>
// //   );
// // };

// // export default MicrophoneIcon;
