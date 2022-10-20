import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserDecoded } from "../../interfaces/users";

const deleteUserService = async (id: string) =>{
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id: id
  })
  if (!findUser){
    throw new Error("User not found!")
  }
  if (findUser.isActive===false){
    throw new Error("User not active");
  }
  await userRepository.update(
    id, 
    {
      isActive: false
    })
  return "User deleted successfully";
}


export default deleteUserService;