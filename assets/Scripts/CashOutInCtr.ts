import { _decorator, Button, Canvas, Component, director, EditBox, EventHandler, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, Toggle, ToggleContainer } from 'cc';
import { Cokkies } from './Cokkies';
import { UserDataStore } from './UserDataStore';
const { ccclass, property } = _decorator;

@ccclass('CashOutInCtr')
export class CashOutInCtr extends Component {
    public _account: String = '';
    public _banks: String = '';
    public _stkAdmin: String = '';
    public _userSend: String = '';
    public _amount: String = '';
    public _note: String = '';
    public _bank_id: String= '';
    @property({type: Node})
    bankContainer: Node;
    @property({type: Prefab})
    bankPrefab: Prefab;
    @property({type: Node})
    OptionBanks: Node;
    @property({type: Label})
    bankLabelCashIn: Label;
    @property({type: Label})
    bankLabelCashOut: Label;
    @property({type:Label})
    stkLabel: Label;
    @property({type: Prefab})
    messageSend: Prefab;
    @property({type: Node})
    canvas: Node;
    @property({type: SpriteFrame})
    chooseCash: SpriteFrame;
    @property({type: SpriteFrame})
    notChooseCash: SpriteFrame;
    @property({type: Button})
    cashInButton: Button;
    @property({type: Button})
    cashOutButton: Button;
    @property({type: Node})
    groupFormCashIn: Node;
    @property({type: Node})
    groupFormCashOut: Node;
    @property({type: Node})
    groupFormCashInLabel: Node;
    @property({type: Node})
    groupFormCashOutLabel: Node;
    @property({type: Button})
    CashIn: Button;
    @property({type: Button})
    CashOut: Button;
    typeCash: number = 1;
    @property({type: Prefab})
    loading: Prefab;
    
    start() {

        this.OptionBanks.active = false;
        this.CheckCashCashOut();
      
    }

   async CheckCashCashOut()
    {
        if(this.typeCash == 1)
        {
            if(UserDataStore.instance.dataBank.length == 0)
                {
                   await fetch(`${UserDataStore.instance.URL_API}/api/banks`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${Cokkies.getCookie("token")}`
                        }
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        UserDataStore.instance.setDataBankFt88(data.data);
                        this.renderTableFt88(data.data);
                    })
                    .catch(error => {
                        console.log('Request failed', error);
                    });
                }
                else {
                    this.renderTableFt88(UserDataStore.instance.getDataBankFt88());
                }
        }
        else {
            this.callApiBankQr();
        }
        

            
    }
    async callApiBankQr()
    {
       await fetch("https://api.vietqr.io/v2/banks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            UserDataStore.instance.setDataBank(data.data);
            this.renderTable(data.data);
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }

    update(deltaTime: number) {
        
    }
    editInputingAccount(input: string, event: EditBox, custom: string){
        this._account = input;
    }
    editInputingBanks(input: string, event: EditBox, custom: string){
        this._banks = input;
    }
    editInputingStkAdmin(input:String , event: EditBox, custom: string){
        this._stkAdmin = input;
    }
    editInputingUserSend(input:String , event: EditBox, custom: string){
        this._userSend = input;
    }
    editInputingAmount(input:String , event: EditBox, custom: string){
        this._amount = input;
    }
    editInputingNote(input:String , event: EditBox, custom: string){
        this._note = input;
    }
    

    clickShowOption()
    {
        this.OptionBanks.active = true;
    }


    renderTableFt88(data: Array<{ id:number, label: string, value: string, stk: String}>) {
        this.bankContainer.removeAllChildren();

        for (let i = 0; i < data.length; i++) {
            const rowData = data[i];

            const newRow = instantiate(this.bankPrefab);
            const button = newRow.getComponent(Button);
            if (button) {
                const clickEventHandler = new EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = 'CashOutInCtr';
                clickEventHandler.handler = 'onBankButtonClicked';
                button.clickEvents.push(clickEventHandler);
                button.clickEvents.forEach(eventHandler => {
                    eventHandler.customEventData = rowData.id.toString();
                });
            }
            const codeLabel = newRow.getChildByName('BankName')!.getComponent(Label)!;
            codeLabel.string = rowData.label;
          
            this.bankContainer.addChild(newRow);
        }
    }
    renderTable(data: Array<{ id:number, shortName: string}>) {
        this.bankContainer.removeAllChildren();

        for (let i = 0; i < data.length; i++) {
            const rowData = data[i];

            const newRow = instantiate(this.bankPrefab);
            const button = newRow.getComponent(Button);
            if (button) {
                const clickEventHandler = new EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = 'CashOutInCtr';
                clickEventHandler.handler = 'onBankButtonClicked';
                button.clickEvents.push(clickEventHandler);
                button.clickEvents.forEach(eventHandler => {
                    eventHandler.customEventData = rowData.id.toString();
                });
            }
            const codeLabel = newRow.getChildByName('BankName')!.getComponent(Label)!;
            codeLabel.string = rowData.shortName;
          
            this.bankContainer.addChild(newRow);
        }
    }
    onBankButtonClicked(event: Event, customEventData: string) {

        if(this.typeCash == 1)
        {
            UserDataStore.instance.dataBankFt88.forEach((item) => {
                if(item.id == parseInt(customEventData))
                {
                    this._banks = item.label;
                    this._stkAdmin = item.stk;
                    this.bankLabelCashIn.string = item.label;
                    this.stkLabel.string = item.stk;
    
                    this._bank_id = item.value;
                }
            })
    
        }
        else {
            UserDataStore.instance.dataBank.forEach((item) => {
                if(item.id == customEventData)
                {
                    this._banks = item.shortName;
                    this.bankLabelCashOut.string = item.shortName;
                    this._bank_id = item.id;
                }
            })

        }
       
        this.OptionBanks.active = false;
        
    }
    async btnCashIn()
    {
        const loading = instantiate(this.loading);
        loading.setParent(this.canvas);

        await fetch(`${UserDataStore.instance.URL_API}/api/transactions/deposit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cokkies.getCookie("token")}`
            },
            body: JSON.stringify({
                "user_account" : this._account,
                "bank_account_receiver": this._stkAdmin,
                "amount": this._amount,
                "name_user": this._userSend,
                "transaction_note": this._note,
                "bank_id" : this._bank_id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const notiMessage = instantiate(this.messageSend);
            notiMessage.setParent(this.canvas)
            console.log(data);

            setTimeout(() => {
                notiMessage.destroy();
            }, 2000)
            this.scheduleOnce(() => {
                loading.destroy();
                director.loadScene("NapRut")
            }, 1)
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }
    async btnCashOut()
    {
        const loading = instantiate(this.loading);
        loading.setParent(this.canvas);

       await fetch(`${UserDataStore.instance.URL_API}/api/transactions/withdrawal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cokkies.getCookie("token")}`
            },
            body: JSON.stringify({
                "user_account" : this._account,
                "bank_account_receiver": this._stkAdmin,
                "amount": this._amount,
                "name_user": this._userSend,
                "bank_id" : this._bank_id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const notiMessage = instantiate(this.messageSend);
            notiMessage.setParent(this.canvas)
            setTimeout(() => {
                notiMessage.destroy();
            }, 2000)
            this.scheduleOnce(() => {
                loading.destroy();
                director.loadScene("NapRut")
            }, 1)
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }
    buttonEventTypeTransaction(event: Event, customEventData: string)
    {

        this.OptionBanks.active = false;
        this.bankContainer.removeAllChildren();

        if(customEventData == "1")
        {
            this.typeCash = 1;
            this.cashInButton.getComponent(Sprite).spriteFrame = this.chooseCash;
            this.cashOutButton.getComponent(Sprite).spriteFrame = this.notChooseCash;
            this.groupFormCashIn.active = true;
            this.groupFormCashInLabel.active = true;
            this.CashIn.node.active = true;

            this.groupFormCashOut.active = false;
            this,this.groupFormCashOutLabel.active = false;
            this.CashOut.node.active = false;
        }
        else{
            this.typeCash = 2;
            this.cashOutButton.getComponent(Sprite).spriteFrame = this.chooseCash;
            this.cashInButton.getComponent(Sprite).spriteFrame = this.notChooseCash;
            this.groupFormCashIn.active = false;
            this.groupFormCashInLabel.active = false;
            this.CashIn.node.active = false;

            this.groupFormCashOut.active = true;
            this,this.groupFormCashOutLabel.active = true;
            this.CashOut.node.active = true;

        }
        this.CheckCashCashOut();
    }
    btnClose()
    {
        director.loadScene("scene");
    }

}


