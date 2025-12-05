// eslint-disable-next-line no-undef
if (!window.vRContInited) {
    window.vRContInited = 1;
    // eslint-disable-next-line no-undef
    const brows = chrome;
    let selectedText = '';

    const sendMessageToBackground = (action, data, tabId = null) => {
        return new Promise(resolve => {
            const requestData = { action, data };

            brows.runtime.sendMessage({ action, tabId, data: requestData }, () => resolve());
        });
    };

    const getTabId = () => {
        return new Promise(resolve => {
            brows.runtime.sendMessage({ action: 'GET_TAB_ID' }, tabId => {
                return resolve(tabId);
            });
        });
    };

    const getStorage = (...params) => {
        const storageKeys = params.length === 0
            ? ['userId', 'speechId', 'fontSize', 'currentSpeech', 'speedLevel', 'soundLevel', 'pitchLevel', 'currentVoice', 'currentPlayingIndex']
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

    // eslint-disable-next-line no-inner-declarations
    function debounceDelay(func, delay, maxDelay) {
        let timeoutId = null;
        let lastTime = Date.now();

        return function() {
            const args = arguments;

            if ( timeoutId ) {
                clearTimeout(timeoutId);
            }
            if ( Date.now() - lastTime > maxDelay ) {
                lastTime = Date.now();
                func.apply(func, args);
            }
            else {
                timeoutId = setTimeout(() => {
                    func.apply(func, args);
                }, delay);
            }
        };
    }

    const createSpeech = async(text) => {
        if (!text || text.length === 0) {
            return;
        }
        const currentSpeech = {
            text,
            tabId: null,
            playingIndex: 0,
            playing: false,
        };

        await sendMessageToBackground('SET_SPEECH', { currentSpeech });

        return Promise.resolve(currentSpeech);
    };

    const removeControlPopup = () => {
        const popup = document.querySelector('.vRControlPanel');

        popup && popup.remove();
    };

    const setStateToPlayPauseBtn = isPlaying => {
        const popup = document.querySelector('.vRControlPanel');

        if (popup) {
            const playPauseBtn = popup.querySelector('.vr-play-pause-btn-in-control-popup');

            if (isPlaying) {
                playPauseBtn.style.backgroundImage = 'url("' + brows.runtime.getURL('../assets/pause_btn.png') + '")';
                playPauseBtn.classList.add('playing');
            }
            else {
                playPauseBtn.style.backgroundImage = 'url("' + brows.runtime.getURL('../assets/play_btn.png') + '")';
                playPauseBtn.classList.remove('playing');
            }
        }
    };

    const onPlayPauseBthClick = async(e) => {
        const tabId = await getTabId();

        document.removeEventListener('click', onControlPanelClick, false);
        brows.storage.local.get('currentSpeech', async({currentSpeech}) => {
            if (e.target.classList.contains('playing')) {
                sendMessageToBackground('PAUSE_SPEECH', { playing: false }).then(() => {
                    setStateToPlayPauseBtn(false);
                });
            }
            else {
                if (!currentSpeech || currentSpeech.tabId !== tabId) {
                    await createSpeech(selectedText);
                }
                setTimeout(() => {
                    sendMessageToBackground('PLAY_SPEECH', { playing: true }).then(() => {
                        setStateToPlayPauseBtn(true);
                    });
                }, 500);
            }
        });
    };

    const onStopBthClick = e => {
        document.removeEventListener('click', onControlPanelClick, false);
        sendMessageToBackground('CANCEL_SPEECH', { playing: false }).then(() => {
            e.target.parentNode.remove();
        });
    };

    const onControlPanelClick = e => {
        const controlPanel = document.querySelector('.vRControlPanel');

        if (controlPanel === e.target || (e.target?.parentNode === controlPanel)) {
            document.removeEventListener('click', onControlPanelClick, false);
        }
        else {
            document.removeEventListener('click', onControlPanelClick, false);
            controlPanel && controlPanel.remove();
        }
    };

    const createControlPanel = () => {
        if (document.querySelector('.vRControlPanel')) {
            return;
        }
        const wrapper = document.createElement('div');
        const closeBtn = document.createElement('div');
        const logo = document.createElement('div');
        const title = document.createElement('div');
        const playPauseBtn = document.createElement('div');
        const stopBtn = document.createElement('div');

        wrapper.classList.add('vRControlPanel');
        playPauseBtn.classList.add('vr-play-pause-btn-in-control-popup');
        wrapper.setAttribute('style', 'position: fixed;width: 150px;height:114px;left:0;bottom:0;background: #2C2C2C;border: 1px solid #FFFFFF;box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);border-radius: 10px;z-index: 2147483645');
        closeBtn.setAttribute('style', 'width: 14px;position: absolute;top: 9px;right: 9px;height: 14px;background-position: center center;background-repeat: no-repeat; cursor:pointer;background-size: cover;');
        logo.setAttribute('style', 'width: 21px;background-size: cover;position: absolute;top: 9px;left: 9px;height: 14px;background-position: center center;background-repeat: no-repeat;');
        title.setAttribute('style', 'width: 100%;font-family: "Helvetica", sans-serif;font-style: normal;font-weight: 700;font-size: 18px;line-height: 21px;display: flex;align-items: center;text-align: center;color: #FFFFFF; margin-top:31px; justify-content: center;');
        playPauseBtn.setAttribute('style', 'width: 42px;position: absolute;bottom: 12px;left:28px;height: 42px;background-position: center center;background-repeat: no-repeat; cursor:pointer;background-size: cover;');
        stopBtn.setAttribute('style', 'width: 42px;position: absolute;bottom: 12px;right:30px;height: 42px;background-position: center center;background-repeat: no-repeat; cursor:pointer;background-size: cover;');
        closeBtn.style.backgroundImage = 'url("' + brows.runtime.getURL('../assets/close_white.png') + '")';
        logo.style.backgroundImage = 'url("' + brows.runtime.getURL('../assets/icon_24.png') + '")';
        stopBtn.style.backgroundImage = 'url("' + brows.runtime.getURL('../assets/stop_btn.png') + '")';
        title.innerText = 'Read the text';
        wrapper.appendChild(closeBtn);
        wrapper.appendChild(logo);
        wrapper.appendChild(title);
        wrapper.appendChild(playPauseBtn);
        wrapper.appendChild(stopBtn);
        closeBtn.addEventListener('click', () => {
            document.removeEventListener('click', onControlPanelClick, false);
            wrapper.remove();
        }, false);
        playPauseBtn.addEventListener('click', onPlayPauseBthClick, false);
        stopBtn.addEventListener('click', onStopBthClick, false);
        document.body.appendChild(wrapper);
        setStateToPlayPauseBtn(false);
        document.addEventListener('click', onControlPanelClick, false);
    };
    
    const initSpeech = () => {
        if (!document.head || !document.head.appendChild) {
            return setTimeout(initSpeech, 100);
        }
    
        const speech = document.createElement('script');
    
        speech.setAttribute('src', brows.runtime.getURL('js/speech-initializer.js'));
        document.head.appendChild(speech);
    };

    const onSmallIconClick = e => {
        const smallButtonToClick = document.querySelector('.vRSmallIconSelectedText');

        if (e?.target === smallButtonToClick) {
            document.removeEventListener('click', onSmallIconClick, false);
            smallButtonToClick.remove();
            createControlPanel();
        }
        else {
            document.removeEventListener('click', onSmallIconClick, false);
            smallButtonToClick.remove();
        }
    };

    const playingAbility = (tabId, currentSpeech) => {
        return !document.body.querySelector('.vRSmallIconSelectedText')
            && !document.body.querySelector('.vr-play-pause-btn-in-control-popup')
            && tabId !== currentSpeech?.tabId;
    };

    const createClickIcon = async({width, left, bottom, top }) => {
        const tabId = await getTabId();
        const { currentSpeech } = await getStorage('currentSpeech');

        if (playingAbility(tabId, currentSpeech)) {
            const myImage = document.createElement('img');

            myImage.classList.add('vRSmallIconSelectedText');
            myImage.src = brows.runtime.getURL('../assets/click_icon.png');
            myImage.style.width = '24px';
            myImage.style.height = '24px';
            myImage.style.position = 'fixed';
            myImage.style.zIndex = '2147483645';
            myImage.style.cursor = 'pointer';
            myImage.style.top = window.innerHeight < bottom ? top - 30 + 'px' : bottom + 10 + 'px';
            myImage.style.left = left + (width / 2) + 'px';
            document.body.appendChild(myImage);
            document.addEventListener('click', onSmallIconClick, false);
        }
    };

    const parseSelectedText = controlMode => {
        const paragraphSplitter = /(?:\s*\r?\n\s*){2,}/;
        const selection = window.getSelection();
        const newSelectedText = document.getSelection().toString();

        if (newSelectedText) {
            const selectedRect = selection.getRangeAt(0).getBoundingClientRect();

            controlMode ? createControlPanel() : createClickIcon(selectedRect);
            selectedText = newSelectedText.split(paragraphSplitter);
        }
    };

    const storageChangeListener = () => {
        window.self === window.top && brows.storage.onChanged.addListener( changes => {
            for (const [key, values] of Object.entries(changes)) {
                if (key === 'currentSpeech') {
                    if (!values.newValue) {
                        removeControlPopup();
                    }
                    else {
                        setStateToPlayPauseBtn(values.newValue.playing);
                    }
                }
            }
        });
    };

    const getSelectedText = () => {
        if (window.getSelection) {
            return window.getSelection().toString();
        }
        else if (document.selection) {
            return document.selection.createRange().text;
        }

        return '';
    };

    const mouseUpHandler = () => {
        const selectedText = getSelectedText();

        if (selectedText) {
            parseSelectedText();
        }
    };

    const keyPressHandler = (e) => {
        if (e.metaKey || e.ctrlKey) {
            if (e.keyCode === 65) {
                setTimeout( () => parseSelectedText(true), 100);
            }
        }
    };

    document.addEventListener('keydown', keyPressHandler, false);
    document.addEventListener('mouseup', mouseUpHandler);

    storageChangeListener();

    if (window.self === window.top) {
        /* eslint-disable no-invalid-this */
        const paragraphSplitter = /(?:\s*\r?\n\s*){2,}/;

        const isVisible = el => {
            const style = window.getComputedStyle(el);
            const params = el.getBoundingClientRect();

            return style.width !== '0' &&
                style.height !== '0' &&
                style.opacity !== '0' &&
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                params.left >= 0 &&
                params.width > 1 &&
                params.height > 1;
        };

        const $ = node => {
            if (!node) {
                return null;
            }
            const el = node ? node : document.querySelector(node);

            if (!el) {
                return null;
            }
            el.is = function(selectors) {
                const isTagNameCorresponds = selector => el && el.tagName && el.tagName.toString().toLowerCase() === selector.toString().toLowerCase();

                if (selectors && selectors.includes(':visible')) {
                    const isNeedCheckTagName = selectors.split(':visible')[0];

                    return isNeedCheckTagName
                        ? isTagNameCorresponds(isNeedCheckTagName) && isVisible(el)
                        : isVisible(el);
                }

                return selectors
                    .split(',')
                    .some(selector => isTagNameCorresponds(selector.trim()));
            };

            el.getChildren = function(selector) {
                if (!el || !el.children || el.children.length === 0) {
                    return [];
                }

                const filterChildNode = (child, rule) => {
                    if (rule === ':visible') {
                        return isVisible(child);
                    }
                    else if (rule) {
                        const selectorsArray = rule.split(',').map(selector => selector.trim());

                        return !selectorsArray.some(selector => selector.toLowerCase() === child.tagName.toLowerCase());
                    }

                    return child.nodeType === 1;
                };

                return [...el.children].filter(child => filterChildNode(child, selector));
            };

            el.css = function(prop) {
                return getComputedStyle(el)[prop];
            };

            return el;
        };

        const getInnerText = elem => {
            const text = elem.innerText;

            return text ? text.trim() : '';
        };

        const readDoc = new function() {
            const self = this;

            this.ignoreTags = 'select, textarea, button, label, audio, video, dialog, embed, menu, nav, noframes, noscript, object, script, style, svg, aside, footer, #footer';

            this.getCurrentIndex = function() {
                return 0;
            };

            this.getTexts = function(index, elementParent) {
                if (index === 0) { return parseText(elementParent); }

                return null;
            };

            function parseText(elementParent) {
                let texts = null;
                let dist = null;
                let textBlocks = findTextTags(100, elementParent);
                const countChars = textBlocks.reduce(function(sum, elem) { return sum + getInnerText(elem).length; }, 0);

                if (countChars < 1000) {
                    textBlocks = findTextTags(3);
                    texts = textBlocks.map(getInnerText);

                    let head = null;
                    let tail = null;

                    for (let i = 3; i < texts.length && !head; i++) {
                        dist = getGaussian(texts, 0, i);

                        if (texts[i].length > dist.mean + 2*dist.stdev) { head = i; }
                    }
                    for (let i = texts.length - 4; i >= 0 && !tail; i--) {
                        dist = getGaussian(texts, i + 1, texts.length);

                        if (texts[i].length > dist.mean + 2*dist.stdev) { tail = i+1; }
                    }
                    if (head || tail) {
                        textBlocks = textBlocks.slice(head || 0, tail);
                    }
                }

                const toRead = [];

                for (let i = 0; i<textBlocks.length; i++) {
                    toRead.push.apply(toRead, findHeadingsFor(textBlocks[i], textBlocks[i-1]));
                    toRead.push(textBlocks[i]);
                }

                texts = toRead.map(getTexts);

                return flatten(texts)
                    .map(text => text.replaceAll('\n', '').replaceAll('\t', '').replaceAll('­', ''))
                    .filter(text => text);
            }

            function findTextTags(threshold, elementParent) {
                const textBlocks = [];
                const skipTags = 'h1, h2, h3, h4, h5, h6, p, a, ' + self.ignoreTags;
                const isText = function(node) {
                    return node.nodeType === 3 && node.nodeValue.trim().length >= 3;
                };
                const isParagraph = function(node) {
                    return node.nodeType === 1 && $(node).is('p:visible') && getInnerText(node).length >= threshold;
                };
                const hasText = function(elem) {
                    return someChildNodes(elem, isText) && getInnerText(elem).length >= threshold;
                };
                const hasParagraphs = function(elem) {
                    return someChildNodes(elem, isParagraph);
                };
                const containsText = function(elem) {
                    const childElems = $(elem).getChildren(skipTags);

                    return childElems.some(hasText) || childElems.some(hasParagraphs) || childElems.some(containsText);
                };
                const inProcess = function(elem, multi) {
                    if (multi) { $(elem).setAttribute('vr-multi-block', ''); }
                    textBlocks.push(elem);
                };

                function searchTextElements(el) {
                    if (!el) {
                        return;
                    }
                    if ($(el).is('frame, iframe')) {
                        try { searchTextElements.call(el.contentDocument.body); }
                        catch (err) {}
                    }
                    else if ($(el).is('dl')) { inProcess(el); }
                    else if ($(el).is('ol, ul')) {
                        const items = $(el).getChildren();

                        if (items.some(hasText)) { inProcess(el); }
                        else if (items.some(hasParagraphs)) { inProcess(el, true); }
                        else if (items.some(containsText)) { inProcess(el, true); }
                    }
                    else if ($(el).is('tbody')) {
                        const rows = $(el).getChildren();

                        if (rows.length > 3 || $(rows[0]).getChildren().length > 3) {
                            if (rows.some(containsText)) { inProcess(el, true); }
                        }
                        else { rows.forEach(searchTextElements); }
                    }
                    else {
                        if (hasText(el)) {
                            inProcess(el);
                        }
                        else if (hasParagraphs(el)) {
                            inProcess(el, true);
                        }
                        else {
                            const cldrns = $(el).getChildren(skipTags);

                            cldrns.forEach(el => searchTextElements(el));
                        }
                    }
                }

                searchTextElements(elementParent);

                return textBlocks.filter(function(elem) {
                    return $(elem).is(':visible') && $(elem).getBoundingClientRect().left >= 0;
                });
            }

            function getGaussian(texts, start, end) {
                if (!start) { start = 0; }
                if (!end) { end = texts.length; }
                let sum = 0;

                for (let i = start; i<end; i++) { sum += texts[i].length; }
                const mean = sum / (end-start);
                let variance = 0;

                for (let i = start; i<end; i++) { variance += (texts[i].length-mean)*(texts[i].length-mean); }

                return {mean: mean, stdev: Math.sqrt(variance)};
            }

            function getTexts(elem) {
                const texts = $(elem).getAttribute('vr-multi-block')
                    ? $(elem).getChildren(':visible').map(getText)
                    : getText(elem).split(paragraphSplitter);

                return texts;
            }

            function getText(elem) {
                return addMissingPunctuation(elem.innerText).trim();
            }

            function addMissingPunctuation(text) {
                return text.replace(/(\w)(\s*?\r?\n)/g, '$1.$2');
            }

            function findHeadingsFor(block, prevBlock) {
                const result = [];
                const firstInnerElem = [...$(block).querySelectorAll('h1, h2, h3, h4, h5, h6, p')].find(el => isVisible(el));
                let currentLevel = getHeadingLevel(firstInnerElem);
                let node = previousNode(block, true);

                while (node && node !== prevBlock) {
                    const ignore = $(node).is(self.ignoreTags);

                    if (!ignore && node.nodeType === 1 && $(node).is(':visible')) {
                        const level = getHeadingLevel(node);

                        if (level < currentLevel) {
                            result.push(node);
                            currentLevel = level;
                        }
                    }
                    node = previousNode(node, ignore);
                }

                return result.reverse();
            }

            function getHeadingLevel(elem) {
                const matches = elem && /^H(\d)$/i.exec(elem.tagName);

                return matches ? Number(matches[1]) : 100;
            }

            function previousNode(node, skipChildren) {
                if (!node.tagName || node.tagName === 'BODY') { return null; }
                if (node.nodeType === 1 && !skipChildren && node.lastChild) { return node.lastChild; }
                if (node.previousSibling) { return node.previousSibling; }

                return previousNode(node.parentNode, true);
            }

            function someChildNodes(elem, test) {
                let child = elem.firstChild;

                while (child) {
                    if (test(child)) { return true; }
                    child = child.nextSibling;
                }

                return false;
            }

            function flatten(array) {
                return [].concat.apply([], array);
            }
        };

        const getHeadlineText = headlineTag => {
            if (headlineTag.tagName === 'META') {
                return headlineTag.getAttribute('content');
            }

            return headlineTag.textContent;
        };

        const parseTextFromArticle = article => {
            return readDoc.getTexts(0, article);
        };

        const getContentTextBySchema = () => {
            const headlineTag = document.querySelector('[itemprop="headline"]');
            const articleBodyTag = document.querySelector('[itemprop="articleBody"]');

            if (!headlineTag && !articleBodyTag) { return null; }

            return [
                getHeadlineText(headlineTag),
                ...parseTextFromArticle(articleBodyTag),
            ];
        };

        const getLocalResourceBtn = (additionalBtnStyles, additionalLogoStyles, additionalTextStyles, isTransparent = false) => {
            const btn = document.createElement('div');
            const logo = document.createElement('img');
            const text = document.createElement('span');

            if (isTransparent) {
                btn.setAttribute('style', 'max-width: 180px;height:44px;display:flex; align-items:center; justify-content: center;cursor:pointer;' + additionalBtnStyles);
                logo.setAttribute('style', 'height:30px; width: 30px; margin-right:10px;' + additionalLogoStyles);
                text.setAttribute('style', 'font-family: "Helvetica";font-style: normal;font-weight: 700;font-size: 20px;line-height: 23px;color: #65676B;white-space:nowrap; overflow: hidden; text-overflow: ellipsis;' + additionalTextStyles);
            }
            else {
                btn.setAttribute('style', 'max-width: 272px;height:44px;background: #0772FF;border: 1px solid #969696;border-radius: 8px;display:flex; align-items:center; justify-content: center;cursor:pointer;' + additionalBtnStyles);
                logo.setAttribute('style', 'height:30px; width: 30px; margin-right:10px;' + additionalLogoStyles);
                text.setAttribute('style', 'font-family: "Helvetica";font-style: normal;font-weight: 700;font-size: 20px;line-height: 23px;color: #FFFFFF;white-space:nowrap; overflow: hidden; text-overflow: ellipsis;' + additionalTextStyles);
            }

            text.innerText = 'Listen to text';
            btn.classList.add('vr-large-btn-for-listening');

            logo.setAttribute('src', brows.runtime.getURL('../assets/icon_24.png'));
            btn.appendChild(logo);
            btn.appendChild(text);

            btn.addEventListener('mouseover', () => {
                isTransparent ? text.style.color = '#000000' : btn.style.background = '#005FDD';
            }, false);

            btn.addEventListener('mouseleave', () => {
                isTransparent ? text.style.color = '#65676B' : btn.style.background = '#0772FF';
            }, false);

            return btn;
        };

        const parseGmailLetter = () => {
            const letter = document.querySelector('[role="main"] table');

            if (!letter) { return null; }

            const heading = letter.querySelector('h2');
            const content = letter.querySelector('[role="main"] table [jslog]:not([role])');

            if (!heading && !content) { return null; }

            return [
                heading.textContent,
                ...content.textContent.split(paragraphSplitter),
            ].filter(text => text);
        };

        const parseGoogleDoc = () => {
            let text = [];

            [...document.querySelectorAll('script')]
                .filter(script => script?.innerText?.includes('DOCS_modelChunk ='))
                .forEach(scriptContent => {
                    const innerText = scriptContent?.innerText;

                    if (innerText && innerText?.length > 100) {
                        const clearedFromStart = innerText.replace('DOCS_modelChunk = ', '');
                        const clearedArray = clearedFromStart.substring(0, clearedFromStart.indexOf('; DOCS_modelChunkLoadStart'));

                        try {
                            const parsedText = JSON.parse(clearedArray);
                            const partOfResult = parsedText[0]?.s?.split(/\n/);
                            const clearedAtdTrimedResult = partOfResult.map(text => text.replace(/\\u([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])/g, ' ').trim());
                            const finalResult = clearedAtdTrimedResult.filter(text => text);

                            text = [...text, ...finalResult];
                        }
                        catch (e) {
                            void e;
                        }
                    }
                });

            return text;
        };

        const sourceForCNN = () => {
            const onCnnListenBtnClick = async e => {
                e.stopPropagation();
                const tabId = await getTabId();
                const { currentSpeech } = await getStorage('currentSpeech');

                if (currentSpeech?.tabId === tabId) {
                    return;
                }
                const text = getContentTextBySchema();

                selectedText = text;
                createControlPanel();
            };

            const insertListenBtnToCnn = () => {
                const btnParent = document.querySelector('article .metadata');
                const btn = getLocalResourceBtn('margin-top: 10px;margin-left: 10px;', '', '', false);

                btn.addEventListener('click', onCnnListenBtnClick, false);

                btnParent && btnParent.insertAdjacentElement('afterend', btn);
            };

            insertListenBtnToCnn();
        };

        const sourceForGmail = () => {
            let previousHref = null;
            const onGmailListenBtnClick = async e => {
                e.stopPropagation();
                const tabId = await getTabId();
                const { currentSpeech } = await getStorage('currentSpeech');

                if (currentSpeech?.tabId === tabId) {
                    return;
                }

                const text = parseGmailLetter();

                if (!text || text.length === 0) {
                    return;
                }
                selectedText = text;
                createControlPanel();
            };

            const insertListenBtnToGmail = () => {
                const btnParent = document.querySelector('[gh="mtb"]');

                if (!btnParent) {
                    return;
                }
                const btn = getLocalResourceBtn('padding: 0 10px;height: 36px;max-width: 223px; width: 223px; z-index: 1;display: grid; margin-right: auto; grid-auto-flow: column;', 'height: 24px; width: 24px;', 'font-size: 17px; line-height: 20px;', false);

                btn.addEventListener('click', onGmailListenBtnClick, false);
                btnParent.style.marginRight = '0';
                btnParent.insertAdjacentElement('afterend', btn);
                previousHref = document.location.href;
            };

            const gmailHandler = () => {
                const { hash, origin, pathname } = document.location;
                const availablePath = origin.includes('mail.google.com') && /[^#]+[/w]+(?=.*[a-z])(?=.*[A-Z])/.test(hash) && /^\/[^/]+\/[^/]+\/[^/]+\//.test(pathname);
                const ourBtn = document.querySelector('.vr-large-btn-for-listening');

                if (previousHref !== document.location.href && availablePath && !ourBtn) {
                    insertListenBtnToGmail();
                }
            };

            const initGmailObserver = () => {
                const target = document.body;
                const options = { childList: true, subtree: true };
                const observer = new MutationObserver(debounceDelay(gmailHandler, 200, 300));

                observer.observe(target, options);
            };

            initGmailObserver();
        };

        const sourceForFacebook = () => {
            const parseTextFromTextNode = textNode => {
                return textNode
                    ? textNode.textContent
                        .replace(/#\S+/g, '')
                        .trim()
                        .split(paragraphSplitter)
                        .filter(text => text)
                    : [];
            };

            const onFacebookListenBtnClick = async(e, textNode) => {
                e.stopPropagation();
                const tabId = await getTabId();
                const { currentSpeech } = await getStorage('currentSpeech');

                if (currentSpeech?.tabId === tabId) {
                    return;
                }

                const text = parseTextFromTextNode(textNode);

                if (!text || text.length === 0) {
                    return;
                }
                selectedText = text;
                createControlPanel();
            };

            const appendListeningBtnInArticle = article => {
                const btnParent = article.querySelector('h4, h3, h2')?.parentNode?.parentNode?.parentNode?.parentNode;
                const messageInArticle = article.querySelector('[data-ad-preview="message"], blockquote');
                const possibleText = parseTextFromTextNode(messageInArticle);

                if (!btnParent || !messageInArticle || !possibleText || possibleText.length === 0) {
                    article.setAttribute('data-vr-skip', '');

                    return;
                }

                const btn = getLocalResourceBtn('height: 36px; padding: 0 10px;', 'width: 21px; margin-right: 7px; height: 21px;', 'font-size: 14px;line-height: 16px;', true);

                btn.addEventListener('click', e => onFacebookListenBtnClick(e, messageInArticle), false);
                btnParent.insertAdjacentElement('afterend', btn);
            };

            const facebookHandler = () => {
                const articles = document.querySelectorAll('[role="article"][aria-describedby]:not([data-vr-skip])');

                articles.forEach(article => {
                    if (!article.querySelector('.vr-large-btn-for-listening')) {
                        appendListeningBtnInArticle(article);
                    }
                });
            };

            const initFacebookObserver = () => {
                const target = document.body;
                const options = { childList: true, subtree: true };
                const observer = new MutationObserver(debounceDelay(facebookHandler, 1000, 1500));

                observer.observe(target, options);
            };

            initFacebookObserver();
        };

        const sourceForGoogleDoc = () => {
            const onGoogleDocListenBtnClick = async e => {
                e.stopPropagation();
                const tabId = await getTabId();
                const { currentSpeech } = await getStorage('currentSpeech');

                if (currentSpeech?.tabId === tabId) {
                    return;
                }
                const text = parseGoogleDoc();

                selectedText = text;
                createControlPanel();
            };


            const insertListenBtnForGoogleDoc = () => {
                const { origin, pathname } = document.location;

                if (origin.includes('docs.google.com') && pathname.includes('/document/')) {
                    const btnParent = document.querySelector('.docs-titlebar-badges');
                    const btn = getLocalResourceBtn('width: 141px;height: 26px;display: inline-flex;', 'width:18px; height:18px;margin-right: 8px;', 'font-size: 12px; line-height: 14px;', false);

                    btn.addEventListener('click', onGoogleDocListenBtnClick, false);
                    btnParent && btnParent.insertAdjacentElement('beforeend', btn);
                }
            };

            insertListenBtnForGoogleDoc();
        };

        const checkResource = () => {
            const { origin, pathname } = document.location;

            if (origin.includes('cnn.com') && /^\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/[^/]+[index.html$]/.test(pathname) ) {
                sourceForCNN();
            }
            if (origin.includes('mail.google.com')) {
                sourceForGmail();
            }
            if (origin.includes('facebook.com')) {
                sourceForFacebook();
            }
            if (origin.includes('docs.google.com')) {
                sourceForGoogleDoc();
            }
        };

        const initMessageListeners = () => {
            brows.runtime.onMessage.addListener((request, sender, sendResponse) => {
                if (request?.action === 'GET_TEXT') {
                    const { hash, origin, pathname } = document.location;

                    if (origin.includes('mail.google.com') && /[^#]+[/w]+(?=.*[a-z])(?=.*[A-Z])/.test(hash) && /^\/[^/]+\/[^/]+\/[^/]+\//.test(pathname)) {
                        const text = parseGmailLetter();

                        if (!text || text.length === 0) {
                            sendResponse(null);
                        }
                        selectedText = text;
                        sendResponse(text);
                    }
                    else if (origin.includes('docs.google.com') && pathname.includes('/document/')) {
                        const text = parseGoogleDoc();

                        if (!text || text.length === 0) {
                            sendResponse(null);
                        }
                        selectedText = text;
                        sendResponse(text);
                    }
                    else {
                        const text = getContentTextBySchema();

                        selectedText = text;
                        sendResponse(text);
                    }
                }
                if (request?.action === 'GOT_CONFIG') {
                    window.postMessage({ voice: 1, key: request.content, handler: request.handler}, '*');
                }

                return true;
            });
            window.addEventListener('message', e => {
                if (e?.data?.speechId) {
                    if (e.data.action === 'getSpeechId') {
                        getStorage('speechId').then(({ speechId }) => {
                            speechId
                                ? e.source.postMessage({ speech: speechId}, '*')
                                : brows.runtime.sendMessage({ action: 'CREATE_SPEECH_ID' }).then(() => {});
                        });
                    }
                }

                if (e?.data?.voiceId) {
                    const { options: { action, key, value, handler} } = e.data;

                    if (action === 'setVoice') {
                        setStorage(key, value);
                    }
                    if (action === 'getVoice') {
                        getStorage(key).then(response => {
                            e.source.postMessage({ voice: 1, key: response[key], handler}, '*');
                        });
                    }
                    if (action === 'getConfig') {
                        brows.runtime.sendMessage({ action: 'GET_CONFIG', endpoint: e.data.options.endpoint, handler: handler ,options: e.data.options.options })
                    }
                }
            });
        };

        checkResource();
        initMessageListeners();
    }
    
    initSpeech();
}
