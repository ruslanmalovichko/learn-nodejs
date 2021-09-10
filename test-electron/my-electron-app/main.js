const { app, BrowserWindow } = require('electron')
// include the Node.js 'path' module at the top of your file
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600, // Open window woth 800 and 600 size
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // add preload code with preload.js
    }
  })

  win.loadFile('index.html') // render index.html inside the window
}

app.whenReady().then(() => { // when application ready, call create window function
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit() // Windows and Linux: on close windows, close the app
})

