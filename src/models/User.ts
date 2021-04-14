import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, Unique } from "typeorm";
import {Exclude} from 'class-transformer'
import Token from "./Token";
import Role from "./Role";

import { IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator'
import Review from './review';
import Brand from "./Brand";
@Entity('users')

@Unique(["document"])
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @IsNotEmpty()
    name: string

    @Column({default: true})
    status: Boolean

    @Column()
    @Exclude()
    @MinLength(8, {
    message: 'Title is too long',
  })
    @MaxLength(30)
    password: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    document: string

    @Column()
    contact_phone: string

    @ManyToMany(type => Role, roles => Role)
    roles: Role[]

    @OneToMany(type => Token, token => Token )
    token: Token[]

    @OneToMany(type => Review, review => Review )
    review: Review[]

    @OneToMany(type => Brand, brand => Brand )
    brand: Brand[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}

export default User
