const generateLocationMessage = (url) => {
    return {
        url : url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateLocationMessage
}