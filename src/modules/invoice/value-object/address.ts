type AddressProps = {
    street: string;
    number: string;
    complement?: string;
    zip: string;
    city: string;
    state: string
}



export default class Address {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _zip: string;
    private _city: string;
    private _state: string;

    constructor(address: AddressProps) {
        this._city = address.city;
        this._number = address.number;
        this._street = address.street;
        this._zip = address.zip;
        this._state = address.state;
        this._complement = address.complement || "";

        this.validate();
    }

    validate() {
        if(this._street.length === 0) {
            throw new Error("Street is required");
        }

        if(this._city.length === 0 ){
            throw new Error("City is required");
        }

        if(this._number.length === 0) {
            throw new Error("Number is required");
        }

        if(this._state.length === 0) {
            throw new Error("State is required");
        }
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get complement(): string {
        return this._complement;
    }



    toString() {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`
    }
}