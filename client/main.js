
 const electron = require('electron');

function main(){
    const win = new electron.BrowserWindow({
                    width:800,
                    height:600,
                    webPreferences:{
                        nodeIntegration:true
                    }
                })

    win.loadFile("index.html");

    //win.webContents.openDevTools();
}

electron.app.whenReady().then(main);

electron.app.on('window-all-closed',()=>{
    if(process.platform != 'darwin')
    {
        electron.app.quit();
    }
})

electron.app.on('active',()=>{
    if(electron.BrowserWindow.getAllWindows().length === 0)
    {
        main();
    }
})