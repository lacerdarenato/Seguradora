import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { SharedProps } from './SharedProps.js';
import { Vehicle } from './Vehicle.js';

@Entity({ name: 'accident' })
export class Accident extends SharedProps {

    @PrimaryGeneratedColumn()
    sinister: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'date',
        name: 'date',
        nullable: false
    })
    date: Date;

    @ManyToMany(() => Vehicle, (vehicle) => vehicle.id)
    vehicles: Array<Vehicle>;
}