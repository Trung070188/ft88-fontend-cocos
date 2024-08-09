import { _decorator, Component, director, Label, Node } from 'cc';
import { HomeController } from './HomeController';
import { UserDataStore } from './UserDataStore';
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
}


