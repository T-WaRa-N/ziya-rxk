//bronze level javaScript file (i.e. index html file)
let id = ""

// --------code communicating to the server----------------
const comms_to_backend = async (level) => {
    if (document.getElementById('bronze-cn').value.length < 10) {
        alert("Please enter a valid cellphone number to play")
        return
    }
    const res = await fetch("/play",{
        method: "POST",
        headers: {
            "content-Type":"application/json"
        },
        body: JSON.stringify({
          phone: document.getElementById('bronze-cn').value,
          level: level  
        })
    })
    const data = await res.json()
    if(data.server){
        document.getElementById('bronze-cn').value = ""
        alert(data.server)
    }
} 


// login
const login = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const res = await fetch("/login", {
        method:'POST',
        headers:{
            "content-Type":"application/json"
        },
        body: JSON.stringify({
            "username":formData.get("username"), 
            "password":formData.get("password")
        })
    })
    form.reset()
    document.getElementById("signin").close()
    
}

// new application form submission
const apply = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    let number = formData.get("contact")
    for(let j = 9; j >= 0; j--){
        if(number[j]== '0') id +="R"
        else if(number[j] == '1') id  +="X"
        else if(number[j] == '2') id  +="K"
        else if(number[j] == '5') id  +="Z"
        else id += number[j]
    }
    id = id.slice(2, 8)
    let message = `Take ID: ${id}`
    let display_id = document.getElementById('ziya_rxk_id')
    display_id.style.fontSize = "15px"
    display_id.style.backgroundColor = "White"
    display_id.innerText = message
    const res = await fetch("/apply", {
        method:'POST',
        headers:{
            "content-Type":"application/json"
        },
        body: JSON.stringify({
            "name":formData.get("name"),
            "surname":formData.get("surname"), 
            "contact":formData.get("contact"),
            "reference":formData.get("reference")
        })
    })
    const response = await res.json()
    if( response.server) alert(response.server)
    else alert("No data received from ZiyaRXK server")
    form.reset()
}


// client status tracker
const bookingList = []
const refundMembers = []

if(!localStorage.getItem('playing_players')) localStorage.setItem('playing_players', '[]')

// Table population function
const enlistingFunc = (online_players) => {
   
    // Enlisting successfully booked numbers in the first column of the table
    if(online_players.length < 26){
      
        // status update for all passengers as the list
        let listCounter = 1
        while(listCounter <= online_players.length){  

            let spanIdC1 = `${listCounter}` + "1";
            let spanIdC2 = `${listCounter}` + "2";
            let spanIdC3 = `${listCounter}` + "3";
           
            if(online_players.length < 6){

                document.getElementById(spanIdC1).innerText = online_players[listCounter - 1].player_id;
                document.getElementById(spanIdC2).innerText = '';
                document.getElementById(spanIdC3).innerText = "booking...";
                
                listCounter++

            }else if(bookingList.length > 5 && bookingList.length < 11){
                if (listCounter < 6){
                    document.getElementById(spanIdC3).innerText = "checking-in..."
                    listCounter++
                }
                else {
                    document.getElementById(spanIdC3).innerText = "booking..."
                    listCounter++
                }

            }else if(bookingList.length > 10 && bookingList.length < 16){
                if (listCounter < 6){
                    document.getElementById(spanIdC3).innerText = "boarding..."
                    listCounter++
                }
                else{
                    document.getElementById(spanIdC3).innerText = "booking..."
                    listCounter++
                }

            }else if(bookingList.length > 15 && bookingList.length < 21){
                if (listCounter < 6){
                    document.getElementById(spanIdC3).innerText = "flying..."
                    listCounter++
                }
                else{
                    document.getElementById(spanIdC3).innerText = "booking..."
                    listCounter++
                }

            }else{
                if (listCounter < 6){
                    document.getElementById(spanIdC3).innerText = "landing..."
                    listCounter++
                }
                else{
                    document.getElementById(spanIdC3).innerText = "booking..."
                    listCounter++
                }
            }
        }

    }
} 

// server sent events listener
const eventSource = new EventSource('/events');
eventSource.onmessage = (event) => {
    localStorage.setItem('playing_players', event.data)
    console.log('new players is in')
};

let playing_players = JSON.parse(localStorage.getItem('playing_players'))
 
