import { convertMs } from './partials/convertMs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const refsTimer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  input: document.getElementById('datetime-picker'),
};

const timer = {
  time: null,
  delay: 1000,
  idInterval: null,
  start() {
    refsTimer.input.disabled = true;
    startBtn.disabled = true;
    this.idInterval = setInterval(this.process.bind(timer), this.delay);
  },
  process() {
    if (this.time <= this.delay) return clearInterval(this.idInterval);
    this.time -= this.delay;
    renderTimer(this.time);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.time = selectedDates[0].getTime() - Date.now();
    if (checkDate(timer.time)) {
      renderTimer(timer.time);
    } else {
      renderTimer();
    }
  },
};
flatpickr('#datetime-picker', options);

function checkDate(date) {
  const startTimer = timer.start.bind(timer);
  const check = date > 0;
  if (check) {
    startBtn.disabled = false;
    startBtn.addEventListener('click', startTimer);
  } else {
    Notify.failure('Please choose a date in the future');
    startBtn.disabled = true;
    startBtn.removeEventListener('click', startTimer);
  }
  return check;
}

function renderTimer(date) {
  if (!date) {
    refsTimer.days.textContent = '00';
    refsTimer.hours.textContent = '00';
    refsTimer.minutes.textContent = '00';
    refsTimer.seconds.textContent = '00';
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(date);
  refsTimer.days.textContent = addLeadingZero(days);
  refsTimer.hours.textContent = addLeadingZero(hours);
  refsTimer.minutes.textContent = addLeadingZero(minutes);
  refsTimer.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
