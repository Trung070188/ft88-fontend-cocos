import { _decorator, Component, EditBox, Node, AsyncDelegate, director, Prefab, instantiate, Label, sys } from 'cc';
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
        const lowercaseLogin = this._login.toLowerCase();
        const lowercasePassword = this._password.toLowerCase();


        await fetch(`${UserDataStore.instance.URL_API}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: lowercaseLogin,
                password: lowercasePassword,
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
                this.LoginReq(loading);
            },1)

        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }
    async LoginReq(loading: Node) {
        const lowercaseLogin = this._login.toLowerCase();
        const lowercasePassword = this._password.toLowerCase();

        try {
            const response = await fetch(`${UserDataStore.instance.URL_API}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    login: lowercaseLogin,
                    password: lowercasePassword
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error || 'An unknown error occurred';
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
            }
    
            const data = await response.json();
            console.log('Login successful:', data);
    
            const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            Cokkies.setCookie("token", data.access_token, 1);
            Cokkies.setCookie("tokenExpiry", expiryTime.toString(), 1);
            
            sys.localStorage.setItem('savedLogin', lowercaseLogin);
            sys.localStorage.setItem('savedPassword', lowercasePassword);
            loading.destroy();
            director.loadScene("scene");

       
        } catch (error) {
            console.error('Login failed:', error);
        } 
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


