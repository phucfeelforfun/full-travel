var btnOpen = document.querySelector('.btn-open');
var btnClose = document.querySelector('.btn-close');
let login = document.querySelector('.login');
var loginContent = document.querySelector('.login-content')
var info = document.querySelector('.info')
var btn = document.querySelector('.btn-inform')
var check = info.querySelectorAll('input');;
var infoResult = document.querySelector('.info-trip'); infoResult.style.display = "none";
var infoRes = [];
var btnShow = document.querySelector('.btn-show')
var showInfo = infoResult.querySelectorAll('input')
var countdown = document.querySelector('.coundown')
var countdownContent = document.querySelector('.coundown-content')


//------save date---
class Trip {
    constructor(location, firstDate, lastDate, passen) {
        this.location = location;
        this.firstDate = new Date(firstDate) ;
        this.lastDate =new Date(lastDate);
        this.passen = passen;
    }

    get getLocation() {
        return this.location;
    }

    set setLocation(loca) {
        this.location = loca;
    }

    get getFirstDate() {
        return this.firstDate;
    }

    set setFirstDate(date) {
        this.firstDate = date;
    }

    get getLastDate() {
        return this.lastDate;
    }

    set setLastDate(date) {
        this.lastDate = date;
    }

    get getPassen() {
        return this.passen;
    }

    set setPassen(pass) {
        this.passen = pass;
    }
    date(){
        
    }
    call() {
        return this.getLocation + " " + this.getFirstDate + " " + this.getLastDate + " " + this.getPassen;
    }
    array() {
        var a = [this.getLocation, this.getFirstDate, this.getLastDate, this.getPassen]
        return a;
    }
}
//--------------------Show PopUp-----------------
function show() {
    login.classList.add('show');
}


function hide() {
    login.classList.remove('show');
    countdown.classList.remove('show');
}

login.addEventListener('click', (e) => {
    if (!loginContent.contains(e.target)) {
        hide();
    }
})
document.onkeyup = function (evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
        hide();
    }
};
function showCount() {  
    countdown.classList.add('show'); 
}
countdown.addEventListener('click',(e)=> {
    if (!countdownContent.contains(e.target)) {
        hide();
    }
})
//--------------------------------check null--------------
//-----------if null-------


function checkNull(input) {
    input.classList.add('is-invalid')
}
function checkNotNull(input) {
    input.classList.remove('is-invalid');
}
function checkSubmit(listInput) {
    var isEmty = false;
    var count = 0;
    listInput.forEach(input => {
        if (!input.value) {
            checkNull(input)

        }
        else {
            checkNotNull(input)
            console.log(input.value)
            count += 1;
        }
    })
    if (count == listInput.length) {
        isEmty = true;
    }
    return isEmty;
}
let infoTripUser = new Trip();
btn.addEventListener('click', (e) => {
    e.preventDefault()


    var checkLogin = checkSubmit(check)
    console.log(checkLogin)

    if (checkLogin) {
        for (var i = 0; i < check.length; i++) {
            infoRes[i] = check[i].value;

        }
        infoTripUser = new Trip(...infoRes)
        console.log(infoTripUser.call())

        console.log(infoTripUser.getLocation)
        var date = infoTripUser.getLastDate.getTime() - infoTripUser.getFirstDate.getTime();
        date = Math.floor(date / (24 * 60 * 60 * 1000))
        document.querySelector('.trip-location').innerHTML='Location: ' + `${infoTripUser.getLocation}`;
        document.querySelector('.trip-date').innerHTML='Date in ' + `${date}` + 'days';
        document.querySelector('.trip-passen').innerHTML='passengers: ' + `${infoTripUser.getPassen}`;
        // var arrayInfo = infoTripUser.array();
        // for (var i = 0; i < showInfo.length; i++) {
        //     showInfo[i].value = arrayInfo[i];
        // }

        infoResult.style.display = "flex";
    }
})


//----------------Check validation Form------------

check.forEach(form => {
    form.addEventListener('input', event => {
        form.classList.remove('is-invalid')
    })
})
//---countdown-------

function showDate() {
    let endDate = new Date(document.querySelector('.input-date').value).getTime()
    let endDate2 = new Date(document.querySelector('.input-date-second').value).getTime()
    let run = document.querySelector('.run')
    let showTime = run.querySelectorAll('input')
    let timeout = document.querySelector('.timeout')
    timeout.innerHTML='';
    let check = setInterval(function () {

        let timeNow = new Date().getTime();
        let endDateFirst= Math.floor(endDate / Math.pow(10, Math.floor(Math.log10(endDate)) - 8))
        let timeNowCal =Math.floor(timeNow / Math.pow(10, Math.floor(Math.log10(timeNow)) - 8))
        let endDateLast = Math.floor(endDate2 / Math.pow(10, Math.floor(Math.log10(endDate2)) - 8))
        console.log(endDateFirst)
        console.log(timeNowCal)
        console.log(endDateLast)
        if(!endDate){
            clearInterval(check);
        }
        else if (!endDate2) {
            if (endDateFirst === timeNowCal) {
                timeout.innerHTML= 'Time Out';
                clearInterval(check);

            }
            else if (endDateFirst > timeNowCal) {
                let distance = endDate - timeNow;
                let day = Math.floor(distance / (24 * 60 * 60 * 1000));
                let hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
                let seconds = Math.floor((distance % (60 * 1000)) / 1000);
                let a = [day, hour, minute, seconds]
                for(var i=0;i < a.length;i++){
                    showTime[i].value = a[i]
                }

            }
            else {
                let distance = timeNow - endDate;
                let day = Math.floor(distance / (24 * 60 * 60 * 1000));
                let hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
                let seconds = Math.floor((distance % (60 * 1000)) / 1000);
                console.log(day + '/' + hour + '/' + minute + '/' + seconds)
                let a = [day, hour, minute, seconds]
                for(var i=0;i < a.length;i++){
                    showTime[i].value = a[i]
                }
            }
        }else if(endDateFirst<endDateLast){
            if (timeNowCal === endDateLast) {
                timeout.innerHTML= 'Time Out';
                clearInterval(check);

            }
            else if (endDateFirst > timeNowCal) {
                let distance =endDate- timeNow ;
                let day = Math.floor(distance / (24 * 60 * 60 * 1000));
                let hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
                let seconds = Math.floor((distance % (60 * 1000)) / 1000);
                let a = [day, hour, minute, seconds]
                for(var i=0;i < a.length;i++){
                    showTime[i].value = a[i]
                }

            }
            else {
                let distance = endDate2-timeNow;
                let day = Math.floor(distance / (24 * 60 * 60 * 1000));
                let hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
                let seconds = Math.floor((distance % (60 * 1000)) / 1000);
                console.log(day + '/' + hour + '/' + minute + '/' + seconds)
                let a = [day, hour, minute, seconds]
                for(var i=0;i < a.length;i++){
                    showTime[i].value = a[i]
                }
            }
        }else {
            clearInterval(check);
        }



    }, 1000);
}




