import { _decorator, Component, EditBox, Node } from 'cc';
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
        
       await fetch("https://ft88.net/api/login", {
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
            localStorage.setItem("token", data.access_token);
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }
   
}


