import Express from "express";
import { registerUserController,loginUserController,updateUserController, deleteUserController} from "../dependencies";

export const UserRouter = Express.Router();

UserRouter.post("/",registerUserController.run.bind(registerUserController));
UserRouter.post("/login",loginUserController.run.bind(loginUserController));
UserRouter.put("/",updateUserController.run.bind(updateUserController));
UserRouter.delete("/:uuid",deleteUserController.run.bind(deleteUserController));


