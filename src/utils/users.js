const users = []

//addUser, removeUser, getUser, getUsersInRoom




const addUser = ({id, username, room}) => {
    //clean the data

    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //validate the data

    if(!username || !room){
         return {
             error: 'Username and room are required'
         }
    }

    //check for existing user

    const existingUser = users.find((user) => {
            return user.room === room && user.username === username;
    })

    if (existingUser){

        return{
            error: 'Username already in use'
        }
    }
    //store user

    const user = { id, username, room}
    users.push(user)

    return { user }


}


const removeUser = (id) =>{
    const index = users.findIndex( (user) => user.id === id)
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {

    return users.find((user) => user.id ===id)

    // const index = users.findIndex((user) => user.id === id)
    // return users[index]

}

const getUsersInRoom = (room) => {
    const roomUsers = []
    return users.filter((user) => user.room === room)
    return roomUsers;
}
addUser({
    id:20,
    username:'stefan',
    room:'dracevo'
})
console.log(getUser(20));
console.log(getUsersInRoom('dracevo'));
// removeUser(20);


// console.log(users);


module.exports = {
    addUser,
    removeUser,
    getUsersInRoom,
    getUser
}