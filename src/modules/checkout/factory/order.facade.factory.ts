import ClientAdmFacadeFactory from "../../client-adm/factory/client.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import OrderFacade from "../facade/order.facade";
import OrderFacadeInterface from "../facade/order.facade.interface";
import OrderRepository from "../repository/order.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class OrderFacadeFactory {

    public static create(): OrderFacadeInterface {

        const clientAdmFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const catalogFacade = StoreCatalogFacadeFactory.create();
        const orderRepository = new OrderRepository();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();

        const placeOrderUseCase = new PlaceOrderUseCase(
            clientAdmFacade,
            productFacade,
            catalogFacade,
            orderRepository,
            invoiceFacade,
            paymentFacade
        )

        return new OrderFacade(placeOrderUseCase);
    }
}