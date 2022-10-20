import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";

const retrieveUserService = async (id: string):Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id
  })
  if (!user){
    throw new Error("User not found!")
  }
  const {
    name,
    email,
    isAdm,
    createdAt,
    updatedAt,
    isActive
  } = user;
  return { name, email, id, isAdm, createdAt, updatedAt, isActive }
}

export default retrieveUserService;