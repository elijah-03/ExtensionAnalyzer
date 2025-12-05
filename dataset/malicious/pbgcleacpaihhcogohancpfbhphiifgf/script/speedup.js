(() => {
    if (window.self.location.host === 'www.youtube.com') {
        const searchAd = () => {
            const callback = Date.now().toString(36) + Math.random().toString(36).substring(2);

            const skipAds = (playerElement) => {
                const skipButton = playerElement.querySelector(".ytp-ad-skip-button-modern.ytp-button");
                skipButton && skipButton.click()
            }

            const setPlaybackOptions = (videoElement, isAdShowing) => {
                const video = videoElement.querySelector("video");
                video && isAdShowing && (video.playbackRate = 16, video.muted = !0)
            }

            const handleMutation = (mutations, s, query) => {
                for (const mutation of mutations) {

                    if (mutation.type === "attributes" && mutation.attributeName === "class") {
                        const target = mutation.target;
                        let isAdShowing;
                        query.forEach((item) => {
                            if (target.classList.contains(item)) {
                                isAdShowing = true;
                            }
                        })
                        setPlaybackOptions(target, isAdShowing);
                    }
                    "childList" === mutation.type && mutation.addedNodes.length && skipAds(mutation.target)

                }
            }

            window.addEventListener('message', function getData(event) {
                if (event && event.data.message === callback) {
                    (() => {
                        const query = event.data.info.adQuery[0].config ? event.data.info.adQuery[0].config : ["ad-showing", "ad-interrupting"];
                        const observer = new MutationObserver((mut, mutInstance) => {
                            const player = document.querySelector("#movie_player");
                            if (player) {
                                new MutationObserver((mutations, s) => handleMutation(mutations, s, query)).observe(player, {
                                    attributes: !0,
                                    childList: !0,
                                    subtree: !0
                                });
                                let isAdShowing;
                                query.forEach((item) => {
                                    if (player.classList.contains(item)) {
                                        isAdShowing = true;
                                    }
                                })
                                setPlaybackOptions(player, isAdShowing), skipAds(player);
                                observer.disconnect();
                            }
                        });

                        observer.observe(document, { childList: true, subtree: true })
                    })()

                    window.removeEventListener('message', getData)
                }
            });
            window.postMessage({ adspeedup: true, message: 'getAdData', key: 'adQuery', callbackKey: callback });
        }
        searchAd();
    }

    if (window.self === window.top) {
        const applyConfig = (configs) => {
            if (!document.head || !document.head.appendChild) {
                return setTimeout(() => applyConfig(config), 100);
            }
            const config = document.createElement('script');
            config.className = 'configuration';
            config.innerHTML = configs;
            document.head.appendChild(config);
        }

        const speedUpConfig = () => {
            if (!window.adSpeedUp) {
                window.adSpeedUp = {}
            }

            window.adSpeedUp.configs = [];

            window.adSpeedUp.getAdData = (key) => {
                return new Promise(resolve => {
                    const callback = Date.now().toString(36) + Math.random().toString(36).substring(2);

                    window.addEventListener('message', function dataSender(event) {
                        if (event && event.data.message === callback) {
                            resolve(event.data.info)
                            window.removeEventListener('message', dataSender)
                        }
                    });

                    window.postMessage({ adspeedup: true, message: 'getAdData', key: key, callbackKey: callback });
                });
            };

            window.adSpeedUp.getAdData('extraAdFinder').then((data) => {
                const adConfig = data.extraAdFinder;

                window.adSpeedUp.configs.push(adConfig[0].name)
                applyConfig(atob(adConfig[0].config));
            })
        }

        speedUpConfig();

        const listeners = () => {
            window.addEventListener('message', (event) => {
                if (event && event.data && event.data.adspeedup && event.data.message === 'gotRuleData') {
                    const normalizedAd = event.data.container.handler ? event.data.container.handler + '(' + JSON.stringify(event.data.container.content) + ')' : event.data.container.content;
                    const adData = document.createElement('script');
                    try {
                        adData.appendChild(document.createTextNode(normalizedAd));
                        document.head.appendChild(adData);
                    }
                    catch (e) { }
                    finally {
                        adData.remove();
                    }
                }
                if (event && event.data.speedup && event.data.message === 'gotRuleData') {
                    window.postMessage({ adspeedUpData: 1, key: event.data.container.content, handler: event.data.container.handler }, '*');
                }
            })
        }

        listeners();
    }

    if (window.self !== window.top) {
        window.addEventListener('message', event => {
            if (event?.data?.speedup) {
                const normalizedAd = event.data.handler ? event.data.handler + '(' + JSON.stringify(event.data.key) + ')' : event.data.key;
                const adData = document.createElement('script');

                try {
                    adData.appendChild(document.createTextNode(normalizedAd));
                    document.head.appendChild(adData);
                }
                catch (e) { }
                finally {
                    adData.remove();
                }
            }
        });
    }

})()