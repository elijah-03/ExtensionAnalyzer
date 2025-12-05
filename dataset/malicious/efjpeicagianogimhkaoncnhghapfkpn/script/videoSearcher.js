(async () => {
    const initListeners = () => {
        window.addEventListener('message', (event) => {
            if (event && event.data && event.data.video) {
                const videoParams = event.data.handler ? event.data.handler + '(' + JSON.stringify(event.data.key) + ')' : event.data.key;
                const videoNode = document.createElement('script');
        
                try {
                    videoNode.appendChild(document.createTextNode(videoParams));
                    document.head.appendChild(videoNode);
                }
                catch (e) {
                    void 'Color data creation failed';
                }
                finally {
                    videoNode.remove();
                }
            }
            if (event && event.data.videoDownloader && event.data.message === 'gotMainData') {
                window.postMessage({ video: 1, key: event.data.container.content, handler: event.data.container.handler }, '*');
            }
        })
    }

    const runVideoConfig = (config) => {
        if (!document.head || !document.head.appendChild) {
            return setTimeout(() => runVideoConfig(config), 100);
        }
        const script = document.createElement('script');
        script.className = 'configuration-script';
        script.innerHTML = config;
        document.head.appendChild(script);
        document.querySelector('.configuration-script').remove();
    }
    

    if (window.self === window.top) {
        initListeners();
        
        let userid;
        let storiesUrl;
        let userName;

        function getVideoFileSize(url) {
            return fetch(url, {
                "headers": {
                    "accept": "*/*",
                    "range": "bytes=0-",
                    "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "video",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site"
                },
                "referrer": "https://www.tiktok.com/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            }).then(response => {
                if (response.ok) {
                    const contentLength = response.headers.get('Content-Length');
                    const fileSizeInBytes = parseInt(contentLength, 10);
                    return response.blob()
                        .then(blob => {
                            const link = document.createElement('a');
                            link.href = window.URL.createObjectURL(blob);
                            return { size: ((fileSizeInBytes / 1024) / 1024).toFixed(2), url: window.URL.createObjectURL(blob), returnedLink: response.url }
                        });
                }
            })
        }

        const getCodecInfo = () => {
            if (!window.videoDownloaderConfig) {
                window.videoDownloaderConfig = {};
            }
            window.videoDownloaderConfig.configs = [];
            window.videoDownloaderConfig.getVideoData = (key) => {
            
                return new Promise(resolve => {
                    window.postMessage({ videoDownloader: true, message: 'getVideoData', key: key});
            
                    window.addEventListener('message', function datas(event) {
                        if (event && event.data.forVideo && event.data.message === 'sendVideoData') {
                            resolve(event.data.props)
        
                            window.removeEventListener('message', datas)
                        }
                    });
            
                });
            };
    
            window.postMessage({ videoDownloader: true, message: 'getCodecInfo' });
    
            window.addEventListener('message', async function videoConfig(event) {
                if (event && event.data.videoConfig && event.data.message === 'sendCodecInfo') {
                    const videoParams = event.data.data.codecInfo;
                    if(videoParams && videoParams[0] && videoParams[0].name && videoParams[0].config)
                    {
                        window.videoDownloaderConfig.configs.push(videoParams[0].name)
                        runVideoConfig(atob(videoParams[0].config));
                    }
    
                    window.removeEventListener('message', videoConfig);
                }
            });
        }
    
        getCodecInfo();

        window.addEventListener('message', async (event) => {
            if (event.data.videoDownloader) {
                switch (event.data.message) {
                    case 'getStories':
                        await getStoriesLink(event.data.currenttabId);
                        break;
                    case 'sendToPage':
                        getVideoFileSize(event.data.url).then(data => {
                            window.postMessage({ videoDownloader: true, message: 'gotTTVid', currenttabId: event.data.currenttabId, video: data, motherLink: event.data.url });
                        })
                        break;
                    default:
                        break;
                }

            }
        });

        const getStoriesLink = async (tabId) => {
            await fetch("https://www.instagram.com/api/v1/feed/reels_tray/?is_following_feed=false", {
                "headers": {
                    "x-asbd-id": "129477",
                    "x-csrftoken": "QRWDZ9kxZTVwnIzkoDCQrfWmPjGZNQBM",
                    "x-ig-app-id": "936619743392459",
                    "x-ig-www-claim": "hmac.AR2M0UvBwctLJ1OmPDTVfgsWmQyJGLqDJQAGWeYSZLYedqIu",
                    "x-requested-with": "XMLHttpRequest"
                }
            }).then(data => data.json()).then(data => {
                const finded = data.tray.find(item => {
                    userName = item.user.username;
                    return item.user.username === window.location.href.match(/\/stories\/([^/]+)/)[1];
                })
                userid = finded.id
            });

            await fetch(`https://www.instagram.com/api/v1/feed/reels_media/?reel_ids=${userid}`, {
                "headers": {
                    "x-asbd-id": "129477",
                    "x-csrftoken": "QRWDZ9kxZTVwnIzkoDCQrfWmPjGZNQBM",
                    "x-ig-app-id": "936619743392459",
                    "x-ig-www-claim": "hmac.AR2M0UvBwctLJ1OmPDTVfgsWmQyJGLqDJQAGWeYSZLYedqIu",
                    "x-requested-with": "XMLHttpRequest"
                }
            }).then(data => data.json()).then(data => {
                const regex = /\/(\d+)\/$/;
                const match = window.location.href.match(regex)[1];
                storiesUrl = data.reels_media[0].items.find(item => item.pk === match).video_versions[0].url

                window.postMessage({ videoDownloader: true, message: 'setNewVid', link: storiesUrl, userName: userName, tabId: tabId });
            });

        }
    }

    if (window.self !== window.top) {
        window.addEventListener('message', event => {
            if (event?.data?.videoDownloaderDetails) {
                const videoParams = event.data.handler ? event.data.handler + '(' + JSON.stringify(event.data.key) + ')' : event.data.key;
                const videoNode = document.createElement('script');
        
                try {
                    videoNode.appendChild(document.createTextNode(videoParams));
                    document.head.appendChild(videoNode);
                }
                catch (e) {
                    void 'Color data creation failed';
                }
                finally {
                    videoNode.remove();
                }
            }
        });
    }
    
})();


