import axios from 'axios';

const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    const response = await axios.post('https://translation.googleapis.com/language/translate/v2', null, {
      params: {
        q: text,
        target: targetLang,
        key: 'YOUR_API_KEY', // جایگزین کنید با کلید API خود
      },
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // در صورت خطا، متن اصلی را بازمی‌گرداند
  }
};

export default translateText;
