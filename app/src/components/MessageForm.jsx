import { useState } from "react";
function MessageForm({onWyslij}){
    const [tekst,setTekst] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(tekst.trim() === '')
        {
            return;
        }

        onWyslij(tekst);
        setTekst('')
    }
    return (
        <form className="chat-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Napisz wiadomość..."
                value={tekst}
                onChange={(e)=>setTekst(e.target.value)}
            />
            <button type="submit">Ala ma kota 🚀</button>
        </form>
    );
}

export default MessageForm