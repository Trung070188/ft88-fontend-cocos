import { _decorator, Canvas, Component, director, instantiate, Label, Node, Prefab } from 'cc';
import { HomeController } from './HomeController';
import { UserDataStore } from './UserDataStore';
import { Cokkies } from './Cokkies';
const { ccclass, property } = _decorator;

@ccclass('UserInfoCtr')
export class UserInfoCtr extends Component {
    @property({type: Label})
    userInfo: Label;
    @property({type: Label})
    username: Label;
    @property({type: Label})
    account: Label;
    @property({type: Label})
    accountType: Label;
    @property({type: Label})
    password: Label;
    @property({type: Label})
    email: Label;
    @property({type: Label})
    phone: Label;
    @property({type: Node})
    popupInfo: Node;
    @property({type: Label})
    userAccountInfo: Label;
    @property(Node)
    copyAccount: Node = null;
    @property(Node)
    copyPassword: Node = null;
    @property({type: Prefab})
    message:Prefab;
    @property({type: Node})
    canvas: Node;

    
    start() {
        this.popupInfo.active = false;
        let data = UserDataStore.instance.data;
        this.userInfo.string = data.username;
        this.username.string = data.username;
        this.accountType.string = data.account_type;
        this.account.string = data.account;
        this.userAccountInfo.string = data.account;
        this.password.string = data.password;
        this.email.string = data.email;
        this.phone.string = data.phone;
        this.copyAccount.on(Node.EventType.TOUCH_END, this.onCopyAccount, this);
        this.copyPassword.on(Node.EventType.TOUCH_END, this.onCopyPassword, this);

    }

    update(deltaTime: number) {
        
    }
    btnClose()
    {
        director.loadScene("scene");
    }
    btnUserInfo()
    {
        this.popupInfo.active = true;
    }
    btnOut()
    {
        this.popupInfo.active = false;
    }
    onCopyAccount() {
        if (this.account) {
            this.copyTextToClipboard(this.account.string);
        }
    }
    onCopyPassword() {
        if (this.password) {
            this.copyTextToClipboard(this.password.string);
        }
    }
    copyTextToClipboard(text: string) {
        if (!text) return;
        
      
        let textArea = document.createElement("textarea");
        textArea.value = text;
        
        document.body.appendChild(textArea);
        
        textArea.select();
        
        try {
            document.execCommand('copy');
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    }
    btnNapRut()
    {
        director.loadScene("NapRut");
    }
    btnHistory()
    {
        director.loadScene("LichSuGD")
    }
    btnLogout()
    {
        Cokkies.eraseCookie("token");
        Cokkies.eraseCookie("tokenExpiry");
        director.loadScene("scene");
    }
    
}


