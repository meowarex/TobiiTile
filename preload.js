const { contextBridge, ipcRenderer } = require('electron');

console.log('preload.js loaded'); // Confirm preload.js is loaded

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        const validChannels = ['zoom-in', 'zoom-out'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
            console.log(`Sent message on channel: ${channel} with data: ${data}`); // Debug log
        }
    },
    zoomIn: () => {
        ipcRenderer.send('zoom-in');
        console.log('Zoom In sent'); // Debug log
    },
    zoomOut: () => {
        ipcRenderer.send('zoom-out');
        console.log('Zoom Out sent'); // Debug log
    },
    getZoomLevel: () => {
        console.log('Invoking getZoomLevel'); // Debug log
        return ipcRenderer.invoke('get-zoom-level');
    },
    setZoomLevel: async (level) => {
        try {
            const success = await ipcRenderer.invoke('set-zoom-level', level);
            console.log(`Set Zoom Level to: ${level}`); // Debug log
            return success;
        } catch (error) {
            console.error('Error setting zoom level:', error); // Debug log
            throw error;
        }
    },
    receive: (channel, func) => {
        const validChannels = ['fromMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
            console.log(`Listening on channel: ${channel}`); // Debug log
        }
    }
});