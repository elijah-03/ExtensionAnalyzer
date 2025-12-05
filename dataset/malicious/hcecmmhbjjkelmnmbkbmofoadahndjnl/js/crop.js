/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
let isCropMode = false;
let isDragging = false;
let initialX, initialY;

const cropFrame = document.getElementById('cropFrame');
const canva = document.getElementById('editorCanvas');

let firstY = canva.getBoundingClientRect().top;
let firstX = canva.getBoundingClientRect().left;

let lastY, lastX;

const startDragging = (e) => {
    isDragging = true;

    initialX = e.clientX - cropFrame.getBoundingClientRect().left;
    initialY = e.clientY - cropFrame.getBoundingClientRect().top;
}

function getPageYOffset() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

const drag = (e) => {
    if (!isDragging) return;
    const x = e.clientX - initialX;
    const y = (e.clientY + getPageYOffset()) - initialY - 56;
    cropFrame.style.left = `${x}px`;
    cropFrame.style.top = `${y}px`;
}

const stopDragging = (e) => {
    lastX = e.clientX;
    lastY = e.clientY;
    isDragging = false;
}

const toggleCropMode = () => {
    isCropMode = !isCropMode;
    if (isCropMode) {
        document.querySelector('.cutButton').className = 'cutButton cut';
        setTimeout(() => {
            cropFrame.style.top = document.documentElement.scrollTop + 'px';
            cropFrame.style.width = `${canva.width - 30}px`;
            cropFrame.style.height = `${Math.min(canva.height, window.innerHeight - 2)}px`;
        }, 100)

        cropFrame.style.display = 'block';
    } else {
        document.querySelector('.cutButton').className = 'cutButton';
        cropFrame.style.display = 'none';
    }
}

let isResizing = false;
let resizeInitialX, resizeInitialY;

const resizeHandles = Array.from(document.querySelectorAll('.resize-handle'));

const startResizing = (e) => {
    isResizing = true;
    resizeInitialX = e.clientX;
    resizeInitialY = e.clientY;

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
}

resizeHandles.forEach(handle => {
    handle.addEventListener('mousedown', startResizing);
});

const resize = (e) => {
    if (!isResizing) return;
    const cropFrame = document.getElementById('cropFrame');

    const deltaX = resizeInitialX - e.clientX;
    const deltaY = resizeInitialY - e.clientY;

    let newWidth = deltaX + +cropFrame.style.width.replace(/px/g, '');
    let newHeight = deltaY + +cropFrame.style.height.replace(/px/g, '');

    cropFrame.style.width = `${newWidth}px`;
    cropFrame.style.height = `${newHeight}px`;

    resizeInitialX = e.clientX;
    resizeInitialY = e.clientY;
    if (!firstY) {
        firstY = initialY;
        firstX = initialX;
    }
}

const stopResizing = () => {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
}

document.getElementById('cutButton').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
    });
    const rect = cropFrame.getBoundingClientRect();

    const fX = rect.left - document.getElementById('editorCanvas').getBoundingClientRect().left;
    const lX = Math.abs(fX) + +cropFrame.style.width.replace(/px/g, '');

    const fY = rect.top - firstY;
    const lY = fY + +cropFrame.style.height.replace(/px/g, '');

    const canvas = document.getElementById('editorCanvas');
    const currentScale = canvas.width / canvas.offsetWidth;

    crop([Math.abs(fX) * currentScale, fY * currentScale, lX * currentScale, lY * currentScale]);
});

const crop = (data) => {
    const [startX, startY, endX, endY] = data;
    const newCanva = document.getElementById('editorCanvas');
    const screenshotUrl = newCanva.toDataURL('image/png');

    const image = new Image();
    image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = Math.abs(endX - startX);
        canvas.height = Math.abs(endY - startY);
        context.drawImage(image, startX, startY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

        const croppedImageUrl = canvas.toDataURL('image/png');
        chrome.storage.local.set({screenshotUrl: [{url: croppedImageUrl}]}, function () {
            chrome.runtime.sendMessage({action: 'openEditor'});
        });
    };

    image.src = screenshotUrl;
}

cropFrame.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

window.addEventListener('message', (event) => {
    if (event.data.screenEditor && event.data.message === 'toggleCrop') {
        toggleCropMode();
    }
})
/******/ })()
;