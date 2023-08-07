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

let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime() - Date.now();
    checkDate(selectedDate);
  },
};
flatpickr('#datetime-picker', options);

const timer = {
  delay: 1000,
  isActive: false,
  idInterval: null,
  start() {
    if (this.isActive) {
      return;
      }
    refsTimer.input.disabled = true;
    startBtn.disabled = true;
    this.idInterval = setInterval(this.process.bind(timer), this.delay);
  },
  process() {
    if (selectedDate <= 1000) clearInterval(this.idInterval);
    this.isActive = true;
    initTimer(selectedDate);
    selectedDate -= this.delay;
  },
};

function checkDate(date) {
  if (date > 0) {
    initTimer(selectedDate);
    startBtn.disabled = false;
    startBtn.addEventListener('click', timer.start.bind(timer));
  } else {
    initTimer(0);
    Notify.failure('Please choose a date in the future');
    startBtn.disabled = true;
    startBtn.removeEventListener('click', timer.start.bind(timer));
  }
}

function initTimer(date) {
  if (!date) {
    refsTimer.days.textContent = 0;
    refsTimer.hours.textContent = 0;
    refsTimer.minutes.textContent = 0;
    refsTimer.seconds.textContent = 0;
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
