const listItems = document.querySelectorAll('.list-item');
const settingsForDomainItem = document.querySelector('.settings_for_domain');

const onListItemClick = e => {
    const { target } = e.currentTarget.dataset;

    chrome.tabs.query({ currentWindow: true, active: true }, tab => {
        const { url } = tab[0];
        const { hostname, origin } = new URL(url);

        chrome.runtime.sendMessage({ action: 'OPEN_DEFINITE_SETTINGS', data: { target, hostname, origin }}, () => {});
    });
};
listItems.forEach(listItem => listItem.addEventListener('click', onListItemClick, false));

chrome.tabs.query({ currentWindow: true, active: true }, tab => {
    const {url} = tab[0];
    const { hostname } = new URL(url);

    settingsForDomainItem.innerText = 'Settings for ' + hostname.replace('www.', '').trim();
});
