const playBtn = document.getElementsByClassName ('play')[0];
const lapBtn  = document.getElementsByClassName ('lap')[0];
const resetBtn  = document.getElementsByClassName ('reset')[0];
const clearBtn  = document.getElementsByClassName ('lap-clear-btn')[0];
const second  = document.getElementsByClassName ('sec')[0];
const minute  = document.getElementsByClassName ('minute')[0];
const centisecond  = document.getElementsByClassName ('msec')[0];
const laps = document.getElementsByClassName ('laps')[0];

let isPlay = false
let secCounter = 0;
let min;
let sec;
let centiSec;
let centiCounter = 0;
let minCounter = 0;
let lapItem = 0;
let isReset = false;

const toggleButton = () => {
    lapBtn.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
}

const play = () => {
    if (!isPlay && !isReset) {
        playBtn.innerHTML = 'Pause';
        min =  setInterval(() => {
             minute.innerHTML = `${ ++minCounter} :`;  
        }, 60*1000);

          sec =  setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
             second.innerHTML = `&nbsp;${ ++secCounter} : `;  
        }, 1000);
        centiSec =  setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centisecond.innerHTML = `&nbsp;${ ++centiCounter}`;  
       }, 10);
        isPlay = true;
        isReset = true;
    }
    else {
        playBtn.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSec);
        isPlay = false;
        isReset =false;
    }
    toggleButton();
}
  
    const reset = () => {
        isReset = true;
        play();
        lapBtn.classList.add('hidden');
        resetBtn.classList.add('hidden');
        second.innerHTML = '&nbsp;0 :'
        centisecond.innerHTML = '&nbsp;0';
        minute.innerHTML = '0 :';
}
const lap = () => {
    const li = document.createElement('li');
    const number = document.createElement('span');
    const timeStamp =document.createElement ('span');

    li.setAttribute('class', 'lap-item');
    number.setAttribute('class', 'number');
    timeStamp.setAttribute('class', 'time-stamp');

    number.innerText = `#${++lapItem} `;
    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number, timeStamp);
    laps.append(li);

    clearBtn.classList.remove('hidden');

}
const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearBtn);
    clearBtn.classList.add('hidden');
}

playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
clearBtn.addEventListener('click', clearAll);