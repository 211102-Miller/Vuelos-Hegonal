import { Reservation } from "../Entity/reservation";
import { Reservations } from "../Entity/reservations";

export interface ReservationInterface{

    createReservation(reservation:Reservation):Promise<Reservation | any>

    createReservations(reservations:Reservations):Promise<Reservations | any>

}