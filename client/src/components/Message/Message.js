import React from "react";


import "./message.css";

const Message = ({ message : {user, text}, name }) => {
    // Permet de savoir si le message est envoyé par l'utilisateur ou par un autre utilisateur
    let isSentByCurrentUser = false;

    // Récupération du nom de l'utilisateur sans espace et en minuscule
    const nameTrim = name.trim().toLowerCase();

    if(user === nameTrim) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{user}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{text}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{text}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    )
}

export default Message;
