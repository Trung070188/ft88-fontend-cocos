import { _decorator, Button, Component, EditBox, EventHandler, instantiate, Label, Node, Prefab, Toggle, ToggleContainer } from 'cc';
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
    @property({type: Node})
    bankContainer: Node;
    @property({type: Prefab})
    bankPrefab: Prefab;
    @property({type: Node})
    OptionBanks: Node;
    start() {
        this.OptionBanks.active = false;
        if(UserDataStore.instance.dataBank.length == 0)
        {
            fetch("http://localhost:8487/api/banks", {
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
                UserDataStore.instance.setDataBank(data.data);
                this.renderTable(data.data);
            })
            .catch(error => {
                console.log('Request failed', error);
            });
        }
        else {
            this.renderTable(UserDataStore.instance.getDataBank());
        }
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
        this._account = input;
    }
    editInputingNote(input:String , event: EditBox, custom: string){
        this._note = input;
    }
    clickShowOption()
    {
        this.OptionBanks.active = true;
    }


    renderTable(data: Array<{ label: string, value: string}>) {
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
                    eventHandler.customEventData = rowData.value;
                });
            }
            const codeLabel = newRow.getChildByName('BankName')!.getComponent(Label)!;
            codeLabel.string = rowData.label;
          
            this.bankContainer.addChild(newRow);
        }
    }
    onBankButtonClicked(event: Event, customEventData: String) {
        console.log('Button clicked! Value:', customEventData);
        
    }

}


