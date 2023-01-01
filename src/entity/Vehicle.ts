import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
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

    @Column({ name: 'user_cpf', nullable: false})
    userCpf: number

    @ManyToOne(() => User, (user: User) => user.cpf)
    @JoinColumn({ name: 'user_cpf' })
    user: User;

}