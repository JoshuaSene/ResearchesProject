import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import User from './User';

@Entity('token')
class Token {

    @PrimaryGeneratedColumn('uuid')
    tokenId: string

    @ManyToOne(type => User, () => Token )
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId: User

    @Column()
    token: string

    @Column()
    tokenStatus: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @CreateDateColumn()
    expires: Date



}
export default Token
