console.log("Javascript clientside file loaded")
// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// Targetting by classname is just '.className'
// Targetting by id
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    const url = '/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data)=>{
            messageOne.textContent = ''
            if (data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = "Currently " + data.forecast.description + ". It is " +  data.forecast.temperature + " degrees. Feels like: " + data.forecast.feelslike
            }

        })
    })
})