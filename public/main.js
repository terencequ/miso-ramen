const { app, BrowserWindow, shell, ipcMain, Menu, TouchBar } = require('electron');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        backgroundColor: '#F7F7F7',
        minWidth: 1024,
        minHeight: 576,
        show: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: __dirname + '/preload.js',
        },
        width: 1280,
        height: 720,
    });

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`,
    );

    if (isDev) {
        const {
            default: installExtension,
            REACT_DEVELOPER_TOOLS,
            REDUX_DEVTOOLS,
        } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS)
            .then(name => {
                console.log(`Added Extension: ${name}`);
            })
            .catch(err => {
                console.log('An error occurred: ', err);
            });

        installExtension(REDUX_DEVTOOLS)
            .then(name => {
                console.log(`Added Extension: ${name}`);
            })
            .catch(err => {
                console.log('An error occurred: ', err);
            });
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();

        ipcMain.on('open-external-window', (event, arg) => {
            shell.openExternal(arg);
        });
    });
};

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('isMaximised-query', (event, arg) => {
    event.reply('isMaximised-reply', BrowserWindow.getFocusedWindow().isMaximized());
});
ipcMain.on('minimise', (event, arg) => {
    BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.on('maximise', (event, arg) => {
    BrowserWindow.getFocusedWindow().maximize();
});
ipcMain.on('close', (event, arg) => {
    BrowserWindow.getFocusedWindow().close();
    app.quit();
});
ipcMain.on('restore', (event, arg) => {
    BrowserWindow.getFocusedWindow().restore();
});