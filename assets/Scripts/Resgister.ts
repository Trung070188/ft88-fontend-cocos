import { _decorator, Component, EditBox, Node, AsyncDelegate, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Resgister')
export class Resgister extends Component {
    public _login: String = '';
    public _password: String = '';
    public _phone: String = '';
    public _accountType = 0;
    @property({type: EditBox})
    password: EditBox;

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

        await fetch("http://localhost:8487/api/register", {
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
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        
        })
        .then(data => {
            console.log(data);
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


