import { useState, useEffect } from "react";
import Header from "./components/Header";
import MessageForm from "./components/MessageForm";
import Message from "./components/Message";
import Login from "./components/Login";

const API_URL = 'https://api.vps.malejka.lowicz.pl/api/messages';
function App(){
  const [wiadomosci,setWiadomosci] = useState([]);

  const [mojNick,setMojNick]=useState(localStorage.getItem('shoutboxNick') || '');

  
  const pobierzDane = async()=>{
    try{
      const odpowiedz = await fetch(API_URL);
      const dane = await odpowiedz.json();
      setWiadomosci(dane)
    }
    catch(error){
      console.error("Błąd pobierania",error);
    }
  };
  useEffect(()=>{
    pobierzDane();

    const interval = setInterval(pobierzDane,200);
    return () => clearInterval(interval);
  },[]);
  const handleDodajWiadomosc = async(nowyTekst) =>{
    try{
      await fetch(API_URL,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author:mojNick, text: nowyTekst})
      })
    }
    catch(error)
    {
      console.error("Błąd wysyłania:",error)
    }
  };

  const handleLajkuj = async(id)=>{
    try{
      await fetch(`${API_URL}/${id}/like`,{
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author:mojNick})
      });
      pobierzDane();
    }
    catch(error)
    {
      console.error(error);
    }
  }
  const handleUsun = async(id)=>{
    if(!window.confirm("Czy na pewno chcesz usunąć tę wiadomość?"))
    {
      return;
    }
    try{
      await fetch(`${API_URL}/${id}`,{
        method: 'DELETE'
      });

      pobierzDane();
    }
    catch(error)
    {
      console.error(error);
    }
  }
  if(!mojNick)
  {
    return(
      <div className="app-container">
        <Header />
        <Login onZaloguj={setMojNick} />
      </div>
    );
  }
  return(
    <div className="app-container">
      <Header />

      <div className="chat-window">
        {wiadomosci.length === 0 ? (
          <p style={{textAlign: 'center', color: '#999'}}>Ładowanie wiadomości...</p>
        ):(
          wiadomosci.map((msg) => (
            <Message 
              key={msg.id} 
              msg={msg}
              mojNick={mojNick}
              onLike={handleLajkuj}
              onDelete={handleUsun}/>
          ))
        )
      }
      </div>
      <MessageForm onWyslij={handleDodajWiadomosc}/>

    </div>
  );
}

export default App;