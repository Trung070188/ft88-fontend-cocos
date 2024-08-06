import { _decorator, AsyncDelegate, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HttpRequest')
export class HttpRequest extends Component {
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

    update(deltaTime: number) {
        
    }
    banks()
    {
        fetch("http://localhost:8487/api/banks", {
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


