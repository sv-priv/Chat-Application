const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormButton = $messageForm.querySelector('#button')
const $messageFormInput = $messageForm.querySelector('#input')
const $locationFormButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML
const messageTemplateLocation = document.querySelector('#message-template-location').innerHTML


socket.on('message', (message)=>{



    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt:moment(message.createdAt).format('h:mm A')
    })
    $messages.insertAdjacentHTML('beforeend' ,html)

    // console.log(message);
})

socket.on('locationMessage', (message) => {


    const html = Mustache.render(messageTemplateLocation,{
        url:  message.url,
        createdAt : moment(message.createdAt).format('h:mm A')

    })
    $messages.insertAdjacentHTML('beforeend', html)
    // console.log(message);
})
$messageForm.addEventListener('submit',(e)=>{

        e.preventDefault();

        $messageFormButton.setAttribute('disabled', 'disabled')

        const message = $messageFormInput.value

        socket.emit('sendMessage', message, (error)=>{

            $messageFormButton.removeAttribute('disabled');
            $messageFormInput.value = '';
            $messageFormInput.focus();



            if(error){
                return console.log(error);
            }


            console.log("The message was delivered");

        })


})


$locationFormButton.addEventListener('click', ()=>{


    $locationFormButton.setAttribute('disabled', 'disabled')

    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position);
        obj = {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,

        }

        socket.emit('sendLocation', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }, (error) => {

            $locationFormButton.removeAttribute('disabled')

            if(error){
                return console.log(error)
            }
        })
        })
 })


