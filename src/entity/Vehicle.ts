import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'vehicle'})
export class VehicleEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'model', nullable: false})
    model:string;

    @Column({name:'color', nullable:false})
    color: string;

    @Column({name:'license_plate', nullable:false})
    licensePlate: string;
}