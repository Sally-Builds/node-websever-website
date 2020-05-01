fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



 const weatherForm = document.querySelector('form');
 const search = document.querySelector('input');
 const msg1 = document.getElementById('msg-1')
 const msg2 = document.getElementById('msg-2')

//  msg1.textContent = 'just'

 weatherForm.addEventListener('submit', (e) => {
     e.preventDefault()
     const loc = search.value

     msg1.textContent = 'loading....';
     msg2.textContent = ''
     fetch(`/weather?address=${loc}`)
    .then((res) =>{
    res.json().then((data) => {
        if(data.error){
            msg1.textContent = data.error
        }else{
            msg1.textContent = `locatiion: ${data.location}`
            msg2.textContent = `temperatures: ${data.forecast}f`
        }
        
    })
})
 })