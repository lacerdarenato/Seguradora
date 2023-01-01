import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'accident'})
export class Accident{
    
    @PrimaryGeneratedColumn()
    sinister: number;

}