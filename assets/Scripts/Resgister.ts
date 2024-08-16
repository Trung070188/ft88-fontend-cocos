import { _decorator, Component, EditBox, Node, AsyncDelegate, director, Prefab, instantiate, Label } from 'cc';
import { Cokkies } from './Cokkies';
import { UserDataStore } from './UserDataStore';
const { ccclass, property } = _decorator;

@ccclass('Resgister')
export class Resgister extends Component {
    public _login: String = '';
    public _password: String = '';
    public _phone: String = '';
    public _accountType = 0;
    @property({type: EditBox})
    password: EditBox;
    @property({type:Prefab})
    message:Prefab;
    @property({type: Node})
    canvas: Node;
    @property({type: Prefab})
    loading: Prefab;
    @property({type: Prefab})
    messageWarning: Prefab;

    editInputingUsername(input: string, event: EditBox, custom: string){
        this._login = input;
    }
    editInputingPassword(input: string, event: EditBox, custom: string){
        this._password = input;
    }
    editInputingPhone(input:String , event: EditBox, custom: string){
        this._phone = input;
    }
    public async btnRegister()
    {
        const loading = instantiate(this.loading);
        loading.setParent(this.canvas);

        await fetch(`${UserDataStore.instance.URL_API}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: this._login,
                password: this._password,
                phone: this._phone,
                account_type: 0
            })
        })
        .then(response => {
            if (!response.ok) {


                const notiMessage1 = instantiate(this.messageWarning);
                notiMessage1.getChildByName("Label").getComponent(Label).string = "Đăng ký không thành công!"
                notiMessage1.setParent(this.canvas);
                this.scheduleOnce(() => {
                    notiMessage1.destroy();
                },1)
                this.scheduleOnce(() => {
                    loading.destroy();
                },1)
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        
        })
        .then(data => {
            const notiMessage = instantiate(this.message);
            notiMessage.getChildByName("Label").getComponent(Label).string = "Đăng ký thành công!"
            notiMessage.setParent(this.canvas);
            this.scheduleOnce(() => {
                notiMessage.destroy();
            },1)
            this.scheduleOnce(() => {
                loading.destroy();
                director.loadScene("scene");
            },1)

        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }
    public nextSceneLogin()
    {
        director.loadScene("Login");
    }
    public nextSceneHome()
    {
        director.loadScene("scene");
    }
}


