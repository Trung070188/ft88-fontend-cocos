import { _decorator, Component, director, EditBox, Node } from 'cc';
import { Cokkies } from './Cokkies';
const { ccclass, property } = _decorator;

@ccclass('LoginRequest')
export class LoginRequest extends Component {
    public _login: String = '';
    public _password: String = '';
    @property({type: EditBox})
    password: EditBox;

    editInputingUsername(input: string, event: EditBox, custom: string){
        this._login = input;
    }
    editInputingPassword(input: string, event: EditBox, custom: string){
        this._password = input;
    }
    // request login 
    async LoginReq()
    {
        
       await fetch("http://localhost:8487/api/login", {
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


