import { Reservation } from "../Entity/reservation";

export interface ReservationInterface{

    createReservation(reservation:Reservation):Promise<Reservation | any>
}