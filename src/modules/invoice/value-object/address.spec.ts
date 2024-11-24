import Address from "./address"

describe("Address unit test", () => {

    it("should create a address", () => {
        const address = new Address({
            street: "Street 1",
            number: "1",
            zip: "Zip 1",
            city: "City 1",
            state: "State 1",
            complement: "Compl 1"
        })

        expect(address.city).toBe("City 1");
        expect(address.number).toBe("1");
        expect(address.street).toBe("Street 1");
        expect(address.zip).toBe("Zip 1");
        expect(address.state).toBe("State 1");
        expect(address.complement).toBe("Compl 1");
    })

    it("should not create a address", () => {

        expect(() => {
            new Address({
                street: "Street 1",
                number: "",
                zip: "Zip 1",
                city: "City 1",
                state: "State 1",
                complement: "Compl 1"
            })
        }).toThrowError("Number is required");

        expect(() => {
            new Address({
                street: "",
                number: "1",
                zip: "Zip 1",
                city: "City 1",
                state: "State 1",
                complement: "Compl 1"
            })
        }).toThrowError("Street is required");

        expect(() => {
            new Address({
                street: "Street 1",
                number: "1",
                zip: "Zip 1",
                city: "",
                state: "State 1",
                complement: "Compl 1"
            })
        }).toThrowError("City is required");

        expect(() => {
            new Address({
                street: "Street 1",
                number: "1",
                zip: "Zip 1",
                city: "City 1",
                state: "",
                complement: "Compl 1"
            })
        }).toThrowError("State is required");
    

    })


})