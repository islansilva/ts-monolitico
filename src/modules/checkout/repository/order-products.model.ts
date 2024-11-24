import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
    tableName: "orderproducts",
    timestamps: false
})
export default class OrderProductModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id:string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    description: string;

    @Column({allowNull: false})
    salesPrice: number;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: true })
    order_id: string;

    @BelongsTo(() => OrderModel)
    order: Awaited<OrderModel>;
}