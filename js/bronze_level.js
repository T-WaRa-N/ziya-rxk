
document.addEventListener('DOMContentLoaded', () => {
    const bronze_cn = document.getElementById('click-enlist')
    const joinButton = document.getElementById('joinButton')
    const loginButton = document.getElementById('loginButton')
    const loginDialog = document.getElementById('logingDialog')
    const joinDialog = document.getElementById('joinDialog')
    const join = document.getElementById('join')
    const signin = document.getElementById('signin')
    const applicationForm = document.getElementById('application_form')
    const loginForm = document.getElementById('login_form')

    // form submissions
    applicationForm.onsubmit = (event) => {
        apply(event)
    }

    loginForm.onsubmit = (event) => {
        login(event)
    }

    // hover effects
    joinButton.onmouseover = () => {
        joinButton.style.cursor = 'pointer'
    }

    loginButton.onmouseover = () => {
        loginButton.style.cursor = 'pointer'
    }   

    loginDialog.onmouseover = () => {
        loginDialog.style.cursor = 'pointer'
    }

    joinDialog.onmouseover = () => {
        joinDialog.style.cursor = 'pointer'
    }

    //click events
    joinButton.addEventListener('click', () => {
        join.showModal()
    })

    joinDialog.addEventListener('click', () => {
        join.close()
    })

    loginButton.addEventListener('dblclick', () => {
        signin.showModal()
    })

    loginDialog.addEventListener('click', () => {
        signin.close()
    })

    // player enlistment
    bronze_cn.addEventListener('click', () => {
        comms_to_backend("bronze")

    })

    // dialog box triggers
    joinButton.addEventListener('click', () => {
        join.showModal()
    })

    //dialog box close button
    loginDialog.addEventListener('click', () => {
        signin.close()
    })

});

// make sure you fetch latest playing players on load
const fetchPlayingPlayers = async () => {
    const res = await fetch('/playing-list',{
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })
    const data = await res.text(); 
    return JSON.parse(data);
}

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


// Table population function
const enlistingFunc = (online_players) => {
    let listOfPlayers = online_players

    if(listOfPlayers.length < 26){
      
        // status update for all passengers as the list
        let listCounter = 1
        while(listCounter <= listOfPlayers.length){  
            let spanIdC1 = `${listCounter}` + "1";
            let spanIdC2 = `${listCounter}` + "2";
            let spanIdC3 = `${listCounter}` + "3";
           
            if(listOfPlayers.length < 6){

                document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                document.getElementById(spanIdC2).innerText = '';
                document.getElementById(spanIdC3).innerText = "booking";
                
                listCounter++

            }else if(listOfPlayers.length > 5 && listOfPlayers.length < 11){
                if (listCounter < 6){
                    document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                    document.getElementById(spanIdC2).innerText = '';
                    document.getElementById(spanIdC3).innerText = "check-in"
                    listCounter++
                }
                else {
                    document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                    document.getElementById(spanIdC2).innerText = '';
                    document.getElementById(spanIdC3).innerText = "booking"
                    listCounter++
                }

            }else if(listOfPlayers.length > 10 && listOfPlayers.length < 16){
                if (listCounter < 6){
                    document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                    document.getElementById(spanIdC2).innerText = '';
                    document.getElementById(spanIdC3).innerText = "boarding"
                    listCounter++
                }
                else{
                    document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                    document.getElementById(spanIdC2).innerText = '';
                    document.getElementById(spanIdC3).innerText = "booking"
                    listCounter++
                }

            }else if(online_players[0].length > 15 && online_players[0].length < 21){
                if (listCounter < 6){
                    document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                    document.getElementById(spanIdC2).innerText = '';
                    document.getElementById(spanIdC3).innerText = "flying"
                    listCounter++
                }
                else{
                    document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                    document.getElementById(spanIdC2).innerText = '';
                    document.getElementById(spanIdC3).innerText = "booking"
                    listCounter++
                }

            }else{
                if (listCounter < 6){
                    document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                    document.getElementById(spanIdC2).innerText = '';
                    document.getElementById(spanIdC3).innerText = "landing"
                    listCounter++
                }
                else{
                    document.getElementById(spanIdC1).innerText = listOfPlayers[listCounter-1].player_id;
                    document.getElementById(spanIdC2).innerText = '';
                    document.getElementById(spanIdC3).innerText = "booking"
                    listCounter++
                }
            }
        }

    }
} 

// server sent events listener
const eventSource = new EventSource('/events');
eventSource.onmessage = async (event) => {  
    let playings = await fetchPlayingPlayers()
    let online_players = JSON.parse(event.data)[1][0]
    console.log(playings);
    console.log(online_players + ' players online');
    enlistingFunc(playings)
};

console.log("bronze level script loaded")

