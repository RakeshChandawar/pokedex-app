import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import SinglePokeCard from '../components/SinglePokeCard'

export default function SinglePoke() {

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    const {name} = useParams()
 
    const getPokemonList = async ()=>{
        let pokemonArray = []
        for(let i =1; i<=151; i++){
            pokemonArray.push(await getPokemonData(i))
        }
       
        setPokemon(pokemonArray)
        setLoading(false)
    }

    const getPokemonData = async (id)=>{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return res;
    }

    useEffect(()=>{
        getPokemonList()
    },[])

    
  return (
    <> 
    <section id='screen'>
    <div id="pokedex">
    {pokemon.map((p)=>{
        if(p.data.name === name.toLowerCase()){
            console.log(p.data.name)
            return <SinglePokeCard key={name} pokemon={p}></SinglePokeCard>
        }
    })}
    </div>
    </section>

    
    </>
  )
}


