import { _decorator, Component, director, Label, Node } from 'cc';
import { HomeController } from './HomeController';
import { UserDataStore } from './UserDataStore';
const { ccclass, property } = _decorator;

@ccclass('UserInfoCtr')
export class UserInfoCtr extends Component {
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
    start() {
        this.username.string = UserDataStore.instance.data.username;
        this.accountType.string = UserDataStore.instance.data.account_type;
        this.account.string = UserDataStore.instance.data.account;
        this.password.string = UserDataStore.instance.data.password;
        this.email.string = UserDataStore.instance.data.email;
        this.phone.string = UserDataStore.instance.data.phone;
    }

    update(deltaTime: number) {
        
    }
    btnClose()
    {
        director.loadScene("scene");
    }
}


