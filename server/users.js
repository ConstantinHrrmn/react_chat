const users = [];

// Add a user to a room
const addUser = ({ id, name, room }) => {
    // Permet de faire en sorte que le nom de l'utilisateur
    // soit en minuscule et sans espaces
    name = name.trim().toLowerCase();

    // Permet de faire en sorte que le nom de la room
    // soit en minuscule et sans espaces
    room = room.trim().toLowerCase();

    // Vérifie si l'utilisateur existe déjà
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser) {
        return { error: 'User already in chat...' };
    }

    // Ajoute l'utilisateur à la liste
    const user = { id, name, room };
    users.push(user);

    // Retourne l'utilisateur qui vient de rejoindre la room
    return { user };
}

const removeUser = (id) => {
    // Permet de trouver l'utilisateur avec l'id
    const index = users.findIndex((user) => user.id === id);

    // Si l'utilisateur existe, on le supprime de la liste
    if(index !== -1) {
        // Permet de retirer l'utilisateur de la liste
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    // Permet de trouver l'utilisateur avec l'id
    const index = users.findIndex((user) => user.id === id);

    // Si l'utilisateur existe, on le retourne
    if(index !== -1) {
        return users[index];
    }
}

const getUsersInRoom = (room) => {
    // Permet de trouver les utilisateurs dans la room
    const usersInRoom = users.filter((user) => user.room === room);

    // Retourne la liste des utilisateurs
    return usersInRoom;
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
