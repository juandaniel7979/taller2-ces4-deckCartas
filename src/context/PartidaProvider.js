import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { PartidaContext } from "./PartidaContext";

// const PartidaContext = createContext();

const PartidaProvider = ({ children }) => {
    const [deckId, setDeckId] = useState('');
  // const [player1, setPlayer1] = useState({"nombre":'',cartas:[]});
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);
  

  const handleChangePlayer1 = (e) =>{
    setPlayer1({"nombre": e.target.value,"cartas":[...player1.cartas]});
  }
  const handleChangePlayer2 = (e) =>{
    setPlayer2({"nombre": e.target.value,"cartas":[...player2.cartas]});
  }


async function getId() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle";
    const { data } = await axios.get(url);
    console.log(data);
    return data?.deck_id;
}

async function getCartas(id) {
    const url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`;
    const { data } = await axios.get(url);
    console.log(data)
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
    console.log("antes");
    console.log(player2);
    const player={...player2,"cartas":[cartas[0]]};
    console.log('despues');
    setPlayer2(player);

    // setPlayer2([...player2[0].cartas ,cartas[0]]);
    // setPlayer2(player2.cartas=cartas[1]);

    console.log(player1);
    console.log(player2);
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
        nuevaPartida
        }}
    >
      {children}
    </PartidaContext.Provider>
  );
};

export default PartidaProvider;
