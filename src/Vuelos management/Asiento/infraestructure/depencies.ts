import { PosgresAsientoRepository } from "./PosgreslasientoRepository";

import { CreateAsientoUsecase } from "../appicaition/createAsientoUseCase";
import { Createasientocontroller } from "./controller/createasientocontroller";

import { GetAllAsientoUseCase } from "../appicaition/getallAsientoUsecase";
import { GetAllAsientoController } from "./controller/getAllAsientoController";

import { GetByIdCoontroller } from "./controller/getidAsientoController";
import { GetByIdUseCase } from "../appicaition/getidAsientoUsecase";

import { DeliteAsientoController } from "./controller/deliteAsientoController";
import { DeleteAsientoUseCase } from "../appicaition/deliteAsientoUseCase";

import { UpdateAsientoByIdUseCase } from "../appicaition/updateAsientoUsecase";
import { UpdateAsientocontroller } from "./controller/updateAsientocontroller";

export const posgresAsientoRepository = new PosgresAsientoRepository();

export const createAsientoUsecase = new CreateAsientoUsecase(posgresAsientoRepository)
export const createAsientocontroller = new Createasientocontroller(createAsientoUsecase)

export const getAllAsientoUseCase = new GetAllAsientoUseCase(posgresAsientoRepository)
export const getAllAsientoController = new GetAllAsientoController(getAllAsientoUseCase)

export const getByIdUseCase = new GetByIdUseCase(posgresAsientoRepository)
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase)

export const deleteAsientoUseCase = new DeleteAsientoUseCase(posgresAsientoRepository)
export const deleteAsientoController = new DeliteAsientoController(deleteAsientoUseCase)

export const updateAsientoUsecase = new UpdateAsientoByIdUseCase(posgresAsientoRepository)
export const updateAsientocontroller = new UpdateAsientocontroller(updateAsientoUsecase)