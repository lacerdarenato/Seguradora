import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { SharedProps } from "./SharedProps.js"

export enum UserType{
    client = 'client',
    third = 'third',
}

@Entity({name: 'user'})
export class User extends SharedProps{

    @PrimaryGeneratedColumn()
    cpf: number

    @Column({name: 'first_name', nullable: false})
    firstName: string

    @Column({name: 'last_name', nullable: false})
    lastName: string

    @Column({name: 'phone', nullable: false})
    phone: number

    @Column({default: UserType.client, enum: UserType, type: 'enum', nullable: false})
    type: UserType

}
