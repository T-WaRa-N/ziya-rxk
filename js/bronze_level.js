//bronze level javaScript file (i.e. index html file)

//client status tracker
const bookingList = []
const status = ["booking...", "checking in...", "boarding...", "flying...", "landing..."]
const refund = "refunding..."

//person class and do not forget to keep the record of successful levels in the database
class Person{
	constructor(fullName, cellNumber, tTrips, sTrips, bl, gl, sl, pl){
    	this.fullName = fullName;
        this.cellNumber = cellNumber;
        this.tTrips = tTrips;
        this.sTrips = sTrips;
        this.bl = bl;
        this.gl = gl;
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
        if(bookingList.length <= 26){
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
        else alert("fully booked wait for the next round")
    } 

    
}                                                                           



