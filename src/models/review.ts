import { IsNumber, MaxLength } from "class-validator"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import Brand from "./Brand"
import User from './User'

@Entity('review')
class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @MaxLength(2)
    @IsNumber()
    evaluationNote: number

    @Column('text')
    comment: string

    @Column({default: true})
    status: Boolean

    @OneToMany(type => User, () => User)
    review: User[]

    @ManyToOne(type => User, () => Review )
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    userId: User

    @ManyToOne(type => Brand, () => Brand )
    @JoinColumn({name: 'brand_id', referencedColumnName: 'id'})
    brandId: Brand

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date
}
export default Review


//expiration gtc (aberto até que concluido ou cancelado) e day (para o dia, fechou mercado a order vai embora)
//
