const getVids = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        chrome.storage.local.get(`${currentTab.id}`, async (data) => {
            if (data[currentTab.id]) {
                let vids;
                if (currentTab.url.includes('tiktok')) {
                    vids = data[currentTab.id].map((item) => {
                        return { name: item.name, link: item.link, size: `${item.size} MB`, id: Date.now() + item.size, motherLink: item.motherLink }
                    })
                } else {
                    vids = data[currentTab.id].map((item) => {
                        return { name: item.name, link: item.link, size: `${item.size} MB`, id: Date.now() + item.size }
                    })
                }
                vids.forEach(item => {
                    upVideo(item);
                })
            } else {
                document.querySelector('.noVideo').style.display = 'block';
            }
        })
    });

    document.querySelector('.loader').style.display = 'none';
}

setTimeout(getVids, 800);

const createVideo = (src, id) => {
    const previewContainer = document.createElement('div');
    const videoElem = document.createElement('video');
    const buttonElem = document.createElement('div');

    buttonElem.addEventListener('click', function () {
        if (videoElem.paused) {
            videoElem.play();
            buttonElem.className = 'playButton pause';
        } else {
            videoElem.pause();
            buttonElem.className = 'playButton play';
        }
    });

    buttonElem.className = 'playButton play';
    previewContainer.className = 'previewContainer';
    previewContainer.id = id;
    videoElem.innerHTML = `<source src=${src} type="video/mp4">`
    videoElem.className = 'preview';

    previewContainer.appendChild(videoElem);
    previewContainer.appendChild(buttonElem);
    return previewContainer;
}

const videoOptions = (target, id, vid) => {
    const buttons = ['Preview', 'Download', 'Copy Link'];
    let link = vid.link.replace('-iev1-1', '');
    if (link.includes('fbcdn.net')) {
        link = link.replace('scontent', 'video');
    }

    const blockElem = document.createElement('div');
    blockElem.className = 'videoOptions';
    blockElem.id = id;

    const expandButton = (element) => {
        element.className = 'activeButton optionButton';
        element.parentNode.className = 'videoOptions disableButtons';

        setTimeout(() => {
            element.className = 'optionButton';
            element.parentNode.className = 'videoOptions';
        }, 3000);
    }

    buttons.forEach(item => {
        const buttonImg = document.createElement('div');
        buttonImg.className = item.split(' ').join('');

        const buttonElement = document.createElement('button');
        buttonElement.innerText = item;
        buttonElement.className = 'optionButton';

        buttonElement.insertAdjacentElement('afterbegin', buttonImg)

        blockElem.appendChild(buttonElement);

        if (item === 'Download') {
            const downloadLink = document.createElement('a');
            downloadLink.download = link.split('/')[link.split('/').length - 1].slice(0, 20);
            downloadLink.href = link;

            buttonElement.addEventListener('click', () => {
                buttonElement.innerHTML = '<div class="Download"></div>Download started.'
                setTimeout(() => {
                    buttonElement.innerHTML = '<div class="Download"></div>Download'
                }, 3000);
                downloadLink.click();
                expandButton(buttonElement)
            });
        }

        if (item === 'Copy Link') {
            buttonElement.addEventListener('click', () => {
                var tempTextarea = document.createElement('textarea');
                if (vid.motherLink) {
                    tempTextarea.value = vid.motherLink;
                } else {
                    tempTextarea.value = link;
                }
                document.body.appendChild(tempTextarea);
                tempTextarea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextarea);
                buttonElement.innerText = 'Link has been copied.';
                buttonElement.insertAdjacentElement('afterbegin', buttonImg);

                setTimeout(() => {
                    buttonElement.innerText = 'Copy Link';
                    buttonElement.insertAdjacentElement('afterbegin', buttonImg);
                }, 3000);
                expandButton(buttonElement)
            });
        }

        if (item === 'Preview') {
            buttonElement.addEventListener('click', () => {
                if (document.querySelector(`#${id}vid`)) {
                    document.querySelector(`#${id}vid`).remove();
                } else {
                    blockElem.insertAdjacentElement('beforebegin', createVideo(link, `${id}vid`));
                }
            });
        }
    });

    // target.insertAdjacentElement('afterend', blockElem)
    target.appendChild(blockElem);
}

const upVideo = (vid) => {
    const root = document.querySelector('.videos');

    const videoElement = document.createElement('div');
    videoElement.setAttribute('class', 'videoBlock')

    const arrowElem = document.createElement('img');
    arrowElem.alt = 'button';
    arrowElem.className = 'videoArrow';
    arrowElem.src = '../assets/arrow.svg';

    const vidNameElem = document.createElement('div');
    vidNameElem.innerHTML = `<p>video_${vid.name}</p>`;
    vidNameElem.className = 'videoName';

    const vidSizeElem = document.createElement('p');
    vidSizeElem.innerText = vid.size;
    vidSizeElem.className = 'size';

    vidNameElem.addEventListener('click', () => {
        if (videoElement.querySelector('.videoArrow').classList.contains('arrowDown')) {
            videoElement.querySelector('.videoArrow').className = 'videoArrow';
            if (document.querySelector(`#id${Math.floor(vid.id)}vid`)) {
                document.querySelector(`#id${Math.floor(vid.id)}vid`).remove();
            }
            document.querySelector(`#id${Math.floor(vid.id)}`).remove();
        } else {
            videoElement.querySelector('.videoArrow').className = 'videoArrow arrowDown';
            videoOptions(videoElement, `id${Math.floor(vid.id)}`, vid);
        }
    })

    vidNameElem.insertAdjacentElement('afterbegin', arrowElem);

    const newDiv = document.createElement('div');
    newDiv.style = 'display: flex; justify-content: space-between; width: 100%';

    // videoElement.insertAdjacentElement('afterbegin', vidNameElem);
    // videoElement.insertAdjacentElement('beforeend', vidSizeElem)
    newDiv.insertAdjacentElement('afterbegin', vidNameElem);
    newDiv.insertAdjacentElement('beforeend', vidSizeElem)

    videoElement.insertAdjacentElement('beforeend', newDiv)

    root.appendChild(videoElement)
}