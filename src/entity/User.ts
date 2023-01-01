import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { SharedProps } from "./SharedProps.js"
import { Vehicle } from "./Vehicle.js"

export enum UserType {
    client = 'client',
    third = 'third',
}

@Entity({ name: 'user' })
export class User extends SharedProps {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'cpf', nullable: false }) 
    cpf: string;

    @Column({ name: 'first_name', nullable: false })
    firstName: string;

    @Column({ name: 'last_name', nullable: false })
    lastName: string;

    @Column({ name: 'phone', nullable: false })
    phone: string;

    @Column({ default: UserType.client, enum: UserType, type: 'enum', nullable: false })
    type: UserType;

    @OneToMany('Vehicle', 'user')
    vehicle: Array<Vehicle>;
}
