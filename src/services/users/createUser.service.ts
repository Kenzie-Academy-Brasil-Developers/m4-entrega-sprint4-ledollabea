import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
const createUserService = async ({name, email, isAdm, password}: IUserRequest): Promise<User> => {
    const userRepository = AppDataSource.getRepository(User);
    if (!password){
        throw new Error("Password is needed");
    }
    const passHashed = await hash(password, 10);
    const user = {
        name,
        email,
        isAdm,
        password: passHashed,
        isActive: true
    };
    const newUser = userRepository.create(user);
    
    await userRepository.save(newUser);

    return newUser;
}

export default createUserService;