import { _decorator, Component, Director, director, EventTouch, Label, Node, Scene } from 'cc';
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
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
           let link_url = data.data[0].link_url;
           if(link_url)
           {
                window.open(link_url, '_blank');
           }
           else{
                console.log("error");
           }
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }
   
}


