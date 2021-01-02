const generateLocationMessage = (url, user) => {
    return {
        url : url,
        user : user,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateLocationMessage
}