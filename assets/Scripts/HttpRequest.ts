import { _decorator, AsyncDelegate, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HttpRequest')
export class HttpRequest extends Component {
    private _isReturn = false;
    public _login: String = "";
    public _password: String = "";
    start() {
        // fetch("http://localhost:8487/api/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //       },
        //       body: JSON.stringify({
        //         login: 'fb68@gmail.com',
        //         password: 'trungnguyen'
        //     })
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json(); 
        
        // })
        // .then(data => {
        //     localStorage.setItem("token", data.access_token);
        // })
        // .catch(error => {
        //     console.log('Request failed', error);
        // });
        // this.banks();
    }

    editInputing(input: string, event: EditBox, custom: string){
        this._login = input;
    }
    editBegan(event: EditBox, custom: string){
       console.log("bắt đầu chỉnh sửa");
    }

    editEnd(event: EditBox, custom: string) {
        // if(this._isReturn){
        //     return;
        // }
        console.log("_login: " + this._login);
        console.log("kết thúc chỉnh sửa");
    }

    editReturn(event: EditBox, custom: string){
        this._isReturn = true;
        console.log("_login: " + this._login);
        console.log("xác nhận enter");
    }

    update(deltaTime: number) {
        
    }
    async banks()
    {
       await fetch("http://localhost:8487/api/banks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
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
}


