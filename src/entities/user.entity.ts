import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';
@Table({
    tableName: 'user',
    timestamps: true,
    paranoid: true,
   
})
export class user extends Model<user> {
    @Column({
        type: DataType.UUID,
        unique: true,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        allowNull:false,
        type: DataType.STRING(30),
    })
    first_name: string;
    
    @Column({
        allowNull:false,
        type: DataType.STRING(30),
    })
    last_name: string;

    @Column({
        allowNull:false,
        unique: true,
        type: DataType.STRING(30),
    })
    user_name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate:{
            isEmail:true
        }
    })
    email: string;

    @Column({
        type: DataType.STRING(255),
    })
    password:string;

    @Column({
        type: DataType.STRING,
    })
    user_profile: string;

    @CreatedAt
    createddate: Date;

    @UpdatedAt
    updateddate: Date;

    rows: any;
}









