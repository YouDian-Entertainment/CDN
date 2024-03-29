import { app, BrowserWindow } from 'electron' // eslint-disable-line
import { Notic, AddShortcuts, AddMenuList, AddDataBase, AddResizeAction } from './electron';
import { FUNCTION_KEY, LETTER_KEY } from './constants/shortcuts';
import DB_NAME from './constants/db';
const { port, host } = require('../electron/config');
const path = require('path');

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}
let mainWindow;
const isDev = process.env.ENV === 'dev';
const winURL = isDev ? `http://${host}:${port}` : `file://${__dirname}/index.html`;

const logo = path.resolve(__dirname, '../build/icons/cdn.png');

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        title: 'VET',
        height: 500,
        width: 500,
        center: true, // 窗口默认居中
        resizable: false, // 不可修改窗口大小
        maximizable: false, // 不存在最大化
        skipTaskbar: true, // 任务栏显示
        useContentSize: false, // 不允许修改大小
        // transparent: true, // 透明
        frame: false, // 不使用框架
        // // show: false, // 禁止显示
        fullscreenable: false,
        titleBarStyle: 'default',
        backgroundColor: 'none',
        webPreferences: {
            devTools: true,
            scrollBounce: false,
            nodeIntegration: true,
            webSecurity: false,
        },
        icon: logo,
    });
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // Notic('主进程提示', '打开成功');
    // 添加快捷键
    // AddShortcuts(`${FUNCTION_KEY[4]}+${FUNCTION_KEY[9]}+${LETTER_KEY[25]}`, () => {
    //     Notic('快捷键提示', '绑定快捷键成功');
    // });
    // AddMenuList();
    // 添加数据库
    for (let key in DB_NAME) {
        AddDataBase(DB_NAME[key]);
    }
    // 增加动态修改窗体大小
    AddResizeAction(mainWindow);
}

app.dock && app.dock.setIcon(logo);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
