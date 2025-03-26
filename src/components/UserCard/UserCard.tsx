import { UserCardProps } from "./types"

const UserCard = ({user, city, job}: UserCardProps) => {

  return (
       <article>
            <h2>{user}</h2>
            <p>Miasto: {city}</p>
            <p>Zawód: {job}</p>
            <button>Zobacz</button>
        </article>
  )
}

export default UserCard