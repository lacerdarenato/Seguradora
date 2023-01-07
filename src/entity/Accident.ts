import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { SharedProps } from './SharedProps.js';
import { Vehicle } from './Vehicle.js';

@Entity({ name: 'accident' })
export class Accident extends SharedProps {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, generated: true })
    sinister: number;

    @Column({
        name: 'date',
        type: 'date',
        nullable: false
    })
    date: Date;

    @ManyToMany((type) => Vehicle, (vehicle) => vehicle.id, { eager: true })
    @JoinTable()
    vehicles: Array<Vehicle>;

    // addVehicle(vehicle: Vehicle) {
    //     if (this.vehicles == null) {
    //         this.vehicles = new Array<Vehicle>();
    //     }
    //     this.vehicles.push(vehicle)
    // };
}