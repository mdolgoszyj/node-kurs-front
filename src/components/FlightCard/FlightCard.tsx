import { FlightCardProps } from "./types"

const FlightCard = ({destiny, prize, plane, seats, flightType}: FlightCardProps) => {

  return (
       <article>
            <h2>Kierunek: {destiny}</h2>
            <p>Cena: {prize}</p>
            <p>Samolot: {plane}</p>
            <p>Ilośc miejsc: {seats}</p>
            <p>Rodzaj lotu: {flightType}</p>
        </article>
  )
}

export default FlightCard