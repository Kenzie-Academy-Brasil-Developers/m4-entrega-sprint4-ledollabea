import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import retrieveUserService from "../services/users/retrieveUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController =  async (request: Request, response: Response) => {
  try {
    const user = request.body;
    const createdUser = await createUserService(user);
    response.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof Error){
      return response.status(400).json({
        message: error.message
      });
    }
  }
}

const listUsersController = async (request: Request, response: Response) => {
  const users = await listUsersService();
  return response.json(users);
}

const retrieveUserController = async (request: Request, response: Response) => {
  try {
    const {id} = request.user;
    const user = await retrieveUserService(id);
    return response.status(200).json(user);
  } catch (error) {
    if (error instanceof Error){
      return response.status(400).json({
        message: error.message
      });
    }
  }
}

const updateUserController = async (request: Request, response: Response) => {
  try {
    const {id} = request.params;
    const user = request.user;
    const update = request.body;

    const updatedUser = await updateUserService(id, user, update);
    return response.json(updatedUser);
  } catch (error) {
    if (error instanceof Error){
      return response.status(400).json({
        message: error.message
      });
    }
  }
}

const deleteUserController = async (request: Request, response: Response) => {
  try {
    const {id} = request.params;
    const user = request.user;

    const deletedUser = await deleteUserService(id);
    
    return response.status(204).send({
      message: "User Deleted Successfully"
    });
  } catch (error) {
    if (error instanceof Error){
      return response.status(400).json({
        message: error.message
      });
    }
  }
}



export { createUserController, listUsersController, retrieveUserController, updateUserController, deleteUserController };