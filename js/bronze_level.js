//bronze level javaScript file (i.e. index html file)

//client status tracker
const bookingList = []

//person class and do not forget to keep the record of successful levels in the database
class Person{
	constructor(fullName, cellNumber, tTrips, sTrips, cl, bl, gl, sl, pl){
    	this.fullName = fullName;
        this.cellNumber = cellNumber;
        this.tTrips = tTrips; // total trips/all cashing out attempts
        this.sTrips = sTrips; // successful trips/successful cashout
        this.cl = cl;         // copper level
        this.bl = bl;
        this.gl = gl;        // gold level
        this.sl = sl;
        this.pl = pl;
    }
}

let cellNumberInput = document.getElementById('bronze-cn')                          // getting the input field value 

let typedNumber = ""                                                                // placeholder for new entered numbers

//input onchange function
let cellNumberHandler = () => { typedNumber = cellNumberInput.value }               // function triggered by the onchange to update the typedNumber

let enlistingButton = document.getElementById('click-enlist')                        // cell number enlisting button assign to the variable

// cell number enlisting function
const enlistingFunc = () => {
    if(typedNumber.length < 10){
        alert("Entered cell number is not valid, please try again")
        return
    } 
    else{
        const person = new Person("", typedNumber, 0, 0, 0, 0, 0, 0)
        bookingList.push(person)

        cellNumberInput.value = ""  //clearing the input field for the cell number
    
        // Enlisting successfully booked numbers in the first column of the table
        if(bookingList.length < 26){
            for(let i = 1; i < bookingList.length + 1; i++){
                let spanIdC1 = `${i}` + "1"
                let spanIdC2 = `${i}` + "2"
                let reversedText= ""

                //iterate over each entry of bookings
                for(j = 9; j >= 0; j--){
                    if(bookingList[i - 1].cellNumber[j] == '0') reversedText +="R"
                    else if(bookingList[i - 1].cellNumber[j] == '1') reversedText +="X"
                    else if(bookingList[i - 1].cellNumber[j] == '2') reversedText +="K"
                    else if(bookingList[i - 1].cellNumber[j] == '5') reversedText +="Z"
                    else reversedText += bookingList[i - 1].cellNumber[j]
                }
                
                //providing the innerText for span field in the table accordingly
                document.getElementById(spanIdC1).innerText = reversedText.slice(2, 8)
                document.getElementById(spanIdC2).innerText = `${bookingList[i - 1].sTrips}` + '/' + `${bookingList[i - 1].tTrips}`
                
            
                
            }

            // status update for all passengers
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

                //iterate over each entry of bookings
                for(j = 9; j >= 0; j--){
                    if(bookingList[i - 1].cellNumber[j] == '0') reversedText +="R"
                    else if(bookingList[i - 1].cellNumber[j] == '1') reversedText +="X"
                    else if(bookingList[i - 1].cellNumber[j] == '2') reversedText +="K"
                    else if(bookingList[i - 1].cellNumber[j] == '5') reversedText +="Z"
                    else reversedText += bookingList[i - 1].cellNumber[j]
                }
                
                //providing the innerText for span field in the table accordingly
                document.getElementById(spanIdC1).innerText = reversedText.slice(2, 8)
                document.getElementById(spanIdC2).innerText = `${bookingList[i - 1].sTrips}` + '/' + `${bookingList[i - 1].tTrips}`
                
            }

            // status update for all passengers for the last time
            let listCounter = 1
            while(listCounter <= bookingList.length){
                let spanIdC3 = `${listCounter}` + "3"
                
                if (listCounter < 6){
                    document.getElementById(spanIdC3).innerText = "landing..."
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

            // remaining for the next cycle, random selection
            let remainingMembers = []
            const randomNumber = () =>  Math.floor(Math.random() * 22) + 5
            while(remainingMembers.length < 5){
               let num = randomNumber()
              if(remainingMembers.indexOf(num) == -1){
                remainingMembers.push(num)
              }
            }

            // remaining behind in the waiting roon
            let waitingRoomMembers = []
            while(waitingRoomMembers.length < 4){
                let num = randomNumber()
                if(waitingRoomMembers.indexOf(num) == -1 && remainingMembers.indexOf(num) == -1){
                    waitingRoomMembers.push(num)
                }
            }

            // putting waiting people at the end
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

            for(let i = 0; i < 26; i++){
                let spanIdC3 = `${i + 1}` + "3"
                if(i < 5){
                    document.getElementById(spanIdC3).innerText = "Cashing-Out"
                    document.getElementById(spanIdC3).style.color = "green"
                }else{
                
                        if(remainingMembers.indexOf(i + 1) == -1 && waitingRoomMembers.indexOf(i + 1) == -1){
                            document.getElementById(spanIdC3).innerText = "Getting Refund"
                            document.getElementById(spanIdC3).style.color = "red"

                        }else if(remainingMembers.indexOf(i + 1) != -1){
                            document.getElementById(spanIdC3).innerText = "Remain Behind "    
                            document.getElementById(spanIdC3).style.color = "orange"
                        }
                   }
                
            }
        }
    } 

} 


