type FlightType = "Lot standardowy" | "Lot czarterowy";

export type FlightCardProps = {
    destiny: string,
    prize: number, 
    plane: string, 
    seats: number,
    flightType: FlightType
};