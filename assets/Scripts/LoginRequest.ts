import { _decorator, Component, director, EditBox, instantiate, Node, Prefab } from 'cc';
import { Cokkies } from './Cokkies';
import { UserDataStore } from './UserDataStore';
const { ccclass, property } = _decorator;

@ccclass('LoginRequest')
export class LoginRequest extends Component {
    public _login: String = '';
    public _password: String = '';
    @property({type: EditBox})
    password: EditBox;
    @property({type: Prefab})
    loading: Prefab;
    @property({type: Node})
    canvas: Node;


    editInputingUsername(input: string, event: EditBox, custom: string){
        this._login = input;
    }
    editInputingPassword(input: string, event: EditBox, custom: string){
        this._password = input;
    }
    // request login 
    async LoginReq()
    {
        const loading = instantiate(this.loading);
        loading.setParent(this.canvas);

       await fetch(`${UserDataStore.instance.URL_API}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                login: this._login,
                password: this._password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        
        })
        .then(data => {
            const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            Cokkies.setCookie("token", data.access_token, 1);
            Cokkies.setCookie("tokenExpiry", expiryTime.toString(), 1);
            loading.destroy();
            director.loadScene("scene");
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }
    public btnRegister()
    {
        director.loadScene("Register");
    }
    public btnLoadSceneHome()
    {
        director.loadScene("scene");
    }
    public btnShowPass()
    {
        this.password.inputFlag = EditBox.InputFlag.DEFAULT;
    }
   
}


