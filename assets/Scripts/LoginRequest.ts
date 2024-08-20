import { _decorator, Component, director, EditBox, instantiate, Label, Node, Prefab, sys } from 'cc';
import { Cokkies } from './Cokkies';
import { UserDataStore } from './UserDataStore';
const { ccclass, property } = _decorator;


@ccclass('LoginRequest')
export class LoginRequest extends Component {
    @property({type: EditBox})
    loginInput: EditBox;
    @property({type: EditBox})
    password: EditBox;
    @property({type: Prefab})
    loading: Prefab;
    @property({type: Node})
    canvas: Node;
    @property({type: Prefab})
    messageSuccess: Prefab;
    @property({type: Prefab})
    messageWarning: Prefab;

    start() {
        this.fillSavedLoginInfo();
    }

    fillSavedLoginInfo() {
        const savedLogin = sys.localStorage.getItem('savedLogin');
        const savedPassword = sys.localStorage.getItem('savedPassword');
        
        if (savedLogin) {
           this.loginInput.string = savedLogin.toLowerCase();
        }
        if (savedPassword) {
            this.password.string = savedPassword.toLowerCase();
        }
    }

    editInputingUsername(input: string, event: EditBox, custom: string){
    }

    editInputingPassword(input: string, event: EditBox, custom: string){
    }

    async LoginReq() {
        const loading = instantiate(this.loading);
        loading.setParent(this.canvas);
        const lowercaseLogin = this.loginInput.string.toLowerCase();
        const lowercasePassword = this.password.string.toLowerCase();
    
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
                
                const notiMessage = instantiate(this.messageWarning);
                notiMessage.getChildByName("Label").getComponent(Label).string = errorMessage;
                
                notiMessage.setParent(this.canvas);
                setTimeout(() => {
                    notiMessage.destroy();
                }, 2000);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
            }
    
            const data = await response.json();
            console.log('Login successful:', data);
    
            const expiryTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            Cokkies.setCookie("token", data.access_token, 1);
            Cokkies.setCookie("tokenExpiry", expiryTime.toString(), 1);
            
            sys.localStorage.setItem('savedLogin', this.loginInput.string);
            sys.localStorage.setItem('savedPassword', this.password.string);
            const notiMessage1 = instantiate(this.messageSuccess);
            notiMessage1.getChildByName("Label").getComponent(Label).string = "Login thành công !"
            notiMessage1.setParent(this.canvas)
            setTimeout(() => {
                notiMessage1.destroy();
            }, 2000)
            loading.destroy();
            director.loadScene("scene");
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            loading.destroy();
        }
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