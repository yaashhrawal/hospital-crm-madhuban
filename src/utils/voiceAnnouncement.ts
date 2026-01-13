import { ElevenLabsService } from '../services/elevenLabsService';

// Chime Generator using Web Audio API
const playChime = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const t = ctx.currentTime;

    // First Note (High - Ding) G5
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.frequency.value = 784;
    gain1.gain.setValueAtTime(0.1, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    osc1.start(t);
    osc1.stop(t + 0.8);

    // Second Note (Low - Dong) E5
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.frequency.value = 659;
    gain2.gain.setValueAtTime(0.1, t + 0.4);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

    osc2.start(t + 0.4);
    osc2.stop(t + 1.5);
};

export interface AnnouncementDetails {
    patientName: string;
    tokenNumber: string;
    doctorName?: string;
}

/**
 * Announces the patient name using Text-to-Speech.
 * Prioritizes ElevenLabs if API key is configured, falls back to Browser TTS.
 */
export const announcePatient = async (data: AnnouncementDetails | string) => {
    // Play attention chime
    playChime();

    // Construct text
    let text = '';
    if (typeof data === 'string') {
        text = data;
    } else {
        const { patientName, tokenNumber, doctorName } = data;
        const doc = doctorName || 'Consultation Room';
        // Bilingual Announcement
        // English: "Token 4. Rahul. Please proceed to Dr. Sharma."
        // Hindi: "Rahul ji, kripya Dr. Sharma ke paas jaayein."
        text = `Token ${tokenNumber}. ${patientName}. Please proceed to ${doc}. ${patientName} ji, kripya ${doc} ke paas jaayein.`;
    }

    // Delay speech to let chime finish (approx 1.2s)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Check for ElevenLabs API Key
    const elevenLabsKey = localStorage.getItem('eleven_labs_api_key');
    const voiceId = localStorage.getItem('eleven_labs_voice_id');

    if (elevenLabsKey) {
        try {
            await ElevenLabsService.speak(text, elevenLabsKey, voiceId || undefined);
            return;
        } catch (error) {
            console.warn('ElevenLabs failed, falling back to Browser TTS', error);
        }
    }

    // Browser TTS Fallback
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();

        const preferredVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('google हिन्दी') ||
            voice.name.toLowerCase().includes('lekha') ||
            voice.name.toLowerCase().includes('rishi')
        ) || voices.find(voice =>
            voice.lang === 'hi-IN'
        ) || voices.find(voice =>
            voice.lang === 'en-IN'
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            utterance.lang = preferredVoice.lang;
        } else {
            utterance.lang = 'hi-IN';
        }

        utterance.rate = 0.85;
        utterance.pitch = 1;
        utterance.volume = 1;

        window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            speak();
            window.speechSynthesis.onvoiceschanged = null;
        };
    } else {
        speak();
    }
};
