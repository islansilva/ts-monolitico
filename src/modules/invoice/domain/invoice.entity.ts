import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import InvoiceItems from "./invoice-items.entity";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _document:string;
    private _address: Address;
    private _items: InvoiceItems[];

    constructor(invoiceProps: InvoiceProps) {
        super(invoiceProps.id, invoiceProps.createdAt, invoiceProps.updatedAt);
        this._name = invoiceProps.name;
        this._document = invoiceProps.document;
        this._address = invoiceProps.address;
        this._items = invoiceProps.items;
        this.validate();
    }

    validate(): void {
        if(this._name.length === 0) {
            throw new Error("Name is required")
        }

        if(this._document.length === 0) {
            throw new Error("Document is required")
        }

        if(this._address === undefined) {
            throw new Error("Address is required")
        }

        if(this._items.length === 0) {
            throw new Error("Item is required")
        }
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): InvoiceItems[] {
        return this._items;
    }

    public totalInvoice(): number {
        return this._items.reduce((acc, item) => acc + item.price , 0);
    }
    
}