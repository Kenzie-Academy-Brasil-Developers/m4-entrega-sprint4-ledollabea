import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";

const createSessionService = async (login: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const {email, password} = login;
  console.log(login);
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
  if(user.isActive === false){
    throw new Error("Inactive User.");
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
      id: user.id,
      isActive: user.isActive
    }, 
    process.env.SECRET_KEY as string, 
    {
      expiresIn: "24h", 
      subject: user.id
    });
    console.log(token)
  return token;
}

export default createSessionService;