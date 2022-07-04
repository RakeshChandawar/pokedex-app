import React from 'react'
import { Link } from "react-router-dom";
import { useGlobalContext } from '../favouriteContext';
export default function Favourites() {

    const {favourites} = useGlobalContext()
    console.log(favourites)
  
     if(favourites.length === 0){
        return <div className='favdiv'>
            <h1>No favourites</h1>
            <button><Link to='/'>Back Home</Link></button>
            </div>
     }
   
  return (
    
    <section id="screen">
        <div id="pokedex">
     {favourites.map((fitem)=>{
        const {id, name, img} = fitem
        return <div key={name}className="poke-card" style={{backgroundColor: 'white' }}>
        <figure><img src={img} alt={name} title={name} /></figure>
        <div>#{id}</div>
        <div><strong>{name}</strong></div>
        <Link to={`/`} >
            Back Home
          </Link>
        
      </div>
     })

     }
     </div>
    </section>
  )
}
