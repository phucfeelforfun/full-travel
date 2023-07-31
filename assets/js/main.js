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
//------save date---
class Trip {
    constructor(location, firstDate, lastDate, passen) {
        this.location = location;
        this.firstDate = firstDate;
        this.lastDate = lastDate;
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
        var arrayInfo = infoTripUser.array();
        for (var i = 0; i < showInfo.length; i++) {
            showInfo[i].value = arrayInfo[i];
        }

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
let endDate = new Date("08/01/2023 00:00:00").getTime();
function countdown (){
    setInterval(function () {
    let timeNow = new Date()
    let distance = endDate - timeNow;
    let day = Math.floor(distance / (24 * 60 * 60 * 1000));
    let hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((distance % (60 * 1000)) / 1000);
    console.log(day +'/'+ hour +'/'+minute +'/'+ seconds )
    
    if (distance <= 0) {
        clearInterval(check);
    }
}, 1000);
}
