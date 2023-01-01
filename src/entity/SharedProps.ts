import { UpdateDateColumn, CreateDateColumn } from 'typeorm'

export class SharedProps {

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'datetime',
        name: 'created_at',
    })
    createdAt: Date

    @UpdateDateColumn({
        default: () => 'CURRENT_TIMESTAMP',
        type: 'datetime',
        name: 'ipdated_at',
    })
    updatedAt: Date
}