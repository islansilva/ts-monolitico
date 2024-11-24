import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
    tableName: "orderclients",
    timestamps: false
})
export class OrderClientModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    email: string;

    @Column({allowNull: false})
    document: string;

    @Column({allowNull: false})
    street: string;

    @Column({allowNull: false})
    number: number;

    @Column({allowNull: false})
    complement: string;

    @Column({allowNull: false})
    city: string;

    @Column({allowNull: false})
    state: string;

    @Column({allowNull: false})
    zipCode: string;

    @Column({
        allowNull: false,
        type: DataType.DATE
    })
    createdAt: Date;

    @Column({
        allowNull: false,
        type: DataType.DATE
    })
    updatedAt: Date;

    
    @ForeignKey(() => OrderModel)
    @Column({ allowNull: true })
    order_id: string;

    @BelongsTo(() => OrderModel)
    order: Awaited<OrderModel>;   

}