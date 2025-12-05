window.textSpeechTools.getData = (...params) => {
    const storageKeys = params.length === 0
        ? ['userId', 'speechId', 'fontSize', 'currentSpeech', 'speedLevel', 'soundLevel', 'pitchLevel', 'currentVoice', 'currentPlayingIndex']
        : params;

    return new Promise(resolve => {
        const uniKey = Date.now().toString(36) + Math.random().toString(36).substring(2);

        window.addEventListener('message', function storageLogic(event) {
            if (event && event.data.toPage && event.data.message === uniKey) {
                resolve(event.data.data)
                window.removeEventListener('message', storageLogic)
            }
        });

        window.postMessage({ speecher: true, message: 'getData', props: { params: storageKeys }, callbackKey: uniKey });
    });
};
document.querySelector('.promo-script').remove();