import { getCustomRepository } from "typeorm";
import {compare} from "bcryptjs"
import { UsersRepositories } from "../reporitories/UsersRepositories";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateRequest){

        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = usersRepositories.findOne({email});

        if(!user){
            throw new Error("Email or Password Incorrect!") 
        }

        const passwordMatch = await compare(password, (await user).password)


        if (!passwordMatch){
            throw new Error("Email or Password Incorrect!") 
        }

        const token = sign({
            email: (await user).email
        }, "4f93ac9d10cb751b8c9c646bc9dbccb9",{
            subject: (await user).id,
            expiresIn: "1d"
        }
        )

        return token;


    }

}

export {AuthenticateUserService};