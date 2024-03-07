import { MysqlReservationRepository } from "./Repository/mysqlReservationRepository";
import { CreateReservationUseCase } from "../application/UseCase/createReservationUseCase";
import { CreateReservationController} from "./Controller/createReservationController";
import { CreateReservationsUseCase } from "../application/UseCase/createReservationsUseCase";
import { CreateReservationsController } from "./Controller/createReservationsController";

export const mysqlReservationRepository = new MysqlReservationRepository();

export const createReservationUseCase = new CreateReservationUseCase(mysqlReservationRepository);
export const createReservationController = new CreateReservationController(createReservationUseCase);

export const createReservationsUseCase = new CreateReservationsUseCase(mysqlReservationRepository);
export const createReservationsController = new CreateReservationsController(createReservationsUseCase);