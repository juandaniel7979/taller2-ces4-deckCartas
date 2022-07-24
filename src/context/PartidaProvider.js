import { useEffect, useState } from "react";
import axios from "axios";
import { PartidaContext } from "./PartidaContext";

// const PartidaContext = createContext();

const PartidaProvider = ({ children }) => {
    const [deckId, setDeckId] = useState('');
  // const [player1, setPlayer1] = useState({"nombre":'',cartas:[]});
  const [player1, setPlayer1] = useState({nombre:"",cartas:[]});
  // const [player2, setPlayer2] = useState([]);
  const [player2, setPlayer2] = useState({nombre:"",cartas:[]});
  
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
      updatedValue = {cartas:[...player2.cartas,e]};
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
    if(player1.nombre==="" || player2.nombre===""){
      console.log('Ambos jugadores deben tener nombre');
      return alert('Ambos jugadores deben tener nombre');
    }
    handleChangeCartasP1(cartas[0]);
    handleChangeCartasP2(cartas[1])
  }

  const pedirCartas = async () =>{
    const deckid = await getId();
    const cartas = await getCartas(deckid);
    handleChangeCartasP1(cartas[0]);
    handleChangeCartasP2(cartas[1])
    // buscarPareja(player1);
    // buscarPareja(player2);
  }



  const buscarPareja = (cartasJugador) => {
    let repetidos=[];
    cartasJugador.find(function(ele , pos){
        if(cartasJugador.indexOf(ele).value != pos){
            repetidos.push(cartasJugador[pos])
        }
        console.log(repetidos)
        if(repetidos.length>1){
          alert("Hay un ganador")
        }
    }) 
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
