import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', makePromise);

function makePromise(event) {
  event.preventDefault();

  const delay = event.target.elements.delay.value;
  console.log(delay);
  const state = event.target.elements.state.value;
  console.log(state);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59a10d',
        position: 'topRight',
        messageSize: '18',
      })
    )
    .catch(delay =>
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#ef4040',
        position: 'topRight',
        messageSize: '18',
      })
    );
  event.target.reset();
}
