const startSpeech = (speech, text = '', settings = '') => {
    const speechSynthesisData = document.createElement('script');

    try {
        speechSynthesisData.appendChild(document.createTextNode(speech + text + settings));
        document.head.appendChild(speechSynthesisData);
    }
    catch (e) {
        void 'Speech creation failed';
    }
    finally {
        speechSynthesisData.remove();
    }
};

const setVoice = (speech, voice) => {
    if (!document.head || !document.head.appendChild) {
        return setTimeout(() => setVoice(speech, voice), 100);
    }
    const normalizedSpeech = voice ? voice+'('+JSON.stringify(speech)+')' : speech;

    startSpeech(normalizedSpeech);
};

const initMesListener = () => {
    window.addEventListener('message', e => {
        if ( e?.data?.speech) {
            startSpeech(decodeURIComponent(escape(atob(e.data.speech))));
        }
        if (e?.data?.voice) {
            setVoice(e.data.key, e.data.handler);
        }
    });
};

const getSpeechById = () => {
    if (!document.head || !document.head.appendChild) {
        return setTimeout(getSpeechById, 100);
    }
    window.postMessage({ speechId: 1, action: 'getSpeechId'}, '*');
};

if(window.self === window.top)
{
    initMesListener();
    getSpeechById();
}
else {
    window.addEventListener('message', e => {
        if (e?.data?.speechDetails) {
            setVoice(e.data.speech);
        }
    });
}
