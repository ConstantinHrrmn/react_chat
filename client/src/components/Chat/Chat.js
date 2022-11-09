import React, {useState, useEffect} from "react";
import io from 'socket.io-client';
import { useSearchParams } from "react-router-dom";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

import './chat.css';

const {getSlackUsers, transactionsSlackUsers} = require('../SlackAPI.js');

const SERVER = 'localhost:5522';
let socket;

const Chat = () => {
    const [searchParams] = useSearchParams();

    // Création des variables nécéssaies
    let name = searchParams.get('name');
    let room = searchParams.get('room');

    // Création des variables d'états
    // Un message
    const [message, setMessage] = useState('');
    // Liste des messages
    const [messages, setMessages] = useState([]);

    useEffect(() => { 

        socket = io(SERVER);
        socket.emit('join', {name, room}, () => {
            
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [SERVER, searchParams]);

    // Fonction pour recevoir un message
    useEffect(() => {
        // Ecouter les messages
        socket.on('message', (message) => {
            if(message.text.includes('/')) {
                GetCommand(message.text.split(" ")[0].split("/")[1], message.text.split(" ")[1]);
            }else{
                // les 3 points permettent de copier le contenu de messages dans un nouveau tableau
                setMessages([...messages, message]);
            }

        });
    }, [messages]);

    const GetCommand = (text, command) => {
        switch(text) {
            case 's':
                getSlackUsers({name: command, callback: (result) => {
                    console.log(result['code']);
                    let resultString = "[code] : " + result['code'] + " [name] : " + result['firstname'] + " "+result['lastanme']+  " [phone] : " + result['phone'];
                    setMessages([...messages, {user: 'WavBot', text: resultString}]);
                }});
            break;

            case 't':
                transactionsSlackUsers({name: command, callback: (result) => {
                    console.log(result);
                    //let resultString = "[code] : " + result['code'] + " [name] : " + result['firstname'] + " "+result['lastanme']+  " [phone] : " + result['phone'];
                    //setMessages([...messages, {user: 'WavBot', text: resultString}]);
                }});
            break;

            default:
                break;
        }
        
    };

    // fonction pour envoyer un message
    const sendMessage = (event) => {
        // Empêcher le rechargement de la page
        event.preventDefault();

        // Si le message n'est pas vide
        if(message) {
            // Envoyer le message
            // On remet le message à vide
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(messages);

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    );
}

export default Chat;