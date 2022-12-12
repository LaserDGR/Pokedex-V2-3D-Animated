import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Types from '../../public/Types.json'
import Colors from '../../public/Colors.json'


const PokemonCard = ({url}) => {

    const [pokemon, setPokemon] = useState([])
  const navigate = useNavigate();

  const BackgrounImg = () => {
    const Color = []
    Types.map((type, index) => {
      if(type === pokemon.types?.[0]?.type.name) {
        Color.push(Colors[index])
      }
    })
    return Color
  }

  // "box-shadow": `0 0 10px ${BackgrounImg()}, 0 0 40px ${BackgrounImg()}, 0 0 80px ${BackgrounImg()}`

  useEffect(() => {
    axios.get(url)
    .then(res => setPokemon(res.data))
  }, [])

  // console.log(pokemon)

  return (
    <Card style={{ width: '18rem',"border":`3px solid ${BackgrounImg()}`, "box-shadow": `0 0 10px ${BackgrounImg()}, 0 0 15px ${BackgrounImg()}, 0 0 15px ${BackgrounImg()}`,"cursor": "pointer"}} 
    onClick={() => navigate(`/Pokedex/${pokemon.id}`)} className="bg-transparent">
    <Card.Img variant="top" src={pokemon.sprites?.other["home"].front_default}  />
    <Card.Body>
      <Card.Title style={{"color": "white"}}>{pokemon.name?.toUpperCase()}</Card.Title>
      <Card.Text style={{"color": `${BackgrounImg()}`}}>
      <p><b>Types: </b>{pokemon.types?.[0]?.type.name}, {pokemon.types?.[1]?.type.name}</p> <br />
      <p><b>HP: </b>{pokemon.stats?.[0].base_stat}</p> <br />
      <p><b>Attack: </b>{pokemon.stats?.[1].base_stat}</p> <br />
      <p><b>Defense: </b>{pokemon.stats?.[2].base_stat}</p> <br />
      <p><b>Speed: </b>{pokemon.stats?.[5].base_stat}</p> <br />
      </Card.Text>
    </Card.Body>
  </Card>
  );
};

export default PokemonCard;