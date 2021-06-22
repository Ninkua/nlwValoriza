import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../reporitories/UsersRepositories"

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService{
    async execute({name, email, admin}: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email){
            throw new Error("Email incorreto");
        }

        const UserAlreadyExists = await usersRepository.findOne({email});

       if (UserAlreadyExists){
           throw new Error("USer already exists!")
       }

       const user = usersRepository.create({name, email, admin});

       await usersRepository.save(user);

       return user;
    }
}
export {CreateUserService}