import { Entity } from "../../../../../src/decorator/entity/Entity"
import { Column } from "../../../../../src/decorator/columns/Column"
import { PrimaryGeneratedColumn } from "../../../../../src/decorator/columns/PrimaryGeneratedColumn"

@Entity({ database:  `${(process.env.STRYKER_MUTATOR_WORKER || "0")}/filename-sqlite.attach.db` })
export class Answer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string
}
