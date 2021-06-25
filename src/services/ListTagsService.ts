import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../reporitories/TagsRepositories";
import {classToPlain} from "class-transformer";


class ListTagsService{

    async execute(){
        const tagsRepositories = getCustomRepository(TagsRepositories)

        const tags = tagsRepositories.find()

        return classToPlain(tags);
    }

}
export {ListTagsService};