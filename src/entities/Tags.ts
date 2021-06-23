import {Entity, PrimaryColumn, CreateDateColumn, Column, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity("tags")
class Tag{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: string;


    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }

}
export {Tag};