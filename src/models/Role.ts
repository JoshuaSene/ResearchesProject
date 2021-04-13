import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm"
import User from './User'

@Entity('role')
class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToMany(type => User, users=> users,
    {cascade:true})
    @JoinTable()
    users: User[]

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date
}
export default Role
