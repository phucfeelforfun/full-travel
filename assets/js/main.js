var btnOpen = document.querySelector('.btn-open');
var btnClose = document.querySelector('.btn-close');
let login = document.querySelector('.login');
var loginContent = document.querySelector('.login-content')
var info = document.querySelector('.info')
var btn = document.querySelector('.btn-inform')
var check = info.querySelectorAll('input');
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
        var promise = new Promise(
            function(resolve, reject){
                resolve()// thành công
                reject()// thất bại
            }    
        )
        promise
        .then(function(){
            hadleCreateTrip()
        })
        .then(function(){
            check.forEach(checks=>{
                checks.value="";
            })
        })
        .then(function(){
            showSuccessToast();
        })
       
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
        <li>
        
        <a class="dropdown-item" href="#" onclick="showInfoTrip(${trips.id})">Info Trip ${trips.id} </a>
        </li>
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
        <div class="d-flex justify-content-between align ">
        <h1 class="mb-4" style="font-family: Inter;font-size: 36px;font-style: normal;font-weight: 700;">Info Trip ${trips.id}</h1>
        <div>
        <i class="fa-solid fa-pen me pe-2 border-end border-2" onclick="showdangerToast()" style="color: #1257ce;"></i>
        <i class="fa-solid fa-trash-can ps-2" style="color: #0856dd;"></i>
        </div>
        
        </div>
        
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
//--------toast message
function toast({title='',message='',type='',duration=3000}){
    let main = document.getElementById('toast-message');
    
    if (main){
        
        var toast = document.createElement('div')
        toast.classList.add('toast-message',`toast-${type}`)
        var icons ={
            success:'fa-solid fa-circle-check',
            error:'fa-solid fa-xmark',
            danger:'fa-solid fa-xmark'
        }
        var delay = (duration/1000).toFixed(2);
        toast.style.animation = `slideInLeft ease .3s, opac linear 1s ${delay}s forwards`;
        var icon = icons[type]
        toast.innerHTML=`
        <div class="icon-toast">
                <i class="${icon}"></i>
            </div>
            <div class="content-toast">
                <h1>${title}</h1>
                <p>${message}</p>
            </div>
            <div class="close-toast" >
                <i class="fa-solid fa-circle-xmark"></i>
            </div>
        `;
        toast.onclick = function(e){
            if(e.target.closest('.close-toast')){
                main.removeChild(toast),
                clearTimeout(removeToast)
            }
        }
        main.appendChild(toast)
        var removeToast = setTimeout(function(){
            main.removeChild(toast)
        },duration + 1000)
    }
}
function showSuccessToast(){
    toast(
        {
            title:'Sucess',
            message:'I will done! oke',
            type:'success',
            duration:3000
        }
    )
}
function showdangerToast(){
    toast(
    {
        title:'Sucess',
        message:'I will done! oke',
        type:'danger',
        duration:3000
    }
)
}
const sum = eval("10*10+5");
console.log(sum);

