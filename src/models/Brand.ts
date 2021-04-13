import { IsNotEmpty} from "class-validator"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm"
import Review from "./review"

@Entity('brand')
class Brand {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @IsNotEmpty()
    name: string

    @Column()
    @IsNotEmpty()
    product: string

    @Column({default: true})
    status: Boolean

    @OneToMany(type => Review, () => Review)
    review: Review[]

    @CreateDateColumn()
    created_at: Date

    @CreateDateColumn()
    updated_at: Date
}
export default Brand
