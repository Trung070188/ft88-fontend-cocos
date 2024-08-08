import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TableManager')
export class TableManager extends Component {
    @property(Prefab)
    tableRowPrefab: Prefab = null!;

    @property(Node)
    tableContainer: Node = null!;

    start() {
        const data = [
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
            { code: 'John', status: "Done", date:"17/09/2024", bank: "Agribank", amount: "1.000.000", des:"Abc" },
        ];

        this.renderTable(data);
    }

    renderTable(data: Array<{ code: string, status: string, date: string, bank: string, amount: string, des: string }>) {
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
            dateLabel.string = rowData.date;
            bankLabel.string = rowData.bank;
            amountLabel.string = rowData.amount;
            desLabel.string = rowData.des;




            // Thêm row vào container
            this.tableContainer.addChild(newRow);
        }
    }
}


