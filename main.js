/* eslint strict: 0 */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const fs = require('fs');
const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const shell = electron.shell;
const ipcMain = electron.ipcMain;
let menu;
let template;
let mainWindow = null;

crashReporter.start({
  productName: 'sauce-debug-client',
  companyName: 'Gavin Mogan',
  submitURL: 'somewhere',
  autoSubmit: false
});

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

const accountsFile = path.join(app.getPath('userData'), 'accounts.json');
ipcMain.on('save-accounts', (event, accounts) => {
  fs.writeFile(accountsFile, JSON.stringify(accounts));
});

ipcMain.on('ready-load-accounts', () => {
  fs.access(accountsFile, fs.R_OK, function (err) {
    if (err) return;
    fs.readFile(accountsFile, function (err, data) {
      if (err) return;
      mainWindow.webContents.send('load-accounts', JSON.parse(data.toString()));
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728 });

  ipcMain.on('save-accounts', (event, accounts) => {
    const filename = path.join(app.getPath('userData'), 'accounts.json');
    fs.writeFile(filename, JSON.stringify(accounts));
  });

  if (process.env.NODE_ENV === 'development') {
    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/src/index.development.html'); // eslint-disable-line no-path-concat
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/public/index.html'); // eslint-disable-line no-path-concat
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.platform === 'darwin') {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About ElectronReact',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Accounts',
        click () {
          mainWindow.webContents.send('manage-accounts');
        }
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click () {
          app.quit();
        }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click () {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click () {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click () {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click () {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click () {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click () {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click () {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click () {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [{
      label: '&File',
      submenu: [{
        label: '&Open',
        accelerator: 'Ctrl+O'
      }, {
        label: '&Close',
        accelerator: 'Ctrl+W',
        click () {
          mainWindow.close();
        }
      }]
    }, {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [{
        label: '&Reload',
        accelerator: 'Ctrl+R',
        click () {
          mainWindow.restart();
        }
      }, {
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click () {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }, {
        label: 'Toggle &Developer Tools',
        accelerator: 'Alt+Ctrl+I',
        click () {
          mainWindow.toggleDevTools();
        }
      }] : [{
        label: 'Toggle &Full Screen',
        accelerator: 'F11',
        click () {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click () {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click () {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click () {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click () {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});
