import { useState } from "react";
import axios from "axios";
import { PartidaContext } from "./PartidaContext";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

// const PartidaContext = createContext();

const PartidaProvider = ({ children }) => {
    const [deckId, setDeckId] = useState('');
  const [player1, setPlayer1] = useState({nombre:"",cartas:[]});
  const [player2, setPlayer2] = useState({nombre:"",cartas:[]});
  const [repetidos, setRepetidos] = useState({nombre:"",cartas:[]})
  
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
      
      
        const handleChangeRepetidosGanador= (e) => {
        let updatedValue = {};
        updatedValue = {nombre:e};
        setRepetidos(repetidos => ({
          ...repetidos,
          ...updatedValue
        }));
        }
        const handleChangeRepetidos= (e) => {
          let updatedValue = {};
          updatedValue = {cartas:e};
          setRepetidos(repetidos => ({
              ...repetidos,
              ...updatedValue
            }));
        }


const getDeckId =async() => {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle";
    const { data } = await axios(url);
    // console.log(data);
    return data?.deck_id;
}

const  getCartas= async(id)=> {
    const url = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`;
    const { data } = await axios(url);
    // console.log(data)
    return data?.cards;
}


const reiniciarPartida = ()=>{
  setDeckId("");
  setPlayer1({nombre:"",cartas:[]});
  setPlayer2({nombre:"",cartas:[]});
  setRepetidos({nombre:"",cartas:[]});
}
  
  const nuevaPartida = async () =>{
    const deckid = await getDeckId();
    setDeckId(deckid);
    const cartas = await getCartas(deckid);
    // console.log(cartas);
    // console.log(cartas[0]);
    if(player1.nombre!=="" && player2.nombre!==""){
      handleChangeCartasP1(cartas[0]);
    handleChangeCartasP2(cartas[1]);
      navigator("/partida");
    }else{
      return swal('Atencion','Ambos jugadores deben tener nombre',"warning", {
        buttons: ["Oh noez!", "Aww yiss!"],
      });
    }
  }

  const pedirCartas = async () =>{
    const deckid = await getDeckId();
    const cartas = await getCartas(deckid);
    handleChangeCartasP1(cartas[0]);
    handleChangeCartasP2(cartas[1])
    const temp = [...player1.cartas,cartas[0]];
    const temp2 = [...player2.cartas,cartas[1]];
    // let parPlayer1 =buscarPareja(player1.cartas);
    let parPlayer1 =buscarPareja(temp);
    // let parPlayer2 =buscarPareja(player2.cartas);
    let parPlayer2 =buscarPareja(temp2);
    console.log('repetidos');
    console.log(repetidos);
    console.log(' fin');


    if(parPlayer1!==false && parPlayer2!==false){
      if(parPlayer1>parPlayer2){
        handleChangeRepetidosGanador(player1.nombre);
        return alert('El ganador es: '+player1.nombre)
      }else{
        handleChangeRepetidosGanador(player2.nombre);
        return alert('El ganador es: '+player2.nombre)
      }
    }else if(parPlayer1!==false && parPlayer2===false){
      handleChangeRepetidosGanador(player1.nombre);
      return alert('El ganador es: '+player1.nombre)
    }else if(parPlayer2!==false && parPlayer1===false){
      handleChangeRepetidosGanador(player2.nombre);
      return alert('El ganador es: '+player2.nombre)
    }else if(parPlayer1===false || parPlayer2===false){
      console.log("No hay ganador aun");
    }
  }



  const buscarPareja = (cartasJugador) => {
    const busquedaValor = cartasJugador.reduce((acc, carta) => {
      acc[carta.value] = ++acc[carta.value] || 0;
      return acc;
    }, {});
    
    const duplicados = cartasJugador.filter( (carta) => {
        return busquedaValor[carta.value];
    });
    
    const busquedaSuit = cartasJugador.reduce((acc, carta) => {
      acc[carta.suit] = ++acc[carta.suit] || 0;
      return acc;
    }, {});
    
    const duplicadosSuit = cartasJugador.filter( (carta) => {
        return busquedaSuit[carta.suit];
    });
        console.log('duplicados value: '+duplicados);
        console.log('duplicados suit: '+duplicadosSuit);
    if(duplicados.length>=2){
      console.log(duplicados);
      handleChangeRepetidos(duplicados)
      const carta1 =valorSuit(duplicados[0].suit);
      const carta2 =valorSuit(duplicados[1].suit);
          return carta1+carta2;
    }else if( duplicadosSuit.length>=2){
      console.log(duplicadosSuit);
      handleChangeRepetidos(duplicadosSuit)
      const carta1 =valorSuit(duplicadosSuit[0].suit);
      const carta2 =valorSuit(duplicadosSuit[1].suit);
          return carta1+carta2;
    }
    else{
      return false;
    }
    }
    

    const valorSuit=(suit)=>{
        if (suit==="HEARTS"){
            return 4;
        }else if (suit==="SPADES"){
            return 3;
        }else if (suit==="DIAMONDS"){
            return 2;
        }else if (suit==="CLUBS"){
          return 1;
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
        pedirCartas,
        repetidos,
        reiniciarPartida
        }}
    >
      {children}
    </PartidaContext.Provider>
  );
};

export default PartidaProvider;
