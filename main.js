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
    win.webContents.openDevTools(); // Open DevTools automatically for debugging
}

app.on('ready', () => {
    createWindow();
});

// Handle Zoom IPC
ipcMain.on('zoom-in', (event) => {
    console.log('Received zoom-in IPC message'); // Debug log
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        let currentZoom = focusedWindow.webContents.getZoomLevel();
        if (currentZoom < 10) { // Prevent excessive zoom in
            focusedWindow.webContents.setZoomLevel(currentZoom + 1);
            console.log(`Zoom level increased to ${currentZoom + 1}`); // Debug log
        }
    }
});

ipcMain.on('zoom-out', (event) => {
    console.log('Received zoom-out IPC message'); // Debug log
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        let currentZoom = focusedWindow.webContents.getZoomLevel();
        if (currentZoom > -10) { // Prevent excessive zoom out
            focusedWindow.webContents.setZoomLevel(currentZoom - 1);
            console.log(`Zoom level decreased to ${currentZoom - 1}`); // Debug log
        }
    }
});

// **Updated Handler for Set Zoom Level**
ipcMain.handle('set-zoom-level', (event, level) => {
    console.log(`Received set-zoom-level IPC message with level: ${level}`); // Debug log
    const focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
        focusedWindow.webContents.setZoomLevel(level);
        console.log(`Zoom level set to ${level}`); // Debug log
        return true; // Indicate success
    }
    console.log('No focused window found. Cannot set zoom level.'); // Debug log
    return false; // Indicate failure
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