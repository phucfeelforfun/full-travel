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
countdown.addEventListener('click', (e) => {
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


///----handle Trip
var courseApi = 'http://localhost:3000/trip'
btn.addEventListener('click', (e) => {
    e.preventDefault()


    var checkLogin = checkSubmit(check)
    

    if (checkLogin) {
        hadleCreateTrip()
        // for (var i = 0; i < check.length; i++) {
        //     infoRes[i] = check[i].value;

        // }
        // infoTripUser = new Trip(...infoRes)
        // console.log(infoTripUser.call())

        // console.log(infoTripUser.getLocation)
        // var date = infoTripUser.getLastDate.getTime() - infoTripUser.getFirstDate.getTime();
        // date = Math.floor(date / (24 * 60 * 60 * 1000))
        // document.querySelector('.trip-location').innerHTML = 'Location: ' + `${infoTripUser.getLocation}`;
        // document.querySelector('.trip-date').innerHTML = 'Date in ' + `${date}` + ' days';
        // document.querySelector('.trip-passen').innerHTML = 'passengers: ' + `${infoTripUser.getPassen}`;
        // // var arrayInfo = infoTripUser.array();
        // // for (var i = 0; i < showInfo.length; i++) {
        // //     showInfo[i].value = arrayInfo[i];
        // // }

        // infoResult.style.display = "flex";
    }
})

function createDate(formData,callback) {
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(formData)
    }

    fetch(courseApi,option)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function hadleCreateTrip(){
    var locations = document.querySelector('.text-location').value
    
    var firstDate = new Date(document.querySelector('.text-checkin').value).getTime()
    
    var lastDate = new Date(document.querySelector('.text-checkout').value).getTime()
    var passen = document.querySelector('.text-travel').value
    var date = lastDate - firstDate 
    date = Math.floor(date / (24 * 60 * 60 * 1000))
    
    var formDataTrip ={
        location:locations,
        firstDate:firstDate,
        lastDate:lastDate,
        passenger:passen,
        date:date
    }
    createDate(formDataTrip)
    
}
function renderListTrip () {
    fetch(courseApi)
    .then(function(response){
        return response.json();
    })
    .then(function(trip){
        let htmls = trip.map(function(trips){
        return `
        <li><a class="dropdown-item" href="#" onclick="showInfoTrip(${trips.id})">Info Trip${trips.id} </a></li>
        `})
        document.querySelector('.dropdown-menu').innerHTML = htmls.join('')
    })
    
}
function showInfoTrip(tripId) {
    document.querySelector('.info-trip').style.display="flex"
    fetch(courseApi + `/${tripId}`)
    .then(function(response){
        return response.json();
    })
    .then(function(trips){
        var tripInfoHtml = `
        <h1 class="mb-4" style="font-family: Inter;font-size: 36px;font-style: normal;font-weight: 700;">Info Trip ${trips.id}
        </h1>
    <div class="col-12 mb-4">
        <h1 for="validationDefault01" class="form-label trip-location">Location: ${trips.location}</h1>

    </div>
    <div class="col-6 mb-4">
        <h1 for="validationDefault01" class="form-label trip-date">date in: ${trips.date} days </h1>
    </div>
    <div class="col-12">
        <h1 for="validationDefault01" class="form-label trip-passen">passenger: ${trips.passenger}</h1>
        `
        document.querySelector('.info-trip').innerHTML = tripInfoHtml;
    })
}

//----------------Check validation Form------------

check.forEach(form => {
    form.addEventListener('input', event => {
        form.classList.remove('is-invalid')
    })
})

//---countdown-------
let checkAdd = document.getElementById('validationFormCheck1')

function Check() {
    
    if (checkAdd.checked) {
        document.querySelector('.add-time').style.display="flex";
    }
    else {
        document.querySelector('.add-time').style.display ="none";
    }

}
let endDate
function getDate() {
    endDate = new Date(document.querySelector('.input-date').value).getTime()
}
let endDate2
function getDate2() {
    endDate2 = new Date(document.querySelector('.input-date-second').value).getTime()
}
function showDate() {
    let run = document.querySelector('.run')
    let showTime = run.querySelectorAll('input')
    let timeout = document.querySelector('.timeout')
    timeout.innerHTML = '';
    let check = setInterval(function () {
        let timeNow = new Date().getTime();
        let endDateFirst = Math.floor(endDate / Math.pow(10, Math.floor(Math.log10(endDate)) - 8))
        let timeNowCal = Math.floor(timeNow / Math.pow(10, Math.floor(Math.log10(timeNow)) - 8))
        let endDateLast = Math.floor(endDate2 / Math.pow(10, Math.floor(Math.log10(endDate2)) - 8))
        function calTime(endDate, timeNow) {
            let distance = endDate - timeNow;
            let day = Math.floor(distance / (24 * 60 * 60 * 1000));
            let hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
            let seconds = Math.floor((distance % (60 * 1000)) / 1000);
            let a = [day, hour, minute, seconds]
            for (var i = 0; i < a.length; i++) {
                showTime[i].value = a[i]
            }
        }
        if (!endDate) {
            clearInterval(check);
        }
        else if (!endDate2) {
            if (endDateFirst === timeNowCal) {
                timeout.innerHTML = 'Time Out';
                clearInterval(check);
            }
            else if (endDateFirst > timeNowCal) {
                calTime(endDate, timeNow)
            }
            else {
                calTime(timeNow, endDate)
            }
        } else if (endDateFirst < endDateLast) {
            if (timeNowCal === endDateLast) {
                timeout.innerHTML = 'Time Out';
                clearInterval(check);

            }
            else if (endDateFirst > timeNowCal) {
                calTime(endDate, timeNow)

            }
            else {
                calTime(endDate2, timeNow)
            }
        } else {
            clearInterval(check);
        }
    }, 1000);
}




