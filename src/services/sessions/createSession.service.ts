import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";

const createSessionService = async ({email, password}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: email
  })
  if (!user){
    throw new Error("Invalid Email or Password!")
  }
  const userPassword = compareSync(password, user.password)
  if(!userPassword){
    throw new Error("Incorrect email or password.");
  }

  const token = jwt.sign(
    {
      email: user.email,
      name: user.name, 
      isAdm: user.isAdm,
      id: user.id
    }, 
    process.env.SECRET_KEY as string, 
    {
      expiresIn: "24h", 
      subject: user.id
    });

  return token;
}

export default createSessionService;