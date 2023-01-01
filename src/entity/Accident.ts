import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { SharedProps } from './SharedProps.js';

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
    date: Date


}