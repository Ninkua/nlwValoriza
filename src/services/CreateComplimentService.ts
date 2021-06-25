import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../reporitories/ComplimentsRepositories";
import { UsersRepositories } from "../reporitories/UsersRepositories";

interface ICreateComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{

    async execute({tag_id, user_sender, user_receiver, message}: ICreateComplimentRequest){

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRespositories = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver){
            throw new Error("Incorrect user receiver");
        }

        const userReceiverExists = await usersRespositories.findOne(user_receiver);

        if(!userReceiverExists){
            throw new Error("User receiver does not exists!"); 
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })
        await complimentsRepositories.save(compliment);

        return compliment;





    }

}
export {CreateComplimentService};