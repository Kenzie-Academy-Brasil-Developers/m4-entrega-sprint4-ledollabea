import { Request, Response } from "express";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (request: Request, response: Response) =>{
  try {
    const login = request.body;
    const token = await createSessionService(login);
    return response.json({token});
  } catch (error) {
    if(error instanceof Error){
      return response.status(403).json({message: error.message});
    }
  }

}

export { createSessionController };