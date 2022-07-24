import { useState } from "react";
import axios from "axios";
import { PartidaContext } from "./PartidaContext";
import { useNavigate } from "react-router-dom";

// const PartidaContext = createContext();

const PartidaProvider = ({ children }) => {
    const [deckId, setDeckId] = useState('');
  const [player1, setPlayer1] = useState({nombre:"",cartas:[]});
  const [player2, setPlayer2] = useState({nombre:"",cartas:[]});
  
  const navigator = useNavigate();

  const handleChangePlayer1 = (e) => {
    let updatedValue = {};
    updatedValue = {nombre:e.target.value};
    setPlayer1(player1 => ({
        ...player1,
        ...updatedValue
      }));
    }

    const handleChangeCartasP1 = (e) => {
      let updatedValue = {};
      updatedValue = {cartas:[...player1.cartas,e]};
      setPlayer1(player1 => ({
          ...player1,
          ...updatedValue
        }));
      }
      
      const handleChangePlayer2 = (e) => {
        let updatedValue = {};
        updatedValue = {nombre:e.target.value};
        setPlayer2(player2 => ({
          ...player2,
          ...updatedValue
        }));
      }
      
      const handleChangeCartasP2 = (e) => {
        let updatedValue = {};
        updatedValue = {cartas:[...player2.cartas,e]};
        setPlayer2(player2 => ({
            ...player2,
            ...updatedValue
          }));
        }

async function getId() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle";
    const { data } = await axios(url);
    // console.log(data);
    return data?.deck_id;
}

async function getCartas(id) {
    const url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`;
    const { data } = await axios(url);
    // console.log(data)
    return data?.cards;
}

  
  const nuevaPartida = async () =>{
    const deckid = await getId();
    setDeckId(deckid);
    const cartas = await getCartas(deckid);
    // console.log(cartas);
    // console.log(cartas[0]);
    if(player1.nombre!=="" || player2.nombre!==""){
      handleChangeCartasP1(cartas[0]);
    handleChangeCartasP2(cartas[1]);
      navigator("/partida");
    }else{
      return alert('Ambos jugadores deben tener nombre');
    }
  }

  const pedirCartas = async () =>{
    const deckid = await getId();
    const cartas = await getCartas(deckid);
    handleChangeCartasP1(cartas[0]);
    handleChangeCartasP2(cartas[1])
    const temp = [...player1.cartas,cartas[0]];
    const temp2 = [...player2.cartas,cartas[1]];
    // let parPlayer1 =buscarPareja(player1.cartas);
    let parPlayer1 =buscarPareja(temp);
    // let parPlayer2 =buscarPareja(player2.cartas);
    let parPlayer2 =buscarPareja(temp2);

    
    if(parPlayer1!==false && parPlayer2!==false){
      if(parPlayer1>parPlayer2){
        return alert('El ganador es: '+player1.nombre)
      }else{
        return alert('El ganador es: '+player2.nombre)
      }
    }else if(parPlayer1!==false && parPlayer2===false){
      return alert('El ganador es: '+player1.nombre);
    }else if(parPlayer2!==false && parPlayer1===false){
      return alert('El ganador es: '+player2.nombre);
    }else if(parPlayer1===false || parPlayer2===false){
      console.log("No hay ganador aun");
    }
  }



  const buscarPareja = (cartasJugador) => {
    const busqueda = cartasJugador.reduce((acc, carta) => {
      acc[carta.value] = ++acc[carta.value] || 0;
      return acc;
    }, {});
    
    const duplicados = cartasJugador.filter( (carta) => {
        return busqueda[carta.value];
    });
        console.log(duplicados);
    if(duplicados.length>=2){
      const carta1 =valorSuit(duplicados[0].suit);
        const carta2 =valorSuit(duplicados[1].suit);
          return carta1+carta2;
    }else{
      return false;
    }
    }
    

    function valorSuit(suit){
      switch (suit) {
        case "HEARTS":
            return 4;
        case "SPADES":
            return 3;
        case "DIAMONDS":
            return 2;
        case "CLUBS":
            return 1;
        default:
            return 0;
    }
    }

  // useEffect(() => {
  //   const consultarAPI = async () => {
  //     const urlCartas = `https://newsapi.org/v2/top-headlines?country=co&category=${categoria}&apiKey=c105012511a84a1897f5b95b3840de26`;
  //     const { data } = await axios(urlCartas);
  //     setCartasP1(data.articles);
  //     setCartasP2(data.articles);
  //   };
  //   consultarAPI();
  // }, [categoria]);

  return (
    <PartidaContext.Provider
      value={{
        handleChangePlayer1,
        handleChangePlayer2,
        player1,
        player2,
        deckId,
        nuevaPartida,
        pedirCartas
        }}
    >
      {children}
    </PartidaContext.Provider>
  );
};

export default PartidaProvider;
