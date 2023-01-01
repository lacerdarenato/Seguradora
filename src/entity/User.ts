import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum UserType{
    client = 'client',
    third = 'third',
}

@Entity({name: 'user'})
export class User {

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
