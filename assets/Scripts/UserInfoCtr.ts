import { _decorator, Component, Node } from 'cc';
import { HomeController } from './HomeController';
import { UserDataStore } from './UserDataStore';
const { ccclass, property } = _decorator;

@ccclass('UserInfoCtr')
export class UserInfoCtr extends Component {
    start() {
        console.log("dataUserInfo: " + JSON.stringify(UserDataStore.instance.getData()));
    }

    update(deltaTime: number) {
        
    }
}


