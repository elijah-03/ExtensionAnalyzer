
new MutationObserver(function (mutations) {
    //
    for (let mutation of mutations) {
        //
        let nodes = mutation.addedNodes;
        for (let node of nodes) {
            //
            if (node.nodeType != 1)
                continue;

            let tl = node.getAttribute('lang');
            if (!tl)
                continue;

            node.removeAttribute('lang');

            let hasTarget = tl.indexOf(':') > 0;
            let target = hasTarget ? tl.split(':')[0] : '';
            let msgId = hasTarget ? tl.split(':')[1] : tl;

            let message = chrome.i18n.getMessage(msgId);
            //console.log(message);
            switch (target) {
                case 'html':
                    node.innerHTML += message;
                    break;
                case 'prehtml':
                    node.innerHTML = message + node.innerHTML;
                    break;
                case 'htmlreplace':
                    node.innerHTML = message;
                    break;
                case '':
                case 'text':
                    node.textContent = message;
                    break;
                default:
                    node.setAttribute(target, message);
            }
        }
    }
}).observe(document, {subtree: true, childList: true, characterData: true});

$.fn.selectRange = function (start, end) {
    return this.each(function () {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        }
    });
};