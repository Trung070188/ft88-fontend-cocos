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
interface BankDataFt88 {

    id: number;
    label: string;
    value: string;
    stk: string;
    
}

interface BankData {
    id: string;
    shortName: string;    
}

interface BankHistory {
    id: string;
    code: string; 
    status: string,
    confirm: string;
    created_at: string;
    bank_name: string;
    amount: string;
    note: string;   
}
@ccclass('UserDataStore')
export class UserDataStore extends Component {
    private static _instance: UserDataStore | null = null;
    public data: UserData | null = null;
    public dataBankFt88: Array<BankDataFt88> = [];
    public dataBank: Array<BankData> = [];
    public dataHistory: Array<BankHistory> = [];

    @property({type: String})
    public URL_API:String = 'https://ft88.net';
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
    public addDataBankFt88(data: BankDataFt88) {
        this.dataBankFt88.push(data);
    }

    public setDataBankFt88(data: Array<BankDataFt88>) {
        this.dataBankFt88 = data;
    }

    public getDataBankFt88(): Array<BankDataFt88> {
        return this.dataBankFt88;
    }
    public setDataBank(data: Array<BankData>) {
        this.dataBank = data;
    }

    public getDataBank(): Array<BankData> {
        return this.dataBank;
    }

    public setDataHistory(data: Array<BankHistory>) {
        this.dataHistory = data;
    }

    public getDataHistory(): Array<BankHistory> {
        return this.dataHistory;
    }
    
}




