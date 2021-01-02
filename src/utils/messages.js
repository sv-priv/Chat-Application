const generateMessage = (text,user) => {
    return {
        text: text,
        user: user,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}