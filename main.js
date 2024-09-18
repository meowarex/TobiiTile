const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Check if running as root (optional, based on original code)
const isRoot = process.geteuid && process.geteuid() === 0;

if (isRoot) {
    app.commandLine.appendSwitch('no-sandbox');
}

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile('src/index.html');
}

app.on('ready', () => {
    createWindow('Tobii Tile');
});

// Handle Zoom IPC
ipcMain.on('zoom-in', (event) => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        let currentZoom = focusedWindow.webContents.getZoomLevel();
        if (currentZoom < 10) { // Prevent excessive zoom in
            currentZoom += 1;
            focusedWindow.webContents.setZoomLevel(currentZoom);
        }
    }
});

ipcMain.on('zoom-out', (event) => {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        let currentZoom = focusedWindow.webContents.getZoomLevel();
        if (currentZoom > -10) { // Prevent excessive zoom out
            currentZoom -= 1;
            focusedWindow.webContents.setZoomLevel(currentZoom);
        }
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { // macOS convention
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});