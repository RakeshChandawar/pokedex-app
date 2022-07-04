import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import { useGlobalContext } from '../favouriteContext';


const PokeCard = ({pokemon}) => {
  
  const [isFavourite, setIsFavourite] = useState(false)
  const {favourites, setFavourites} = useGlobalContext()

  
  const {id, img} = pokemon;
  const name = pokemon.name.toUpperCase();
 
  useEffect(()=>{favourites.map((item )=> {
    if(item.name === name){
      setIsFavourite(true)
    }
  })},[isFavourite])
  
  
  const setbookmarks = (name)=>{
    
    
    setIsFavourite(!isFavourite)

    if(!isFavourite ){
      setFavourites([...favourites, {id,name,img}])
    }
    else {
      const newArray = favourites.filter((item)=> item.name !==name)
      setFavourites(newArray)
    }  
  }
  return (
    <div className="poke-card" style={{backgroundColor: 'white' }}>
      <button onClick={()=>setbookmarks(name)}>
        <div>{isFavourite?'💙':'🤍'}</div>
      </button>
      <figure><img src={img} alt={name} title={name} /></figure>
      <div>#{id}</div>
      <div><strong>{name}</strong></div>
      
      <Link to={`/pokemon/${name}`} >
          details
        </Link>
      
    </div>
  )
}

export default PokeCard
