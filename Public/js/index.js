const form = document.querySelector('form')
const input = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = input.value
    msg1.textContent = 'Loading!!'
    msg2.textContent = ''
    fetch('http://localhost:8080/weather?address='+value).then((res) => {
        
        res.json().then((data) => {
            if(data.error){
                return msg1.textContent = data.error
            } 
            msg1.textContent = data.forecast
            msg2.textContent = data.location
    }) 
})
})