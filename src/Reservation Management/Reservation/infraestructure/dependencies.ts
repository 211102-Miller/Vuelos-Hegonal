import { MysqlReservationRepository } from "./Repository/mysqlReservationRepository";
import { CreateReservationUseCase } from "../application/UseCase/createReservationUseCase";
import { CreateReservationController} from "./Controller/createReservationController";


export const mysqlReservationRepository = new MysqlReservationRepository();

export const createReservationUseCase = new CreateReservationUseCase(mysqlReservationRepository);
export const createReservationController = new CreateReservationController(createReservationUseCase);
