import { _decorator, Component, Label, Node } from 'cc';
import { HomeController } from './HomeController';
const { ccclass, property } = _decorator;

@ccclass('HomeUserInfo')
export class HomeUserInfo extends Component {

    @property({type: Label})
    AccountLabel: Label;

    protected start(): void {

      
    }


}


