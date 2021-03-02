# "build":{ //这里是electron-builder的配置
#    "productName":"web_menu",  //项目名 这也是生成的exe文件的前缀名
#    "appId":"com.web_menu", //包名 
#    "copyright":"wyq", //版权  信息
#    "directories":{  // 输出文件夹
#      "output":"bin"
#    },
#    "win":{  // windows相关的配置
#      "icon":"", //图标路径  格式 ico 文件
#      "target":[{
#        "target":"nsis", // 我们要的目标安装包
#        "arch":[   // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
#            "x64",    //打包64位安装程序
#            "ia32"  //打包32位安装程序
#        ] 
#      }] 
#    },
#    "dmg":{  // macOSdmg
#      "contents":[
#           {
#            "x": 410,
#            "y": 150,
#            "type": "link",
#            "path": "/Applications"
#          },
#          {
#            "x": 130,
#            "y": 150,
#            "type": "file"
#          }
#        ]
#    },
#    "mac":{  // mac
#      "icon":""   //图标路径 格式 icns 文件
#    },  
#   "linux":{  // linux
#      "icon":""  //图标路径 格式 ico 文件
#    },
#    "nsis":{
#      "oneClick":false,    // 是否一键安装
#      "allowElevation":true,    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
#      "allowToChangeInstallationDirectory":true,   // 允许修改安装目录
#      "installerIcon":"",   // 安装图标 格式 ico 文件
#      "uninstallerIcon":"",   //卸载图标 格式 ico 文件
#      "installerHeaderIcon":"",   // 安装时头部图标 格式 ico 文件
#      "createDesktopShortcut":true,   // 创建桌面图标 
#      "createStartMenuShortcut":true,   // 创建开始菜单图标
#      "shortcutName":"",     // 图标名称
#      "include":"",    // 包含的自定义nsis脚本 这个对于构建需求严格得安装过程相当有用。
#      "script":""   // NSIS脚本的路径，用于自定义安装程序。 默认为build / installer.nsi
#   },
#   "publish":[
#      {
#        "provider":"",  // 服务器提供商 也可以是GitHub等等
#        "url":""  // 服务器地址
#      }
#    ]
#  }

### 命令行参数（CLI）
## Commands(命令):
# electron-builder build 构建名命
# electron-builder install-app-deps 下载app依赖
# electron-builder node-gyp-rebuild 重建自己本机代码
# electron-builder create-self-signed-cert 为Windows应用程序创建自签名代码签名证书
# electron-builder start  使用electronic-webpack在开发模式下运行应用程序(须臾要electron-webpack模块支持)