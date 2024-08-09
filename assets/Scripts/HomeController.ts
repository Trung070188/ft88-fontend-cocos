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

    protected onLoad(): void {
        this.NodeInfo.active = false;
        const token = Cokkies.getCookie("token");
        const tokenExpiry = Cokkies.getCookie("tokenExpiry");
        if(token && tokenExpiry && new Date().getTime() < parseInt(tokenExpiry))
        {
            this.Login.active = false;
            this.Register.active = false;
            this.CashIn.active = true;
    
            fetch("http://localhost:8487/api/showInfo", {
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
    }
    btnIconInfo()
    {
        director.loadScene("userInfo");
    }
   
}

