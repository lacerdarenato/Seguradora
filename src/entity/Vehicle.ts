import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { SharedProps } from './SharedProps.js';

@Entity({name: 'vehicle'})
export class Vehicle extends SharedProps{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'model', nullable: false})
    model:string;

    @Column({name:'color', nullable:false})
    color: string;

    @Column({name:'license_plate', nullable:false})
    licensePlate: string;
}