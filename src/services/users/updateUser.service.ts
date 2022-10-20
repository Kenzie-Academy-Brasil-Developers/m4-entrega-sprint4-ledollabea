import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import {  IUser, IUserDecoded, IUserUpdate } from "../../interfaces/users";

const updateUserService = async (id: string, user: IUserDecoded, {name,email,password}: IUserUpdate):Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id: id
  })
  if (!findUser){
    throw new Error("User not found!")
  }
  if (user.isAdm===false && id !== user.id){
    throw new Error("Unauthorized User");
  }
  await userRepository.update(
    id, 
    {
      name: name,
      email: email,
      password: password ? await hash(password, 10) : findUser.password
    })
  
    const updatedUser = await userRepository.findOneBy({
      id: id
    })
    
    return updatedUser!;
}

export default updateUserService;