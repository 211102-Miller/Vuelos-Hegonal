import { MysqlUserRepository } from "./Repository/mysqlUserRepository";

import { RegisterUserUseCase } from "../application/Usecase/registerUserUseCase";
import { RegisterUserController } from "./Controller/registerUserController";
import { LoginUserUseCase } from "../application/Usecase/loginUserUseCase";
import { LoginUserController } from "./Controller/loginUserController";
import { UpdateUserUseCase } from "../application/Usecase/updateUserUseCase";
import { UpdateUserController } from "./Controller/updateUserController";
import { DeleteUserUseCase } from "../application/Usecase/deleteUserUseCase";
import { DeleteUserController } from "./Controller/deleteUserController";

export const mysqlUserRepository = new MysqlUserRepository();

export const registerUserUseCase = new RegisterUserUseCase(mysqlUserRepository);
export const registerUserController = new RegisterUserController(registerUserUseCase);

export const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository);
export const loginUserController = new LoginUserController(loginUserUseCase);

export const updateUserUseCase = new UpdateUserUseCase(mysqlUserRepository);
export const updateUserController = new UpdateUserController(updateUserUseCase);

export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);