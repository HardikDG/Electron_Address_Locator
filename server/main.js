const { app, BrowserWindow, Menu, Tray } = require('electron')
const path = require('path')
const url = require('url')
const menuManager = require('./menu-manager')

let win
let tray
let splashScreen

const iconPath = path.join(__dirname, 'images')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', appReady)

function appReady() {
  // console.log("Path: " + JSON.stringify(path));
  // console.log("url: " + JSON.stringify(url));

  menuManager.onAbout = () => { console.log('You REALLY clicked About...') }
  menuManager.onMap = () => { activateAndNav('map') }
  menuManager.onLocations = () => { activateAndNav('locations') }

  const menu = menuManager.build()
  Menu.setApplicationMenu(menu)

  // Only MacOS will have a dock property.
  if (app.dock) {
    app.dock.setIcon(path.join(iconPath, 'icon.png'))
  }

  createSplashScreen()
  initTray()
  createWindow()
}

function activateAndNav(page) {
  if (!win) {
    createWindow(page)
  } else {
    navigateTo(page)
  }
}

function navigateTo(page) {
  app.focus()

  if (page === 'map') {
    win.webContents.send('onMap')
  }
  if (page === 'locations') {
    win.webContents.send('onLocations')
  }
}



function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 1024,
    height: 576,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    closable: false,
    skipTaskbar: true,
    show: true,
    minimizable: false,
    maximizable: false,
    resizable: false,
    center: true,
    frame: false
  })

  splashScreen.loadURL('http://localhost:8100/assets/images/sentrylitered.png')
}


function initTray() {
  if (process.platform === 'darwin') {
    tray = new Tray(path.join(iconPath, 'mac-tray.png'))
    tray.setPressedImage(path.join(iconPath, 'mac-tray-pressed.png'))
  } else {
    tray = new Tray(path.join(iconPath, 'icon.ico'))
  }

  tray.setToolTip(app.getName())
  tray.setContextMenu(menuManager.buildTrayMenu())
}

function createWindow(page) {
  const windowIcon = process.platform === 'darwin' ? 'icon.png' : 'icon.ico'
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Address Locator',
    icon: path.join(iconPath, windowIcon),
    show: false
  })

  // and load the index.html of the app.
  win.loadURL('http://localhost:8100')
  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, '../www/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))

  win.once('ready-to-show', () => {
    if (splashScreen && splashScreen.isVisible()) {
      splashScreen.destroy()
      splashScreen = null
    }

    if (!win.isVisible()) {
      win.show()
    }

    if (page) {
      navigateTo(page)
    }
  })

  // Open the DevTools.
   win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
