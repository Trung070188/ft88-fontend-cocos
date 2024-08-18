import { _decorator, Component, Director, director, EventTouch, Label, native, Node, Scene, sys } from 'cc';
import { Cokkies } from './Cokkies';
import { UserDataStore } from './UserDataStore';
const { ccclass, property } = _decorator;
@ccclass('HomeController')
export class HomeController extends Component {

    @property({type: Label})
    userInfoName: Label;
    @property({type: Node})
    Register: Node;
    @property({type: Node})
    Login: Node;
    @property({type: Node})
    NodeInfo: Node;
    @property({type: Node})
    CashIn: Node;
    @property({type: Node})
    IconInfo: Node;
    @property({type: Label})
    account: Label;
    @property({type: Node})
    sidePopup: Node;

    protected onLoad(): void {
        // if(sys.isMobile)
        // {
        //     this.openURL("https://ft88.xyz/download-android/")
        // }
        this.NodeInfo.active = false;
        this.sidePopup.active = false;
        const token = Cokkies.getCookie("token");
        const tokenExpiry = Cokkies.getCookie("tokenExpiry");
        if(token && tokenExpiry && new Date().getTime() < parseInt(tokenExpiry))
        {
            this.Login.active = false;
            this.Register.active = false;
            this.CashIn.active = true;
            if(UserDataStore.instance.data == null)
            {
                fetch(`${UserDataStore.instance.URL_API}/api/showInfo`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cokkies.getCookie("token")}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    UserDataStore.instance.setData(data.data);
                    this.userInfoName.string = UserDataStore.instance.data.username;
                })
                .catch(error => {
                    console.log('Request failed', error);
                });
            } 
            else {
                this.userInfoName.string = UserDataStore.instance.data.username;
            } 
        }
        else {
            Cokkies.eraseCookie("token");
            Cokkies.eraseCookie("tokenExpiry");
            this.Login.active = true;
            this.Register.active = true;
            this.userInfoName.node.parent.active = false;
            this.CashIn.active = false;    
        }
    }

    start() {
       
    }

    update(deltaTime: number) {
        
    }
    btnRegister()
    {
        director.loadScene("Register");
    }
    btnLogin()
    {
        director.loadScene("Login")
    }
    btnInfo()
    {
        this.NodeInfo.active = true;
        this.account.string = UserDataStore.instance.data.account;
    }
    btnTestOut()
    {
        this.NodeInfo.active = false;
        this.sidePopup.active = false;
    }
    btnIconInfo()
    {
        director.loadScene("userInfo");
    }
    btnShowSidePopup()
    {
        this.sidePopup.active = true;
    }
    btnNapRut()
    {
        director.loadScene("NapRut");

    }
    btnHistory()
    {
        director.loadScene("LichSuGD");
    }
    btnLogOut()
    {
        Cokkies.eraseCookie("token");
        Cokkies.eraseCookie("tokenExpiry");
        director.loadScene("scene");

    }
    btnClickLink()
    {
        this.NodeInfo.active = false;
        this.sidePopup.active = false;

        fetch(`${UserDataStore.instance.URL_API}/api/link-urls`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cokkies.getCookie("token")}`
            }
        })
        .then(response => {
            if (!response.ok) {
                director.loadScene("Login")
                throw new Error('Network response was not ok');

            }
            return response.json();
        })
        .then(data => {
           let link_url = data.data[0].link_url;
           if(link_url)
           {
                if(sys.isMobile)
                {
                    this.openURL(link_url);

                }
                else {
                    this.openURLWin(link_url);

                }
           }
           else{
                console.log("error");
           }
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }
    openURL(url: string) {
        if (sys.isBrowser) {
            // window.open(url, '_blank');
        } else if (sys.isNative) {
            if (sys.platform === sys.Platform.ANDROID) {
                // console.log("Android");
                // native.reflection.callStaticMethod("com/cocos/game/AppActivity", "openURL", "(Ljava/lang/String;)V", "https://ft88.xyz/download-android");
            } else if (sys.platform === sys.Platform.IOS) {
                // console.log("IOS");
                // native.reflection.callStaticMethod("AppController", "openURL:", url);
                // native.reflection.callStaticMethod("com/cocos/game/AppActivity", "openURL", "(Ljava/lang/String;)V", "https://example.com");

            }
        }
        if (sys.os === "Android") {
            window.location.href = "https://ft88.xyz/download-android";

        } else if (sys.os === "iOS") {
            window.location.href = "https://www.winwin999.net/DownloadPage/AppDownload_M?site=viva88&platform=ios&lang=en";
        } 
       
    }
    openURLWin(url: string): void {
         window.open(url, '_blank');
    }
    btnNextSupport()
    {
        let url = "https://t.me/ft88cskh";
        if(sys.isBrowser)
        {
            window.open(url, '_blank');

        }
        else {
            window.location.href = url;
        }
        // if (sys.isBrowser) {
            // window.open(url, '_blank');
        // } else if (sys.isNative) {
        //     if (sys.platform === sys.Platform.ANDROID) {
        //         // console.log("Android");
        //         // native.reflection.callStaticMethod("com/cocos/game/AppActivity", "openURL", "(Ljava/lang/String;)V", "url");
        //     } else if (sys.platform === sys.Platform.IOS) {
        //         // console.log("IOS");
        //         // native.reflection.callStaticMethod("AppController", "openURL:", url);
        //         // native.reflection.callStaticMethod("com/cocos/game/AppActivity", "openURL", "(Ljava/lang/String;)V", "https://example.com");

        //     }
        // }
        // if (sys.os === "Android") {
        //     window.location.href = url;

        // } else if (sys.os === "iOS") {
        //     window.location.href = "https://www.winwin999.net/DownloadPage/AppDownload_M?site=viva88&platform=ios&lang=en";
        // } 
    }
   
}


