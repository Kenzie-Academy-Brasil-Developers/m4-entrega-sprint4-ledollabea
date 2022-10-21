import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import {  IUser, IUserDecoded, IUserUpdate } from "../../interfaces/users";

const updateUserService = async (id: string, user: IUserDecoded, update: IUserUpdate):Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id: id
  })
  if (!findUser){
    throw new Error("User not found!")
  }
  if (user.isAdm===false){
    if (id !== user.id){
      throw new Error("Unauthorized User");
    }
  } 
  
  if(update.id){
    throw new Error("Cannot Change this Property")
  }
  if(update.isActive != undefined){
    throw new Error("Cannot Change this Property")
  }
  if(update.isAdm != undefined){
    throw new Error("Cannot Change this Property")
  }

  const {name, email, password} = update;
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
    
    const returnUser = {
      name: updatedUser!.name,
      email: updatedUser!.email,
      id: updatedUser!.id,
      isAdm: updatedUser!.isAdm,
      isActive: updatedUser!.isActive,
      createdAt: updatedUser!.createdAt,
      updatedAt: updatedUser!.updatedAt
  }

    return returnUser;
}

export default updateUserService;