import { PosgresVuelosRepository } from "./PosgreslvuelosRepository";

import { CreateVuelosUsecase } from "../appicaition/createVuelosUseCase";
import { CreateVuelosController } from "./controller/createvuelosontroller";

import { GetAllVuelosUseCase } from "../appicaition/getallVuelosUsecase";
import { GetAllVuelosController } from "./controller/getAllvuelosController";

import { GetByIdCoontroller } from "./controller/getidvuelosController";
import { GetByIdUseCase } from "../appicaition/getidVuelosUsecase";

import { DeleteVuelosController } from "./controller/delitevuelosController";
import { DeleteVuelosUseCase } from "../appicaition/deliteVuelosUseCase";

import { UpdateVuelosByIdUseCase } from "../appicaition/updateVuelosUsecase";
import { UpdateVuelosIdController } from "./controller/updatevueloscontroller";

export const posgresvuelosRepository = new PosgresVuelosRepository();

export const createAvionUsecase = new CreateVuelosUsecase(posgresvuelosRepository)
export const createvuelocontroller = new CreateVuelosController(createAvionUsecase)

export const getAllAvionUseCase = new GetAllVuelosUseCase(posgresvuelosRepository)
export const getAllVueloController = new GetAllVuelosController(getAllAvionUseCase)

export const getByIdUseCase = new GetByIdUseCase(posgresvuelosRepository)
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase)

export const deleteAvionUseCase = new DeleteVuelosUseCase(posgresvuelosRepository)
export const deleteAvionController = new DeleteVuelosController(deleteAvionUseCase)

export const updateAvionUsecase = new UpdateVuelosByIdUseCase(posgresvuelosRepository)
export const updateAvioncontroller = new UpdateVuelosIdController(updateAvionUsecase)