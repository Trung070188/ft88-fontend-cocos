import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
interface UserData {
    id: number;
    username: string;
    email: string | null;
    account: string;
    account_type: string;
    phone: string;
    password: string;
    created_at: string;
}
@ccclass('UserDataStore')
export class UserDataStore extends Component {
    private static _instance: UserDataStore | null = null;
    public data: UserData | null = null;
    protected onLoad(): void {
        
    }

    public static get instance(): UserDataStore {
        if (this._instance === null) {
            this._instance = new UserDataStore();
        }
        return this._instance;
    }

    public setData(data: UserData) {
        this.data = data;
    }

    public getData(): UserData | null {
        return this.data;
    }
    
}




