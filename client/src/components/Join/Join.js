import React, {useState} from "react";
import { Link } from 'react-router-dom';
import './join.css';

const Join = () => {
    // déclaration des variables
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    // fonction qui permet de récupérer les valeurs des inputs
    // et de les stocker dans les variables
    // et de les envoyer à la page suivante
    // (ici la page Chat)
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Join;