import React, {useRef, useState, useEffect, useCallback} from 'react';
import Loader from './Loader';
import axios from 'axios';
import PokeCard from './PokeCard';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../favouriteContext';

const Home = () => {
  const [nextUrl, setNextUrl] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const {favourites} = useGlobalContext()
  

  const handleSearch = (e)=>{
    setSearchTerm(e.target.value)
  }
  
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if(isLoading) return;
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && nextUrl){
        searchPokedex(nextUrl)
      }
    });
    if(node) observer.current.observe(node);
    
  }, [isLoading, nextUrl, pokemon]);

  const fetchPokemonDetail = async url => {
    const response = await axios.get(url);
    const {name, id, types, sprites} = response.data;
    return {id, name, type: types[0].type.name, img: sprites.front_default}
  }

  const searchPokedex = useCallback(async url => {
    setIsLoading(true);
    try{
      const response = await axios.get(url);
      const results = response.data.results;
      const {next} = response.data;
      if(next) setNextUrl(next);
      const detailRequests = results.map(async r => await fetchPokemonDetail(r.url))

      await Promise.all(detailRequests).then(detailResults => {
        setPokemon([...pokemon, ...detailResults]);
      })


    }catch(e){
      console.error(e)
    } finally{
      setIsLoading(false)
    }
  }, [nextUrl, pokemon])
  
  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    searchPokedex(url)

    return ()=>{}
  }, []);

  const renderPokemon = () => pokemon.map((p, i) => {

    if(p.name.includes(searchTerm)){
    return i === pokemon.length -1 
    ? <div key={p.id} ref={lastElementRef}><PokeCard pokemon={p} /></div> 
    : <div key={p.id}><PokeCard pokemon={p} /></div>}
    
}); 

  return (
    <>
    <div className='header'>
    <button className='fav'><Link to='/'>Home</Link></button>
    <button className='fav'><Link to='/favourites'>Favourites({favourites.length})</Link></button>
    </div>
    
    <section id="screen">
       
    <input placeholder="Search Pokemon" className='input' type='text' value={searchTerm} onChange={handleSearch}></input>
    
    
    <div id="pokedex">{renderPokemon()}</div>
      {isLoading && <Loader />}
    </section>
    
    </>
  );
};

export default Home;


