import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Types from '../../public/Types.json'
import Colors from '../../public/Colors.json'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader2 from './Loader2';


const PokemonsDetail = () => {

  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [fontSize, setFontSize] = useState("80px");
  const [isLoading, setIsLoading] = useState(true);


  
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => {
        setPokemon(res.data)
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);})
  }, [id])


  const stateColor = (stat) => {
    const color = Math.ceil((stat*100) / 150)
    console.log(color)
    return color
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

  console.log(pokemon)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return isLoading ? (
    <Loader2 />
  ) : (
    <div>
      <Card className="bg-transparent text-white">
      <Card.Img src={pokemon.sprites?.other["home"].front_default}  alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title style={{"fontSize": "40px", "fontFamily": "Pokemon-Solid"}}>{pokemon.name?.toUpperCase()}</Card.Title>
        <Card.Text style={{"display": "flex", "marginLeft": "440px", "marginTop": "15px"}}>
        <h4>Weight<br /> {pokemon.weight} </h4> <h4 style={{"marginLeft": "150px"}}>Height<br /> {pokemon.height}</h4>
        <div style={{"marginLeft": "100px"}}>
        <h4 style={{"marginTop": "150px"}}>HP <br />{pokemon.stats?.[0].base_stat}</h4>
        <h4 style={{"marginTop": "50px"}}>ATTACK <br />{pokemon.stats?.[1].base_stat}</h4>
        </div>
        <div style={{"marginLeft": "-950px"}}>
        <h4 style={{"marginTop": "150px"}}>DEFENSE <br /> {pokemon.stats?.[2].base_stat}</h4>
        <h4 style={{"marginTop": "50px"}}>SPEED <br />{pokemon.stats?.[3].base_stat}</h4>
        </div>

        </Card.Text>
        <Card.Text><p style={{"marginLeft": "650px","width": "75px", "marginTop": "80px"}}>#{pokemon.id}</p></Card.Text>
      </Card.ImgOverlay>
    </Card>

    <section className='containerTA'>
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial'}}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title style={{"fontFamily": "Pokemon-Hollow"}}>Types</Modal.Title>
        </Modal.Header>

       
        <Modal.Footer style={{"fontFamily": "Pokemon-GB"}}>
        {
          pokemon.types?.map((type) => (
            <h3 key={type.type.name} style={{"background": `${BackgrounImg()}`}}>{type.type.name}</h3>
          ))
         }
        </Modal.Footer>
      </Modal.Dialog>
    </div>

    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title style={{"fontFamily": "Pokemon-Hollow"}}>Abilities</Modal.Title>
        </Modal.Header>

       
        <Modal.Footer style={{"fontFamily": "Pokemon-GB", "justifyContent": "center", "alignItems": "center"}}>
        {
            pokemon.abilities?.map((ability) => (
              <h3 key={ability.ability.name} style={{"background": "darkgoldenrod"}}>{ability.ability.name}</h3>
            ))
          }
        </Modal.Footer>
      </Modal.Dialog>
      <Button variant="dark" onClick={handleShow} style={{"marginTop": "5px", "fontFamily": "Pokemon-Hollow", "fontSize": "20px"}}>
    Movements
      </Button>
    </div>
    </section>
  

      <Offcanvas show={show} onHide={handleClose} style={{"zIndex": "5001", "background": "black", "color": "white"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{"margin": "auto", "fontFamily": "Pokemon-Hollow", "fontSize": "30px"}}>Movements</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {
          pokemon.moves?.map((move) => (
            <p key={move.move.url}>{move.move.name}</p>
          ))
        }
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}; 

export default PokemonsDetail;