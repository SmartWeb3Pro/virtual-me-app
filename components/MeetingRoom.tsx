'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';
import LanguageSelector from './LanguageSelector'; // Import LanguageSelector

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

// فرض کنید اینجا اطلاعات کاربران را دارید
const users = [
  { id: 1, name: 'User  1', selectedLanguage: 'en' },
  { id: 2, name: 'User  2', selectedLanguage: 'es' },
  // سایر کاربران
];

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const [currentUser , setCurrentUser ] = useState(users[0]); // کاربر فعلی
  const [message, setMessage] = useState('');
  const [translatedMessages, setTranslatedMessages] = useState<string[]>([]);

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const handleSendMessage = async () => {
    if (!message) return;

    // زبان فرستنده
    const sourceLanguage = currentUser .selectedLanguage;

    // زبان‌های گیرندگان
    const targetLanguages = users.map(user => user.selectedLanguage).filter(lang => lang !== sourceLanguage);

    // ارسال پیام به سرور برای ترجمه
    const response = await fetch('http://127.0.0.1:8000/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
        source_language: sourceLanguage,
        target_language: targetLanguages, // ارسال زبان‌های گیرندگان
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setTranslatedMessages((prev) => [...prev, data.translatedText]); // اضافه کردن متن ترجمه شده به لیست
      setMessage(''); // پاک کردن ورودی پیام
    } else {
      console.error('Error translating message');
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} />

        {/* Add Language Selector here */}
        <LanguageSelector onChange={(language) => {
          // به‌روزرسانی زبان کاربر فعلی
          setCurrentUser (prev => ({ ...prev, selectedLanguage: language }));
        }} />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
 </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button title="Toggle Participants" onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
      {/* Message Input Section */}
      <div className="fixed bottom-16 left-0 right-0 flex items-center justify-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-2xl bg-[#19232d] text-white px-4 py-2"
        />
        <button
          onClick={handleSendMessage}
          className="rounded-2xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Send
        </button>
      </div>
      {/* Display Translated Messages */}
      <div className="absolute top-16 left-0 right-0 overflow-y-auto max-h-[300px] bg-[#19232d] p-4 rounded-lg">
        {translatedMessages.map((msg, index) => (
          <div key={index} className="text-white mb-2">
            {msg}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetingRoom;







// 'use client';
// import { useState } from 'react';
// import {
//   CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Users, LayoutList } from 'lucide-react';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import Loader from './Loader';
// import EndCallButton from './EndCallButton';
// import { cn } from '@/lib/utils';
// import LanguageSelector from './LanguageSelector'; // Import LanguageSelector

// type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const isPersonalRoom = !!searchParams.get('personal');
//   const router = useRouter();
//   const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState } = useCallStateHooks();
//   const [selectedLanguage, setSelectedLanguage] = useState('en'); // زبان پیش‌فرض به کد زبان
//   const [message, setMessage] = useState('');
//   const [translatedMessages, setTranslatedMessages] = useState<string[]>([]);

//   const callingState = useCallCallingState();

//   if (callingState !== CallingState.JOINED) return <Loader />;

//   const CallLayout = () => {
//     switch (layout) {
//       case 'grid':
//         return <PaginatedGridLayout />;
//       case 'speaker-right':
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   const handleLanguageChange = (language: string) => {
//     setSelectedLanguage(language);
//     // منطق برای تغییر زبان ترجمه‌ها را اینجا اضافه کنید
//   };

//   const handleSendMessage = async () => {
//     if (!message) return;

//     // ارسال پیام به سرور برای ترجمه
//     const response = await fetch('http://127.0.0.1:8000/translate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         text: message,
//         source_language: selectedLanguage, // اضافه کردن زبان مبدا
//         target_language: 'en', // یا هر زبان دیگری که می‌خواهید
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setTranslatedMessages((prev) => [...prev, data.translatedText]); // اضافه کردن متن ترجمه شده به لیست
//       setMessage(''); // پاک کردن ورودی پیام
//     } else {
//       console.error('Error translating message');
//     }
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
//       <div className="relative flex size-full items-center justify-center">
//         <div className="flex size-full max-w-[1000px] items-center">
//           <CallLayout />
//         </div>
//         <div
//           className={cn('h-[calc(100vh-86px)] hidden ml-2', {
//             'show-block': showParticipants,
//           })}
//         >
//           <CallParticipantsList onClose={() => setShowParticipants(false)} />
//         </div>
//       </div>
//       {/* video layout and call controls */}
//       <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
//         <CallControls onLeave={() => router.push(`/`)} />

//         {/* Add Language Selector here */}
//         <LanguageSelector onChange={handleLanguageChange} />

//         <DropdownMenu>
//           <div className="flex items-center">
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//           </div>
//           <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//  {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
//               <div key={index}>
//                 <DropdownMenuItem
//                   onClick={() =>
//                     setLayout(item.toLowerCase() as CallLayoutType)
//                   }
//                 >
//                   {item}
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className=" border-dark-1" />
//               </div>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <CallStatsButton />
//         <button title="Toggle Participants" onClick={() => setShowParticipants((prev) => !prev)}>
//           <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//             <Users size={20} className="text-white" />
//           </div>
//         </button>
//         {!isPersonalRoom && <EndCallButton />}
//       </div>
//       {/* Message Input Section */}
//       <div className="fixed bottom-16 left-0 right-0 flex items-center justify-center gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 rounded-2xl bg-[#19232d] text-white px-4 py-2"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="rounded-2xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//       {/* Display Translated Messages */}
//       <div className="absolute top-16 left-0 right-0 overflow-y-auto max-h-[300px] bg-[#19232d] p-4 rounded-lg">
//         {translatedMessages.map((msg, index) => (
//           <div key={index} className="text-white mb-2">
//             {msg}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;













// 'use client';
// import { useState } from 'react';
// import {
//   CallControls,
//   CallParticipantsList,
//   CallStatsButton,
//   CallingState,
//   PaginatedGridLayout,
//   SpeakerLayout,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Users, LayoutList } from 'lucide-react';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import Loader from './Loader';
// import EndCallButton from './EndCallButton';
// import { cn } from '@/lib/utils';
// import LanguageSelector from './LanguageSelector'; // Import LanguageSelector

// type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

// const MeetingRoom = () => {
//   const searchParams = useSearchParams();
//   const isPersonalRoom = !!searchParams.get('personal');
//   const router = useRouter();
//   const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
//   const [showParticipants, setShowParticipants] = useState(false);
//   const { useCallCallingState } = useCallStateHooks();
//   const [selectedLanguage, setSelectedLanguage] = useState('English'); // زبان پیش‌فرض
//   const [message, setMessage] = useState('');
//   const [translatedMessages, setTranslatedMessages] = useState<string[]>([]);

//   const callingState = useCallCallingState();

//   if (callingState !== CallingState.JOINED) return <Loader />;

//   const CallLayout = () => {
//     switch (layout) {
//       case 'grid':
//         return <PaginatedGridLayout />;
//       case 'speaker-right':
//         return <SpeakerLayout participantsBarPosition="left" />;
//       default:
//         return <SpeakerLayout participantsBarPosition="right" />;
//     }
//   };

//   const handleLanguageChange = (language: string) => {
//     setSelectedLanguage(language);
//     // منطق برای تغییر زبان ترجمه‌ها را اینجا اضافه کنید
//   };

//   const handleSendMessage = async () => {
//     if (!message) return;

//     // ارسال پیام به سرور برای ترجمه
//     const response = await fetch('http://127.0.0.1:8000/translate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ text: message, target_language: selectedLanguage }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setTranslatedMessages((prev) => [...prev, data.translated_text]); // اضافه کردن متن ترجمه شده به لیست
//       setMessage(''); // پاک کردن ورودی پیام
//     } else {
//       console.error('Error translating message');
//     }
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
//       <div className="relative flex size-full items-center justify-center">
//         <div className="flex size-full max-w-[1000px] items-center">
//           <CallLayout />
//         </div>
//         <div
//           className={cn('h-[calc(100vh-86px)] hidden ml-2', {
//             'show-block': showParticipants,
//           })}
//         >
//           <CallParticipantsList onClose={() => setShowParticipants(false)} />
//         </div>
//       </div>
//       {/* video layout and call controls */}
//       <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
//         <CallControls onLeave={() => router.push(`/`)} />

//         {/* Add Language Selector here */}
//         <LanguageSelector onChange={handleLanguageChange} />

//         <DropdownMenu>
//           <div className="flex items-center">
//             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//               <LayoutList size={20} className="text-white" />
//             </DropdownMenuTrigger>
//           </div>
//           <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
//             {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
//               <div key={index}>
//                 <DropdownMenuItem
//                   onClick={() =>
//                     setLayout(item.toLowerCase() as CallLayoutType)
//                   }
//                 >
//                   {item}
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator className=" border-dark-1" />
//               </div>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <CallStatsButton />
//         <button title="Toggle Participants" onClick={() => setShowParticipants((prev) => !prev)}>
//           <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
//             <Users size={20} className="text-white" />
//           </div>
//         </button>
//         {!isPersonalRoom && <EndCallButton />}
//       </div>
//       {/* Message Input Section */}
//       <div className="fixed bottom-16 left-0 right-0 flex items-center justify-center gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 rounded-2xl bg-[#19232d] text-white px-4 py-2"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="rounded-2xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//       {/* Display Translated Messages */}
//       <div className="absolute top-16 left-0 right-0 overflow-y-auto max-h-[300px] bg-[#19232d] p-4 rounded-lg">
//         {translatedMessages.map((msg, index) => (
//           <div key={index} className="text-white mb-2">
//             {msg}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MeetingRoom;










