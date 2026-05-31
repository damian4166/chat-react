import { useState } from "react";
function MessageForm({onWyslij, onTyping}){
    const [tekst,setTekst] = useState('');
    const handleChange = (e) =>{
        setTekst(e.target.value);
        onTyping();
    }
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
                onChange={handleChange}
            />
            <button type="submit">Wyślij🚀</button>
        </form>
    );
}

export default MessageForm