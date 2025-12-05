function updateLikes() {
    chrome.storage.local.get(['status', 'colors'], function(result) {
        if (!result.status) {
            [].forEach.call(document.querySelectorAll(".fb_ctffb"), function(e) {
                e.parentNode.removeChild(e);
            });
            return;
        }
        let colors = result.colors;
        let inlineStyle = document.createElement("style");
        inlineStyle.classList.add("fb_ctffb");
        inlineStyle.textContent = `
        ._89n_, ._8f1i  {
            background: ${colors['BG_ONE']} !important;
        }
        `;

        document.head.appendChild(inlineStyle);
    });
}

document.addEventListener("DOMContentLoaded", updateLikes)