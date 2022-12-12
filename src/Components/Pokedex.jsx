import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import Types from '../../public/Types.json'
import Colors from '../../public/Colors.json'
import Loader from './Loader';
import Card from 'react-bootstrap/Card';
import header from '../../Img/header.png'
import header2 from '../../Img/header2.png'
import pokemon from '../../Img/Pokemon-Logo.webp'



const Pokedex = () => {

  const name = useSelector(state => state.userName);

  const [pokemonList, setPokemonList] = useState([]);
  const [searchtype, setSearchType] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fontSize, setFontSize] = useState("100px");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1500&offset=0')
    .then(res => {
      setPokemonList(res.data.results);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      if (name.length > 9) {
        setFontSize("75px");
      }
  });

    axios.get('https://pokeapi.co/api/v2/type/')
    .then(res => setSearchType(res.data.results))
  }, [])

  const searchName = () => {
    navigate(`/Pokedex/${searchPokemon}`)
  }

  const typeList = (typeUrl) => {
    axios.get(typeUrl)
    .then(res => setPokemonList(res.data.pokemon))
  }

  // console.log(pokemonList)

  // console.log(searchtype)
  
  const [page, setPage] = useState(1);
  const charactersPerPage = 12;
  const lastCharacterIndex = page * charactersPerPage; //15;
  const firstCharacterIndex = lastCharacterIndex - charactersPerPage; // 10
  const charactersPaginated = pokemonList.slice(
    firstCharacterIndex,
    lastCharacterIndex
  );
  const totalPages = Math.ceil(pokemonList.length / charactersPerPage);
  const pagesNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesNumbers.push(i);
  }

  const BackgrounImg = () => {
    const Color = []
    Types.map((type, index) => {
      if(type === pokemon.types?.[0]?.type.name) {
        Color.push(Colors[index])
      }
    })
    return Color
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className='PokeBack'>

     <div>
     <Card className="bg-transparent text-white">
     <Card.Img src={pokemon} alt="Card image"  style={{"marginTop": "85px", "marginRight": "450px"}}/>
      <Card.Img src={header} alt="Card image"  style={{"marginTop": "-520px", "marginLeft": "20px", "height": "500px", "width": "500px"}}/>
      <Card.Img src={header2} alt="Card image"  style={{"marginTop": "-450px", "marginRight": "20px"}}/>
      <Card.ImgOverlay>
        <Card.Title style={{"fontFamily": "Pokemon-Hollow", "color": "yellow"}}><h2 style={{"fontSize": "55px"}}>Welcome <br /> Pokemon Master  {name}</h2></Card.Title>
      </Card.ImgOverlay>
    </Card>
     </div>
     
     <div className='SearchPokedex'>
        <input type="text" placeholder='Search Pokemon' value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)}  />
        <button onClick={searchName}></button>

        <div className='select'>
        <select onChange={e => typeList(e.target.value)}> 
          {searchtype.map((type) => (
            <option value={type.url} key={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        </div>
      </div>

      <div className='cardContainer'>
      {charactersPaginated.map((pokemon) => (
        <PokemonCard url={pokemon.url ? pokemon.url : pokemon.pokemon.url} key={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
      ))}
      </div>

      <div className='page'> 
     <button onClick={() => setPage(page - 1)} disabled={page === 1} className='PagePrev'>
      
      </button>
      {/* {pagesNumbers.map((number) => (
        <button onClick={() => setPage(number)} key={number} className="map">{number}</button>
      ))} */}
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className='PageNext'>
       
        </button>
      </div>
    </div>
   
  );
};

export default Pokedex;