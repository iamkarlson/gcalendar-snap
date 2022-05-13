const { app, BrowserWindow, shell} = require("electron");

function postConfigure(window) {
    window.webContents.on("will-navigate", function (event, reqUrl) {
        console.log('will-navigate');
        let requestedHost = new URL(reqUrl).host;
        let currentHost = new URL(window.webContents.getURL()).host;
        if (requestedHost && requestedHost != currentHost) {
            console.log("openning in the external app")
            event.preventDefault();
            shell.openExternal(reqUrl);
        }
    });

    window.webContents.on('new-window', function(event, reqUrl) {
        console.log('will-navigate');
        let requestedHost = new URL(reqUrl).host;
        let currentHost = new URL(window.webContents.getURL()).host;
        if (requestedHost && requestedHost != currentHost) {
            console.log("openning in the external app")
            event.preventDefault();
            shell.openExternal(reqUrl);
        }
    });
}

app.on("ready", () => {
    const win = new BrowserWindow({
        autoHideMenuBar: true,
        icon: __dirname + '/gcalendar.png',
    });
    win.maximize();
    win.loadURL("https://calendar.google.com/");
    console.log('ready')
    postConfigure(win);

});
