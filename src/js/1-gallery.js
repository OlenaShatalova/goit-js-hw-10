import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function btnDisabled() {
  button.setAttribute('disabled', true);
}

////////general code
const button = document.querySelector('button');
/// ad function disabled
// button.setAttribute('disabled', true);
btnDisabled();
const input = document.querySelector('input');
let userSelectedDate;
let timerId;

const inputDate = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0].getTime();
      button.removeAttribute('disabled');
    } else {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        color: '#ef4040',
        position: 'topRight',
      });
      // button.setAttribute('disabled', true);
      btnDisabled();
    }
  },
});

button.addEventListener('click', onButtonClick);

function onButtonClick() {
  // button.setAttribute('disabled', true);
  btnDisabled();
  input.setAttribute('disabled', true);
  startTimer();
}

function startTimer() {
  timerId = setInterval(() => {
    const timeLeft = userSelectedDate - Date.now();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      iziToast.info({
        title: 'info',
        message: 'Time is up!',
        position: 'topCenter',
      });
      input.removeAttribute('disabled');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);

      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
    }
  }, 1000);
}
