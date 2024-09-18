const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        const validChannels = ['zoom-in', 'zoom-out'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    // Optionally, expose methods to receive data from main process
    receive: (channel, func) => {
        const validChannels = ['fromMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('app-title');
    if (title) title.innerText = 'Tobii Tile';
});