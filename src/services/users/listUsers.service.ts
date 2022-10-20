import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";

const listUsersService = async(): Promise<IUser[]> =>{
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const dataUsers = users.map((user) => {
    const {
      name,
      email,
      id,
      isAdm,
      isActive,
      createdAt,
      updatedAt
    } = user;
    return { name, email, id, isAdm, isActive, createdAt, updatedAt }
  })
  return dataUsers;
}

export default listUsersService;