import axios from 'axios';
import toast from 'react-hot-toast';

const ELEVEN_LABS_API_URL = 'https://api.elevenlabs.io/v1';

export const ElevenLabsService = {
    /**
     * Get list of available voices
     */
    getVoices: async (apiKey: string) => {
        try {
            const response = await axios.get(`${ELEVEN_LABS_API_URL}/voices`, {
                headers: { 'xi-api-key': apiKey }
            });
            return response.data.voices;
        } catch (error) {
            console.error('Failed to fetch voices', error);
            throw error;
        }
    },

    /**
     * Speaks the given text using ElevenLabs API
     */
    speak: async (text: string, apiKey: string, voiceId: string = '21m00Tcm4TlvDq8ikWAM') => {
        try {
            const response = await axios.post(
                `${ELEVEN_LABS_API_URL}/text-to-speech/${voiceId}`,
                {
                    text,
                    model_id: 'eleven_multilingual_v2', // Best for Hindi/Indian accents mixed with English
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    }
                },
                {
                    headers: {
                        'xi-api-key': apiKey,
                        'Content-Type': 'application/json',
                    },
                    responseType: 'blob' // Important: We expect audio data
                }
            );

            // Create audio URL from blob
            const audioUrl = URL.createObjectURL(response.data);
            const audio = new Audio(audioUrl);

            await audio.play();

            // Clean up URL after playing
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
            };

        } catch (error: any) {
            console.error('ElevenLabs TTS Error:', error);
            if (error.response?.status === 401) {
                toast.error('Invalid ElevenLabs API Key');
            } else if (error.response?.status === 402) {
                toast.error('ElevenLabs Quota Exceeded');
            } else {
                toast.error('Failed to play Announcement');
            }
            throw error;
        }
    }
};
