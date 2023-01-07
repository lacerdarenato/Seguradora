import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { Accident } from './Accident.js';
import { SharedProps } from './SharedProps.js';
import { User } from './User.js';

@Entity({ name: 'vehicle' })
export class Vehicle extends SharedProps {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'model', nullable: false })
    model: string;

    @Column({ name: 'color', nullable: false })
    color: string;

    @Column({ name: 'license_plate', nullable: false })
    licensePlate: string;

    @Column({name: 'user_Id', nullable: false})
    userId: number;

    @ManyToOne('User', 'vehicle')
    @JoinColumn({name: 'user_Id'})
    user: User;

    @ManyToMany((type) => Accident, (event) => event.id)
    @JoinTable()
    event: Accident[];

}