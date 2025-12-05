// eslint-disable-next-line no-undef
const brows = chrome;
const textContainer = document.querySelector('.text-container');
const openSettingsBtn = document.querySelector('.settings-btn');
const closeSettingsBtn = document.querySelector('.settings-panel .close-btn');
const settingsPanel = document.querySelector('.settings-panel');
const textResizeButtons = document.querySelectorAll('.text-size-change-btn');
const playingControlPanel = document.querySelector('.playing-control');
const playSpeechBtn = document.querySelector('.play-pause-btn');
const stopSpeechBtn = document.querySelector('.stop-btn');
const settingsRanges = document.querySelectorAll('input[type="range"]');
const changeSectionButtons = document.querySelectorAll('.change-section-btn');
const testBtn = document.querySelector('.test_btn');
const resetBtn = document.querySelector('.reset_btn');
const textPanel = document.querySelector('.text-panel');
const voiceSelector = document.querySelector('.voice-selector');
const speedError = document.querySelector('.speed-error');

let localSpeech = null;
const testTexts = {
    'en': 'Voice Reader is a Chrome extension that converts web-page text to audio using text-to-speech technology. It helps you read texts on different websites with emails, news, articles, textbooks, blogs, scientific publications, and many others.',
    'ar': 'Voice Reader هو امتداد Chrome يحول نص صفحة الويب إلى صوت باستخدام تقنية تحويل النص إلى كلام. يساعدك على قراءة النصوص على مواقع الويب المختلفة مع رسائل البريد الإلكتروني والأخبار والمقالات والكتب المدرسية والمدونات والمنشورات العلمية وغيرها الكثير.',
    'cs': 'Voice Reader je rozšíření pro Chrome, které převádí text webových stránek na zvuk pomocí technologie převodu textu na řeč. Pomáhá vám číst texty na různých webech pomocí e-mailů, zpráv, článků, učebnic, blogů, vědeckých publikací a mnoha dalších.',
    'da': 'Voice Reader er en Chrome-udvidelse, der konverterer websidetekst til lyd ved hjælp af tekst-til-tale-teknologi. Det hjælper dig med at læse tekster på forskellige websteder med e-mails, nyheder, artikler, lærebøger, blogs, videnskabelige publikationer og mange andre.',
    'de': 'Voice Reader ist eine Chrome-Erweiterung, die Webseitentext mithilfe der Text-to-Speech-Technologie in Audio umwandelt. Es hilft Ihnen, Texte auf verschiedenen Websites mit E-Mails, Nachrichten, Artikeln, Lehrbüchern, Blogs, wissenschaftlichen Veröffentlichungen und vielen anderen zu lesen.',
    'el': 'Το Voice Reader είναι μια επέκταση του Chrome που μετατρέπει κείμενο ιστοσελίδας σε ήχο χρησιμοποιώντας τεχνολογία μετατροπής κειμένου σε ομιλία. Σας βοηθά να διαβάζετε κείμενα σε διαφορετικούς ιστότοπους με email, ειδήσεις, άρθρα, σχολικά βιβλία, ιστολόγια, επιστημονικές δημοσιεύσεις και πολλά άλλα.',
    'es': 'Voice Reader es una extensión de Chrome que convierte el texto de una página web en audio mediante la tecnología de conversión de texto a voz. Te ayuda a leer textos en diferentes sitios web con correos electrónicos, noticias, artículos, libros de texto, blogs, publicaciones científicas y muchos otros.',
    'fi': 'Voice Reader on Chrome-laajennus, joka muuntaa verkkosivun tekstin ääneksi tekstistä puheeksi -tekniikalla. Sen avulla voit lukea tekstejä eri verkkosivustoilla sähköpostien, uutisten, artikkeleiden, oppikirjojen, blogien, tieteellisten julkaisujen ja monien muiden kanssa.',
    'fr': `Voice Reader est une extension Chrome qui convertit le texte d'une page Web en audio à l'aide de la technologie de synthèse vocale. Il vous aide à lire des textes sur différents sites Web avec des e-mails, des nouvelles, des articles, des manuels, des blogs, des publications scientifiques et bien d'autres.`,
    'he': 'Voice Reader הוא תוסף Chrome הממיר טקסט של דף אינטרנט לאודיו באמצעות טכנולוגיית טקסט לדיבור. זה עוזר לך לקרוא טקסטים באתרי אינטרנט שונים עם מיילים, חדשות, מאמרים, ספרי לימוד, בלוגים, פרסומים מדעיים ועוד רבים אחרים.',
    'hi': 'वॉयस रीडर एक क्रोम एक्सटेंशन है जो टेक्स्ट-टू-स्पीच तकनीक का उपयोग करके वेब-पेज टेक्स्ट को ऑडियो में परिवर्तित करता है। यह आपको विभिन्न वेबसाइटों पर ईमेल, समाचार, लेख, पाठ्यपुस्तकें, ब्लॉग, वैज्ञानिक प्रकाशन, और कई अन्य के साथ ग्रंथों को पढ़ने में मदद करता है।',
    'hu': 'A Voice Reader egy Chrome-bővítmény, amely szövegfelolvasó technológia segítségével a weboldal szövegét hanggá alakítja. Segít elolvasni a különböző webhelyeken található szövegeket e-mailekkel, hírekkel, cikkekkel, tankönyvekkel, blogokkal, tudományos publikációkkal és sok mással.',
    'id': 'Pembaca Suara adalah ekstensi Chrome yang mengubah teks halaman web menjadi audio menggunakan teknologi text-to-speech. Ini membantu Anda membaca teks di situs web yang berbeda dengan email, berita, artikel, buku teks, blog, publikasi ilmiah, dan banyak lainnya.',
    'it': `Voice Reader è un'estensione di Chrome che converte il testo della pagina Web in audio utilizzando la tecnologia di sintesi vocale. Ti aiuta a leggere testi su diversi siti Web con e-mail, notizie, articoli, libri di testo, blog, pubblicazioni scientifiche e molti altri.`,
    'ja': 'Voice Readerは、テキスト読み上げテクノロジーを使用してウェブページのテキストを音声に変換するChrome拡張機能です。 電子メール、ニュース、記事、教科書、ブログ、科学出版物など、さまざまなWebサイトのテキストを読むのに役立ちます。',
    'ko': '음성 리더는 텍스트 음성 변환 기술을 사용하여 웹 페이지 텍스트를 오디오로 변환하는 Chrome 확장 프로그램입니다. 이메일, 뉴스, 기사, 교과서, 블로그, 과학 출판물 및 기타 여러 웹사이트에서 텍스트를 읽는 데 도움이 됩니다.',
    'nb': 'Voice Reader er en Chrome-utvidelse som konverterer nettsidetekst til lyd ved hjelp av tekst-til-tale-teknologi. Det hjelper deg å lese tekster på forskjellige nettsteder med e-poster, nyheter, artikler, lærebøker, blogger, vitenskapelige publikasjoner og mange andre.',
    'nl': 'Voice Reader is een Chrome-extensie die webpaginatekst converteert naar audio met behulp van tekst-naar-spraaktechnologie. Het helpt je bij het lezen van teksten op verschillende websites met e-mails, nieuws, artikelen, studieboeken, blogs, wetenschappelijke publicaties en vele andere.',
    'pl': 'Voice Reader to rozszerzenie Chrome, które konwertuje tekst na stronie internetowej na dźwięk przy użyciu technologii zamiany tekstu na mowę. Pomaga czytać teksty na różnych stronach internetowych z e-mailami, wiadomościami, artykułami, podręcznikami, blogami, publikacjami naukowymi i wieloma innymi.',
    'pt': 'O Voice Reader é uma extensão do Chrome que converte o texto da página da Web em áudio usando a tecnologia de conversão de texto em fala. Ele ajuda você a ler textos em diferentes sites com e-mails, notícias, artigos, livros didáticos, blogs, publicações científicas e muitos outros.',
    'ro': 'Voice Reader este o extensie Chrome care convertește textul paginii web în audio folosind tehnologia text-to-speech. Vă ajută să citiți texte pe diferite site-uri web cu e-mailuri, știri, articole, manuale, bloguri, publicații științifice și multe altele.',
    'ru': 'Voice Reader — это расширение Chrome, которое преобразует текст веб-страницы в аудио с помощью технологии преобразования текста в речь. Он помогает читать тексты на разных сайтах с электронной почтой, новостями, статьями, учебниками, блогами, научными публикациями и многим другим.',
    'sk': 'Voice Reader je rozšírenie prehliadača Chrome, ktoré prevádza text webovej stránky na zvuk pomocou technológie prevodu textu na reč. Pomáha vám čítať texty na rôznych webových stránkach pomocou e-mailov, správ, článkov, učebníc, blogov, vedeckých publikácií a mnohých ďalších.',
    'sv': 'Voice Reader är ett Chrome-tillägg som konverterar webbsidestext till ljud med hjälp av text-till-tal-teknik. Det hjälper dig att läsa texter på olika webbplatser med e-postmeddelanden, nyheter, artiklar, läroböcker, bloggar, vetenskapliga publikationer och många andra.',
    'th': 'โปรแกรมอ่านเสียงเป็นส่วนขยายของ Chrome ที่แปลงข้อความของหน้าเว็บเป็นเสียงโดยใช้เทคโนโลยีแปลงข้อความเป็นคำพูด ช่วยให้คุณอ่านข้อความบนเว็บไซต์ต่างๆ ด้วยอีเมล ข่าวสาร บทความ ตำรา บล็อก สิ่งพิมพ์ทางวิทยาศาสตร์ และอื่นๆ อีกมากมาย',
    'tr': 'Voice Reader, metinden konuşmaya teknolojisini kullanarak web sayfası metnini sese dönüştüren bir Chrome uzantısıdır. E-postalar, haberler, makaleler, ders kitapları, bloglar, bilimsel yayınlar ve diğer pek çok farklı web sitesindeki metinleri okumanıza yardımcı olur.',
    'zh': 'Voice Reader 是一個 Chrome 擴展，它使用文本到語音技術將網頁文本轉換為音頻。 它可以幫助您閱讀不同網站上的文本，包括電子郵件、新聞、文章、教科書、博客、科學出版物等。',
};

const getStorage = (...params) => {
    const storageKeys = params.length === 0
        ? ['userId', 'fontSize', 'currentSpeech', 'speedLevel', 'soundLevel', 'pitchLevel', 'currentVoice', 'currentPlayingIndex']
        : params;

    return new Promise(resolve => {
        brows.storage.local.get(storageKeys, data => resolve(data));
    });
};

const setStorage = (key, value) => {
    return new Promise(resolve => {
        brows.storage.local.set({ [key]: value }, resolve);
    });
};

const getTabId = () => {
    return new Promise(resolve => {
        brows.tabs.query({ currentWindow: true, active: true }, tabs => {
            resolve(tabs[0].id);
        });
    });
};

const getTabURL = () => {
    return new Promise(resolve => {
        brows.tabs.query({ currentWindow: true, active: true }, tabs => {
            resolve(tabs[0].url);
        });
    });
};

const setTextSize = value => {
    setStorage('fontSize', value);
    textContainer.style.fontSize = value + 'em';
};

const setControlPanelState = isPlaying => {
    isPlaying
        ? playingControlPanel.classList.add('playing')
        : playingControlPanel.classList.remove('playing');
};

const setRangeValues = (speed, sound, pitch) => {
    settingsRanges.forEach(range => {
        if (range.name === 'speed') {
            range.value = speed;
            inputErrorHandling(speed);
        }
        if (range.name === 'sound') {
            range.value = sound;
        }
        if (range.name === 'pitch') {
            range.value = pitch;
        }
    });
};

const setAnotherActivePartOfText = playingIndex => {
    const textBlocks = textContainer.querySelectorAll('span');

    textBlocks.forEach((block, index) => {
        if (block.classList.contains('active')) {
            block.classList.remove('active');
        }
        if (index === playingIndex) {
            block.classList.add('active');
            if (block.getBoundingClientRect().bottom > 450) {
                block.scrollIntoView({block: 'start', behavior: 'smooth'});
            }
        }
    });
};

const sendMessageToContent = (action, data, tabId = null) => {
    return new Promise(resolve => {
        const requestData = { action, data };

        if (tabId) {
            brows.runtime.sendMessage({ action, tabId, data: requestData }, () => resolve());
        }
        else {
            brows.tabs.query({ currentWindow: true, active: true }, tab => {
                brows.runtime.sendMessage({ action, tabId: tab[0].id, data: requestData }, () => resolve());
            });
        }
    });
};

const getFullLangName = lang => {
    const isoLanguages = {
        'ab': {'name': 'Abkhaz', 'nativeName': 'аҧсуа'},
        'aa': {'name': 'Afar', 'nativeName': 'Afaraf'},
        'af': {'name': 'Afrikaans', 'nativeName': 'Afrikaans'},
        'ak': {'name': 'Akan', 'nativeName': 'Akan'},
        'sq': {'name': 'Albanian', 'nativeName': 'Shqip'},
        'am': {'name': 'Amharic', 'nativeName': 'አማርኛ'},
        'ar': {'name': 'Arabic', 'nativeName': 'العربية'},
        'an': {'name': 'Aragonese', 'nativeName': 'Aragonés'},
        'hy': {'name': 'Armenian', 'nativeName': 'Հայերեն'},
        'as': {'name': 'Assamese', 'nativeName': 'অসমীয়া'},
        'av': {'name': 'Avaric', 'nativeName': 'авар мацӀ, магӀарул мацӀ'},
        'ae': {'name': 'Avestan', 'nativeName': 'avesta'},
        'ay': {'name': 'Aymara', 'nativeName': 'aymar aru'},
        'az': {'name': 'Azerbaijani', 'nativeName': 'azərbaycan dili'},
        'bm': {'name': 'Bambara', 'nativeName': 'bamanankan'},
        'ba': {'name': 'Bashkir', 'nativeName': 'башҡорт теле'},
        'eu': {'name': 'Basque', 'nativeName': 'euskara, euskera'},
        'be': {'name': 'Belarusian', 'nativeName': 'Беларуская'},
        'bn': {'name': 'Bengali', 'nativeName': 'বাংলা'},
        'bh': {'name': 'Bihari', 'nativeName': 'भोजपुरी'},
        'bi': {'name': 'Bislama', 'nativeName': 'Bislama'},
        'bs': {'name': 'Bosnian', 'nativeName': 'bosanski jezik'},
        'br': {'name': 'Breton', 'nativeName': 'brezhoneg'},
        'bg': {'name': 'Bulgarian', 'nativeName': 'български език'},
        'my': {'name': 'Burmese', 'nativeName': 'ဗမာစာ'},
        'ca': {'name': 'Catalan; Valencian', 'nativeName': 'Català'},
        'ch': {'name': 'Chamorro', 'nativeName': 'Chamoru'},
        'ce': {'name': 'Chechen', 'nativeName': 'нохчийн мотт'},
        'ny': {'name': 'Chichewa; Chewa; Nyanja', 'nativeName': 'chiCheŵa, chinyanja'},
        'zh': {'name': 'Chinese', 'nativeName': '中文 (Zhōngwén), 汉语, 漢語'},
        'cv': {'name': 'Chuvash', 'nativeName': 'чӑваш чӗлхи'},
        'kw': {'name': 'Cornish', 'nativeName': 'Kernewek'},
        'co': {'name': 'Corsican', 'nativeName': 'corsu, lingua corsa'},
        'cr': {'name': 'Cree', 'nativeName': 'ᓀᐦᐃᔭᐍᐏᐣ'},
        'hr': {'name': 'Croatian', 'nativeName': 'hrvatski'},
        'cs': {'name': 'Czech', 'nativeName': 'česky, čeština'},
        'da': {'name': 'Danish', 'nativeName': 'dansk'},
        'dv': {'name': 'Divehi; Dhivehi; Maldivian;', 'nativeName': 'ދިވެހި'},
        'nl': {'name': 'Dutch', 'nativeName': 'Nederlands, Vlaams'},
        'en': {'name': 'English', 'nativeName': 'English'},
        'eo': {'name': 'Esperanto', 'nativeName': 'Esperanto'},
        'et': {'name': 'Estonian', 'nativeName': 'eesti, eesti keel'},
        'ee': {'name': 'Ewe', 'nativeName': 'Eʋegbe'},
        'fo': {'name': 'Faroese', 'nativeName': 'føroyskt'},
        'fj': {'name': 'Fijian', 'nativeName': 'vosa Vakaviti'},
        'fi': {'name': 'Finnish', 'nativeName': 'suomi, suomen kieli'},
        'fr': {'name': 'French', 'nativeName': 'français, langue française'},
        'ff': {'name': 'Fula; Fulah; Pulaar; Pular', 'nativeName': 'Fulfulde, Pulaar, Pular'},
        'gl': {'name': 'Galician', 'nativeName': 'Galego'},
        'ka': {'name': 'Georgian', 'nativeName': 'ქართული'},
        'de': {'name': 'German', 'nativeName': 'Deutsch'},
        'el': {'name': 'Greek, Modern', 'nativeName': 'Ελληνικά'},
        'gn': {'name': 'Guaraní', 'nativeName': 'Avañeẽ'},
        'gu': {'name': 'Gujarati', 'nativeName': 'ગુજરાતી'},
        'ht': {'name': 'Haitian; Haitian Creole', 'nativeName': 'Kreyòl ayisyen'},
        'ha': {'name': 'Hausa', 'nativeName': 'Hausa, هَوُسَ'},
        'he': {'name': 'Hebrew (modern)', 'nativeName': 'עברית'},
        'hz': {'name': 'Herero', 'nativeName': 'Otjiherero'},
        'hi': {'name': 'Hindi', 'nativeName': 'हिन्दी, हिंदी'},
        'ho': {'name': 'Hiri Motu', 'nativeName': 'Hiri Motu'},
        'hu': {'name': 'Hungarian', 'nativeName': 'Magyar'},
        'ia': {'name': 'Interlingua', 'nativeName': 'Interlingua'},
        'id': {'name': 'Indonesian', 'nativeName': 'Bahasa Indonesia'},
        'ie': {'name': 'Interlingue', 'nativeName': 'Originally called Occidental; then Interlingue after WWII'},
        'ga': {'name': 'Irish', 'nativeName': 'Gaeilge'},
        'ig': {'name': 'Igbo', 'nativeName': 'Asụsụ Igbo'},
        'ik': {'name': 'Inupiaq', 'nativeName': 'Iñupiaq, Iñupiatun'},
        'io': {'name': 'Ido', 'nativeName': 'Ido'},
        'is': {'name': 'Icelandic', 'nativeName': 'Íslenska'},
        'it': {'name': 'Italian', 'nativeName': 'Italiano'},
        'iu': {'name': 'Inuktitut', 'nativeName': 'ᐃᓄᒃᑎᑐᑦ'},
        'ja': {'name': 'Japanese', 'nativeName': '日本語 (にほんご／にっぽんご)'},
        'jv': {'name': 'Javanese', 'nativeName': 'basa Jawa'},
        'kl': {'name': 'Kalaallisut, Greenlandic', 'nativeName': 'kalaallisut, kalaallit oqaasii'},
        'kn': {'name': 'Kannada', 'nativeName': 'ಕನ್ನಡ'},
        'kr': {'name': 'Kanuri', 'nativeName': 'Kanuri'},
        'ks': {'name': 'Kashmiri', 'nativeName': 'कश्मीरी, كشميري‎'},
        'kk': {'name': 'Kazakh', 'nativeName': 'Қазақ тілі'},
        'km': {'name': 'Khmer', 'nativeName': 'ភាសាខ្មែរ'},
        'ki': {'name': 'Kikuyu, Gikuyu', 'nativeName': 'Gĩkũyũ'},
        'rw': {'name': 'Kinyarwanda', 'nativeName': 'Ikinyarwanda'},
        'ky': {'name': 'Kirghiz, Kyrgyz', 'nativeName': 'кыргыз тили'},
        'kv': {'name': 'Komi', 'nativeName': 'коми кыв'},
        'kg': {'name': 'Kongo', 'nativeName': 'KiKongo'},
        'ko': {'name': 'Korean', 'nativeName': '한국어 (韓國語), 조선말 (朝鮮語)'},
        'ku': {'name': 'Kurdish', 'nativeName': 'Kurdî, كوردی‎'},
        'kj': {'name': 'Kwanyama, Kuanyama', 'nativeName': 'Kuanyama'},
        'la': {'name': 'Latin', 'nativeName': 'latine, lingua latina'},
        'lb': {'name': 'Luxembourgish, Letzeburgesch', 'nativeName': 'Lëtzebuergesch'},
        'lg': {'name': 'Luganda', 'nativeName': 'Luganda'},
        'li': {'name': 'Limburgish, Limburgan, Limburger', 'nativeName': 'Limburgs'},
        'ln': {'name': 'Lingala', 'nativeName': 'Lingála'},
        'lo': {'name': 'Lao', 'nativeName': 'ພາສາລາວ'},
        'lt': {'name': 'Lithuanian', 'nativeName': 'lietuvių kalba'},
        'lu': {'name': 'Luba-Katanga', 'nativeName': ''},
        'lv': {'name': 'Latvian', 'nativeName': 'latviešu valoda'},
        'gv': {'name': 'Manx', 'nativeName': 'Gaelg, Gailck'},
        'mk': {'name': 'Macedonian', 'nativeName': 'македонски јазик'},
        'mg': {'name': 'Malagasy', 'nativeName': 'Malagasy fiteny'},
        'ms': {'name': 'Malay', 'nativeName': 'bahasa Melayu, بهاس ملايو‎'},
        'ml': {'name': 'Malayalam', 'nativeName': 'മലയാളം'},
        'mt': {'name': 'Maltese', 'nativeName': 'Malti'},
        'mi': {'name': 'Māori', 'nativeName': 'te reo Māori'},
        'mr': {'name': 'Marathi (Marāṭhī)', 'nativeName': 'मराठी'},
        'mh': {'name': 'Marshallese', 'nativeName': 'Kajin M̧ajeļ'},
        'mn': {'name': 'Mongolian', 'nativeName': 'монгол'},
        'na': {'name': 'Nauru', 'nativeName': 'Ekakairũ Naoero'},
        'nv': {'name': 'Navajo, Navaho', 'nativeName': 'Diné bizaad, Dinékʼehǰí'},
        'nb': {'name': 'Norwegian Bokmål', 'nativeName': 'Norsk bokmål'},
        'nd': {'name': 'North Ndebele', 'nativeName': 'isiNdebele'},
        'ne': {'name': 'Nepali', 'nativeName': 'नेपाली'},
        'ng': {'name': 'Ndonga', 'nativeName': 'Owambo'},
        'nn': {'name': 'Norwegian Nynorsk', 'nativeName': 'Norsk nynorsk'},
        'no': {'name': 'Norwegian', 'nativeName': 'Norsk'},
        'ii': {'name': 'Nuosu', 'nativeName': 'ꆈꌠ꒿ Nuosuhxop'},
        'nr': {'name': 'South Ndebele', 'nativeName': 'isiNdebele'},
        'oc': {'name': 'Occitan', 'nativeName': 'Occitan'},
        'oj': {'name': 'Ojibwe, Ojibwa', 'nativeName': 'ᐊᓂᔑᓈᐯᒧᐎᓐ'},
        'cu': {'name': 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic', 'nativeName': 'ѩзыкъ словѣньскъ'},
        'om': {'name': 'Oromo', 'nativeName': 'Afaan Oromoo'},
        'or': {'name': 'Oriya', 'nativeName': 'ଓଡ଼ିଆ'},
        'os': {'name': 'Ossetian, Ossetic', 'nativeName': 'ирон æвзаг'},
        'pa': {'name': 'Panjabi, Punjabi', 'nativeName': 'ਪੰਜਾਬੀ, پنجابی‎'},
        'pi': {'name': 'Pāli', 'nativeName': 'पाऴि'},
        'fa': {'name': 'Persian', 'nativeName': 'فارسی'},
        'pl': {'name': 'Polish', 'nativeName': 'polski'},
        'ps': {'name': 'Pashto, Pushto', 'nativeName': 'پښتو'},
        'pt': {'name': 'Portuguese', 'nativeName': 'Português'},
        'qu': {'name': 'Quechua', 'nativeName': 'Runa Simi, Kichwa'},
        'rm': {'name': 'Romansh', 'nativeName': 'rumantsch grischun'},
        'rn': {'name': 'Kirundi', 'nativeName': 'kiRundi'},
        'ro': {'name': 'Romanian, Moldavian, Moldovan', 'nativeName': 'română'},
        'ru': {'name': 'Russian', 'nativeName': 'русский язык'},
        'sa': {'name': 'Sanskrit (Saṁskṛta)', 'nativeName': 'संस्कृतम्'},
        'sc': {'name': 'Sardinian', 'nativeName': 'sardu'},
        'sd': {'name': 'Sindhi', 'nativeName': 'सिन्धी, سنڌي، سندھی‎'},
        'se': {'name': 'Northern Sami', 'nativeName': 'Davvisámegiella'},
        'sm': {'name': 'Samoan', 'nativeName': 'gagana faa Samoa'},
        'sg': {'name': 'Sango', 'nativeName': 'yângâ tî sängö'},
        'sr': {'name': 'Serbian', 'nativeName': 'српски језик'},
        'gd': {'name': 'Scottish Gaelic; Gaelic', 'nativeName': 'Gàidhlig'},
        'sn': {'name': 'Shona', 'nativeName': 'chiShona'},
        'si': {'name': 'Sinhala, Sinhalese', 'nativeName': 'සිංහල'},
        'sk': {'name': 'Slovak', 'nativeName': 'slovenčina'},
        'sl': {'name': 'Slovene', 'nativeName': 'slovenščina'},
        'so': {'name': 'Somali', 'nativeName': 'Soomaaliga, af Soomaali'},
        'st': {'name': 'Southern Sotho', 'nativeName': 'Sesotho'},
        'es': {'name': 'Spanish; Castilian', 'nativeName': 'español, castellano'},
        'su': {'name': 'Sundanese', 'nativeName': 'Basa Sunda'},
        'sw': {'name': 'Swahili', 'nativeName': 'Kiswahili'},
        'ss': {'name': 'Swati', 'nativeName': 'SiSwati'},
        'sv': {'name': 'Swedish', 'nativeName': 'svenska'},
        'ta': {'name': 'Tamil', 'nativeName': 'தமிழ்'},
        'te': {'name': 'Telugu', 'nativeName': 'తెలుగు'},
        'tg': {'name': 'Tajik', 'nativeName': 'тоҷикӣ, toğikī, تاجیکی‎'},
        'th': {'name': 'Thai', 'nativeName': 'ไทย'},
        'ti': {'name': 'Tigrinya', 'nativeName': 'ትግርኛ'},
        'bo': {'name': 'Tibetan Standard, Tibetan, Central', 'nativeName': 'བོད་ཡིག'},
        'tk': {'name': 'Turkmen', 'nativeName': 'Türkmen, Түркмен'},
        'tl': {'name': 'Tagalog', 'nativeName': 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔'},
        'tn': {'name': 'Tswana', 'nativeName': 'Setswana'},
        'to': {'name': 'Tonga (Tonga Islands)', 'nativeName': 'faka Tonga'},
        'tr': {'name': 'Turkish', 'nativeName': 'Türkçe'},
        'ts': {'name': 'Tsonga', 'nativeName': 'Xitsonga'},
        'tt': {'name': 'Tatar', 'nativeName': 'татарча, tatarça, تاتارچا‎'},
        'tw': {'name': 'Twi', 'nativeName': 'Twi'},
        'ty': {'name': 'Tahitian', 'nativeName': 'Reo Tahiti'},
        'ug': {'name': 'Uighur, Uyghur', 'nativeName': 'Uyƣurqə, ئۇيغۇرچە‎'},
        'uk': {'name': 'Ukrainian', 'nativeName': 'українська'},
        'ur': {'name': 'Urdu', 'nativeName': 'اردو'},
        'uz': {'name': 'Uzbek', 'nativeName': 'zbek, Ўзбек, أۇزبېك‎'},
        've': {'name': 'Venda', 'nativeName': 'Tshivenḓa'},
        'vi': {'name': 'Vietnamese', 'nativeName': 'Tiếng Việt'},
        'vo': {'name': 'Volapük', 'nativeName': 'Volapük'},
        'wa': {'name': 'Walloon', 'nativeName': 'Walon'},
        'cy': {'name': 'Welsh', 'nativeName': 'Cymraeg'},
        'wo': {'name': 'Wolof', 'nativeName': 'Wollof'},
        'fy': {'name': 'Western Frisian', 'nativeName': 'Frysk'},
        'xh': {'name': 'Xhosa', 'nativeName': 'isiXhosa'},
        'yi': {'name': 'Yiddish', 'nativeName': 'ייִדיש'},
        'yo': {'name': 'Yoruba', 'nativeName': 'Yorùbá'},
        'za': {'name': 'Zhuang, Chuang', 'nativeName': 'Saɯ cueŋƅ, Saw cuengh'},
    };

    return isoLanguages[lang].name + ' (' + isoLanguages[lang].nativeName + ')';
};

const normalizeVoices = voices => {
    return voices
        .reduce((r, a) => {
            const lang = a.lang.split('-')[0];
            const fullLangName = getFullLangName(lang);

            r[fullLangName] = r[fullLangName] || [];
            r[fullLangName].push(a);

            return r;
        }, {});
};

const setOptionsForVoiceSelector = currentVoice => {
    window.vRPopupSpeech = new SpeechSynthesisUtterance();
    window.speechSynthesis.onvoiceschanged = () => {
        window.vRPopupVoices = window.speechSynthesis.getVoices();
        const normalizedVoicesByLangGroups = normalizeVoices(window.vRPopupVoices);

        Object.entries(normalizedVoicesByLangGroups).forEach(([key, value]) => {
            const optionGroup = document.createElement('optgroup');

            optionGroup.setAttribute('label', key);
            value.forEach(voice => {
                const option = document.createElement('option');

                option.value = voice.name;
                option.innerText = voice.name + '   ( ' + voice.lang + ' )';
                optionGroup.appendChild(option);
                if (currentVoice) {
                    voiceSelector.value = currentVoice;
                }
            });
            voiceSelector.appendChild(optionGroup);
        });
    };
};

const createSpeech = async(text) => {
    const tabId = await getTabId();
    const currentSpeech = {
        text,
        tabId,
        playingIndex: 0,
        playing: false,
    };

    await sendMessageToContent('SET_SPEECH', { currentSpeech });

    return Promise.resolve(currentSpeech);
};

const onResizeText = e => {
    const currentFontSize = getComputedStyle(textContainer).fontSize;
    const numericCurrentFontSize = Number(currentFontSize.replace(/[^0-9]/g, '')) / 20;

    if (e.currentTarget.classList.contains('increase') && numericCurrentFontSize < 3) {
        setTextSize(numericCurrentFontSize + 0.1);
    }
    if (e.currentTarget.classList.contains('decrease') && numericCurrentFontSize > 0.3) {
        setTextSize(numericCurrentFontSize - 0.1);
    }
};

const onPlayPauseBtnClick = async() => {
    const { currentSpeech } = await getStorage('currentSpeech');

    if (playingControlPanel.classList.contains('playing')) {
        sendMessageToContent('PAUSE_SPEECH', { playing: false }, currentSpeech.tabId).then(() => {
            setControlPanelState(false);
        });
    }
    else {
        let tabId = '';

        if (!currentSpeech) {
            const newSpeech = await createSpeech(localSpeech);

            tabId = newSpeech.tabId;
        }
        else {
            tabId = currentSpeech.tabId;
        }

        sendMessageToContent('PLAY_SPEECH', { playing: true }, tabId).then(() => {
            setControlPanelState(true);
        });
    }
};

const onStopBtnClick = async(e, isNeedClose = true) => {
    const { currentSpeech } = await getStorage('currentSpeech');

    currentSpeech?.tabId && sendMessageToContent('CANCEL_SPEECH', { playing: false }, currentSpeech.tabId).then(() => {
        setControlPanelState(false);
        isNeedClose && window.close();
    });
};

const onOpenSettingsPanel = () => {
    settingsPanel.classList.remove('hidden');
    onStopBtnClick(null, false);
};

const onCloseSettingsPanel = () => {
    settingsPanel.classList.add('hidden');
    window.speechSynthesis && window.speechSynthesis.cancel();
};

const onVoiceSelectorChange = e => {
    setStorage('currentVoice', e.currentTarget.value);
    window.speechSynthesis && window.speechSynthesis.cancel();
};

const onSettingChange = e => {
    const { name, value } = e.currentTarget;

    window.speechSynthesis && window.speechSynthesis.cancel();

    if (name === 'speed') {
        setStorage('speedLevel', value);
        inputErrorHandling(value);
    }
    if (name === 'sound') {
        setStorage('soundLevel', value);
    }
    if (name === 'pitch') {
        setStorage('pitchLevel', value);
    }
};

const onCreateTestSpeech = async() => {
    const { currentVoice } = await getStorage('currentVoice');

    const currentLanguage = currentVoice
        ? window.vRPopupVoices.find(voice => voice.name === currentVoice).lang.split('-')[0]
        : 'en';

    window.vRPopupSpeech.lang = currentLanguage;
    window.vRPopupSpeech.voice = window.vRPopupVoices.find(voice => voice.name === currentVoice);
    window.vRPopupSpeech.text = testTexts[currentLanguage];
    window.vRPopupSpeech.rate = Number([...settingsRanges].find(range => range.name === 'speed').value);
    window.vRPopupSpeech.volume = Number([...settingsRanges].find(range => range.name === 'sound').value);
    window.vRPopupSpeech.pitch = Number([...settingsRanges].find(range => range.name === 'pitch').value);
    window.speechSynthesis.speak(window.vRPopupSpeech);
};

const onResetSettings = () => {
    window.speechSynthesis && window.speechSynthesis.cancel();
    setStorage('speedLevel', 1);
    setStorage('soundLevel', 1);
    setStorage('pitchLevel', 1);
    settingsRanges.forEach(range => range.value = 1);
    inputErrorHandling(1);
};

const onSectionChange = async(e) => {
    const { currentSpeech } = await getStorage('currentSpeech');
    const { value } = e.target.dataset;

    if (currentSpeech) {
        // eslint-disable-next-line no-nested-ternary
        const action = value === 'next'
            ? 'INCREASE_PLAYING_INDEX'
            : value === 'prev' ? 'DECREASE_PLAYING_INDEX' : null;

        action && sendMessageToContent(action, null, currentSpeech.tabId).then(() => {});
    }
};

const initListeners = () => {
    textResizeButtons.forEach(btn => btn.addEventListener('click', onResizeText, false));
    settingsRanges.forEach(inputRange => inputRange.addEventListener('mouseup', onSettingChange, false));
    changeSectionButtons.forEach(sectionButton => sectionButton.addEventListener('click', onSectionChange, false));

    openSettingsBtn.addEventListener('click', onOpenSettingsPanel, false);
    closeSettingsBtn.addEventListener('click', onCloseSettingsPanel, false);
    playSpeechBtn.addEventListener('click', onPlayPauseBtnClick, false);
    stopSpeechBtn.addEventListener('click', onStopBtnClick, false);
    voiceSelector.addEventListener('change', onVoiceSelectorChange);
    testBtn.addEventListener('click', onCreateTestSpeech, false);
    resetBtn.addEventListener('click', onResetSettings, false);
};

const storageChangeListener = () => {
    brows.storage.onChanged.addListener( changes => {
        for (const [key, values] of Object.entries(changes)) {
            if (key === 'currentSpeech') {
                if (!values.newValue) {
                    setControlPanelState(false);
                    renderPopupWithStorageData();
                }
                else {
                    setControlPanelState(values.newValue.playing);
                }
            }
            if (key === 'currentPlayingIndex') {
                setAnotherActivePartOfText(values.newValue);
            }
        }
    });
};

const checkDomain = () => {
    return new Promise(resolve => {
        getTabURL().then(currentUrl => {
            if (!/(http(s?)):\/\//i.test(currentUrl)) {
                textPanel.classList.add('error');
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
};

const inputErrorHandling = value => {
    value > 1.2
        ? speedError.classList.remove('hidden')
        : speedError.classList.add('hidden');
};

const fillTextContainer = (text, playingIndex) => {
    let activeTextElem = null;

    textContainer.innerHTML = '';
    text.forEach((paragraph, index) => {
        const newTextItem = document.createElement('span');
        const separator = document.createElement('div');

        if (playingIndex === index) {
            newTextItem.classList.add('active');
            activeTextElem = newTextItem;
        }
        newTextItem.innerText = paragraph;
        textContainer.appendChild(newTextItem);
        textContainer.appendChild(separator);
    });
    activeTextElem && activeTextElem.scrollIntoView({block: 'start', behavior: 'smooth'});
};

const getText = async() => {
    const tabId = await getTabId();
    const { currentSpeech } = await getStorage('currentSpeech');

    if (currentSpeech?.text) {
        fillTextContainer(currentSpeech.text, currentSpeech.playingIndex);
    }
    else {
        brows.tabs.sendMessage(tabId, { action: 'GET_TEXT'}, response => {
            if (!response || response.length === 0) {
                textPanel.classList.add('no-text');
            }
            else {
                localSpeech = response;
                fillTextContainer(response, 0);
            }
        });
    }
};

const renderPopupWithStorageData = async() => {
    const isTabFit = await checkDomain();
    const { fontSize, currentSpeech, speedLevel, soundLevel, pitchLevel, currentVoice } = await getStorage();

    if (!isTabFit && !currentSpeech) {
        return;
    }

    await getText();
    fontSize && setTextSize(fontSize);
    currentSpeech && setControlPanelState(currentSpeech.playing);
    setRangeValues(speedLevel, soundLevel, pitchLevel);
    setOptionsForVoiceSelector(currentVoice);
};

const init = async() => {
    await renderPopupWithStorageData();
    initListeners();
    storageChangeListener();
};

init();
