//bronze level javaScript file (i.e. index html file)
let id = ""

// --------code communicating to the server----------------
const comms_to_backend = async () => {
    if (document.getElementById('bronze-cn').value.length < 10) {
        alert("Please enter a valid cellphone number to play")
        return
    }
    const res = await fetch("/play",{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify({
          phone:document.getElementById('bronze-cn').value,
          level:"bronze"  
        })
    })
    const data = await res.json()
    if(data.server){
        document.getElementById('bronze-cn').value = ""
        alert(data.server)
    }
} 


// server sent events listener
const eventSource = new EventSource('/events');
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log('SSE event received:', data)
};


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
if (bookingList.length == 26) {
    // function to refresh the queue
}

// // all iterations should continue after 2 seconds
// const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms))
// counter_temp = 0
// // create a loop for each stage of ziya rxk and this is bronze level
// while(counter_temp < 3){

//     const playing_members = async () => {
//         const res = await fetch("/now_playing", {
//             method:'GET',
//             headers:{
//                 "content-Type":"application/json"
//             },
//         })
//         const response = await res.json()
//         if( response.server) alert(response.server)
//     }
//     playing_members()
//     await delay(2000) //2 seconds delay between each iteration
//     print(counter_temp)
//     counter_temp++
//     if(bookingList.length == 26) break
// }

//person class and do not forget to keep the record of successful levels in the database
class Person{
	constructor(fullName, cellNumber, tTrips, sTrips, cl, bl, gl, sl, pl){
    	this.fullName = fullName;
        this.cellNumber = cellNumber;
        this.tTrips = tTrips; // total trips/all cashing out attempts
        this.sTrips = sTrips; // successful trips/successful cashout
        this.cl = cl;         // copper level aka beginner
        this.bl = bl;
        this.gl = gl;        // gold level
        this.sl = sl;
        this.pl = pl;
    }
}


// cell number enlisting function
const enlistingFunc = () => {
    // if(typedNumber.length < 10){
    //     alert("Entered cell number is not valid, please try again")
    //     return
    // } 
    // else{
    const person = new Person("", typedNumber, 0, 0, 0, 0, 0, 0, 0)
    bookingList.push(person)

    cellNumberInput.value = ""  //clearing the input field for the cell number

    // Enlisting successfully booked numbers in the first column of the table
    if(bookingList.length < 26){
        //number encoder
        for(let i = 1; i < bookingList.length + 1; i++){
            let spanIdC1 = `${i}` + "1"
            let spanIdC2 = `${i}` + "2"
            let reversedText= ""

            //iterate over each entry of bookings
            document.getElementById(spanIdC1).innerText = reversedText.slice(2, 8) // put user id here
            document.getElementById(spanIdC2).innerText = `${bookingList[i - 1].sTrips}` + '/' + `${bookingList[i - 1].tTrips}` // trips won/total trips
                            
        }

        // status update for all passengers as the list
        let listCounter = 1
        while(listCounter <= bookingList.length){
            let spanIdC3 = `${listCounter}` + "3"
            if(bookingList.length < 6){
                document.getElementById(spanIdC3).innerText = "booking..."
                listCounter++
            }
            else if(bookingList.length > 5 && bookingList.length < 11){
                if (listCounter < 6){
                    document.getElementById(spanIdC3).innerText = "checking-in..."
                    listCounter++
                }
                else {
                    document.getElementById(spanIdC3).innerText = "booking..."
                    listCounter++
                }
            }
            else if(bookingList.length > 10 && bookingList.length < 16){
                if (listCounter < 6){
                    document.getElementById(spanIdC3).innerText = "boarding..."
                    listCounter++
                }
                else{
                    document.getElementById(spanIdC3).innerText = "booking..."
                    listCounter++
                }
            }
            else if(bookingList.length > 15 && bookingList.length < 21){
                if (listCounter < 6){
                    document.getElementById(spanIdC3).innerText = "flying..."
                    listCounter++
                }
                else{
                    document.getElementById(spanIdC3).innerText = "booking..."
                    listCounter++
                }
            }
            else{
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
    else{
        // Enlisting successfully booked numbers in the first column of the table
        for(let i = 1; i < bookingList.length + 1; i++){
            let spanIdC1 = `${i}` + "1"
            let spanIdC2 = `${i}` + "2"
            let reversedText= ""

            // providing the innerText for span field in the table accordingly
            document.getElementById(spanIdC1).innerText = reversedText.slice(2, 8)
            document.getElementById(spanIdC2).innerText = `${bookingList[i - 1].sTrips}` + '/' + `${bookingList[i - 1].tTrips}`
            
        }

        // status update for all passengers for the last time
        let listCounter = 1
        while(listCounter <= bookingList.length){
            let spanIdC3 = `${listCounter}` + "3"
            
            if (listCounter < 6){
                document.getElementById(spanIdC3).innerText = "cashing out..."
                listCounter++
            }
            else{
                document.getElementById(spanIdC3).innerText = "booking..."
                listCounter++
            }
        }
        // disable the cell number input field
        cellNumberInput.disabled = true
        cellNumberInput.placeholder = "Please wait for the next cycle"
        enlistingButton.disabled = true

        // remaining for the next cycle, random selection
        let remainingMembers = []
        const randomNumber = () =>  Math.floor(Math.random() * 22) + 5
        while(remainingMembers.length < 5){
            let num = randomNumber()
            if(remainingMembers.indexOf(num) == -1){
                remainingMembers.push(num)
            }
        }

        // remaining behind in the waiting room and one have a chance to cashout (this is their index)
        let waitingRoomMembers = []
        while(waitingRoomMembers.length < 4){
            let num = randomNumber()
            if(waitingRoomMembers.indexOf(num) == -1 && remainingMembers.indexOf(num) == -1){
                waitingRoomMembers.push(num)
            }
        }

        // put waiting people at the end of the list
        for(let i = 0; i < 4; i++){
            let waitingIndex = waitingRoomMembers[i]
            let personToMoveC1 = `${waitingIndex}` + '1'
            let personToMoveC2 = `${waitingIndex}` + '2'
            let personToMoveC3 = `${waitingIndex}` + '3'
            if(i == 0){
                document.getElementById('271').innerText = document.getElementById(personToMoveC1).innerText
                document.getElementById('272').innerText = document.getElementById(personToMoveC2).innerText
                document.getElementById('273').innerText = 'Waiting Room'
                document.getElementById(personToMoveC1).innerText = ''
                document.getElementById(personToMoveC2).innerText = ''
                document.getElementById(personToMoveC3).innerText = ''
            }
            if(i == 1){
                document.getElementById('281').innerText = document.getElementById(personToMoveC1).innerText
                document.getElementById('282').innerText = document.getElementById(personToMoveC2).innerText
                document.getElementById('283').innerText = 'Waiting Room'
                document.getElementById(personToMoveC1).innerText = ''
                document.getElementById(personToMoveC2).innerText = ''
                document.getElementById(personToMoveC3).innerText = ''
            }
            if(i == 2){
                document.getElementById('291').innerText = document.getElementById(personToMoveC1).innerText
                document.getElementById('292').innerText = document.getElementById(personToMoveC2).innerText
                document.getElementById('293').innerText = 'Waiting Room'
                document.getElementById(personToMoveC1).innerText = ''
                document.getElementById(personToMoveC2).innerText = ''
                document.getElementById(personToMoveC3).innerText = ''
            }
            if(i == 3){
                document.getElementById('301').innerText = document.getElementById(personToMoveC1).innerText
                document.getElementById('302').innerText = document.getElementById(personToMoveC2).innerText
                document.getElementById('303').innerText = 'Waiting Room'
                document.getElementById(personToMoveC1).innerText = ''
                document.getElementById(personToMoveC2).innerText = ''
                document.getElementById(personToMoveC3).innerText = ''
            }
        }

        for(let i = 1; i < 27; i++){
            let spanIdC3 = `${i}` + "3"
            if(i < 6){
                document.getElementById(spanIdC3).innerText = "paid..."
                document.getElementById(spanIdC3).style.color = "green"
            }else{
            
                if(remainingMembers.indexOf(i-1) == -1 && waitingRoomMembers.indexOf(i-1) == -1){
                    document.getElementById(spanIdC3).innerText = "refunded..."
                    document.getElementById(spanIdC3).style.color = "red"
                    refundMembers.push(bookingList[i-1])
                    console.log(refundMembers)

                }else{
                    document.getElementById(spanIdC3).innerText = "staying..."    
                    document.getElementById(spanIdC3).style.color = "orange"
                }
            }
            
        }
    }
} 


