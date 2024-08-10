import { _decorator, Component, director, instantiate, Label, Node, Prefab } from 'cc';
import { Cokkies } from './Cokkies';
import { UserDataStore } from './UserDataStore';
const { ccclass, property } = _decorator;

@ccclass('TableManager')
export class TableManager extends Component {
    @property(Prefab)
    tableRowPrefab: Prefab = null!;

    @property(Node)
    tableContainer: Node = null!;

    start() {
        // const data = [
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        //     { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        // ];

        // this.renderTable(data);
        this.callApiHistory()
    }
    callApiHistory()
    {
        fetch(`${UserDataStore.instance.URL_API}/api/show-transaction`, {
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
            UserDataStore.instance.setDataHistory(data.data);
            this.renderTable(data.data);
        })
        .catch(error => {
            console.log('Request failed', error);
        });
    }

    renderTable(data: Array<{ code: string, status: string, created_at: string, bank_name: string, amount: string, note: string }>) {
        this.tableContainer.removeAllChildren();

        for (let i = 0; i < data.length; i++) {
            const rowData = data[i];

            const newRow = instantiate(this.tableRowPrefab);

            const codeLabel = newRow.getChildByName('CodeLabel')!.getComponent(Label)!;
            const statusLabel = newRow.getChildByName('StatusLabel')!.getComponent(Label)!;
            const dateLabel = newRow.getChildByName('DateLabel')!.getComponent(Label)!;
            const bankLabel = newRow.getChildByName('BankLabel')!.getComponent(Label)!;
            const amountLabel = newRow.getChildByName('AmountLabel')!.getComponent(Label)!;
            const desLabel = newRow.getChildByName('DesLabel')!.getComponent(Label)!;
            codeLabel.string = rowData.code;
            statusLabel.string = rowData.status;
            dateLabel.string = rowData.created_at;
            bankLabel.string = rowData.bank_name;
            amountLabel.string = rowData.amount;
            desLabel.string = rowData.note;
            // Thêm row vào container
            this.tableContainer.addChild(newRow);
        }
    }
    btnClose()
    {
        director.loadScene("scene");
    }
}


