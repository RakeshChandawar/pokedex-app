import React from 'react'
import { Link } from "react-router-dom";
const SinglePokeCard = ({pokemon}) => {
  
  const {id, name} = pokemon.data;
  const img = pokemon.data.sprites.front_default

  const abilities =  pokemon.data.abilities.map((poke)=>{
    return poke.ability.name
  })
  
  console.log(pokemon, abilities)

  return (
    <div className="poke-card" style={{backgroundColor: 'white' }}>
      <figure><img src={img} alt={name} title={name} /></figure>
      <div>#{id}</div>
      <div><h1>{name}</h1></div>
      <div><h3>Abilities : {`${abilities[0]},${abilities[1]}`}</h3></div>
      <div>
        {pokemon.data.stats.map((poke)=>{
          return(
            <>
            <h3>{poke.stat.name}: {poke.base_stat}</h3>
            </>
          )
        })}
      </div>
      <Link to={`/`} >
          Back Home
        </Link>
      
    </div>
  )
}

export default SinglePokeCard
