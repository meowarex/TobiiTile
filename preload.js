const { contextBridge, webFrame } = require('electron');

contextBridge.exposeInMainWorld('api', {
    setZoomLevel: (level) => {
        webFrame.setZoomLevel(level);
    },
    getZoomLevel: () => {
        return webFrame.getZoomLevel();
    }
});