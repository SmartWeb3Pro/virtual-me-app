// src/services/api.tsx
import axios from 'axios';

const LOCAL_SERVER_URL = 'http://127.0.0.1:8000/translate';

async function translateSpeechLocally(audioBuffer: ArrayBuffer) {
    const response = await axios.post(LOCAL_SERVER_URL, { audio: audioBuffer }, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data.translation;
}

export { translateSpeechLocally };
