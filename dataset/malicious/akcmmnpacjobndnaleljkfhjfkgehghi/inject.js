async function getStyle() {
    let response = await fetch(chrome.runtime.getURL("./styles/facebook.css"))
    let style = await response.text()
    return style;
}

async function updateStyles() {
    let style = await getStyle();
    chrome.storage.local.get(['status', 'colors', 'avatar-rounded', 'custom-scrollbar', 'hide-r-column', 'auto-hide-l-menu', 'auto-hide-chat'], function(result) {
        [].forEach.call(document.querySelectorAll(".fb_ctffb"), function(e) {
            e.parentNode.removeChild(e);
        });
        if (!result.status) {
            return;
        }
        let colors = result.colors;
        for (const [key, value] of Object.entries(colors)) {
            style = style.replace(new RegExp(key, "g"), value);
        }
        let inlineStyle = document.createElement("style");
        inlineStyle.classList.add("fb_ctffb");
        inlineStyle.textContent = style;

        if (!result['avatar-rounded']) {
            inlineStyle.textContent += `mask circle, .l9j0dhe7 {r: 100;} .emlxlaya {border-radius: 0 !important;}`;
        }
        if (result['custom-scrollbar']) {
            inlineStyle.textContent += `:root, .__fb-light-mode {--scroll-thumb: ${colors['BG_TWO']}}`;
        }
        if (result['hide-r-column']) {
            inlineStyle.textContent += `
            div[role="complementary"] {
                position: relative;
            }
            
            div[role="complementary"]:hover div[data-pagelet="RightRail"] {
                right: 0px;
            }
            
            div[data-pagelet="RightRail"] {
                position: absolute;
                right: -100%;
            
                transition: right 0.2s ease;
            }`;
        }
        if (result['auto-hide-l-menu']) {
            inlineStyle.textContent += `
            div[data-pagelet="LeftRail"] .buofh1pr {
                overflow: hidden;
                width: 60px;
                white-space: nowrap;
            }
            
            div[data-pagelet="LeftRail"]:hover .buofh1pr {
                width: auto;
            }`;
        }

        if (result['auto-hide-chat']) {
            inlineStyle.textContent += `
            div[data-pagelet="ChatTab"] {
                opacity: 0;
                -webkit-transition: opacity 0.2s ease;
                -moz-transition: opacity 0.2s ease;
                -ms-transition: opacity 0.2s ease;
                -o-transition: opacity 0.2s ease;
                transition: opacity 0.2s ease;
            }
            
            div[data-pagelet="ChatTab"]:hover {
                opacity: 1;
            }`;
        }

        document.head.appendChild(inlineStyle);
    });
}

document.addEventListener("DOMContentLoaded", updateStyles)