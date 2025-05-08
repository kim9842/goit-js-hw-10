import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const radioButtons = document.querySelectorAll('input[name="state"]');

const createPromise = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(delayInput.value);
  const selectedState = [...radioButtons].find(radio => radio.checked)?.value;

  if (!selectedState) {
    iziToast.error({
      message: 'Please select a state!',
      position: 'topCenter',
      timeout: 3000,
    });
    return;
  }

  createPromise(delay, selectedState === 'fulfilled')
    .then(() => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        timeout: 5000,
      });
    })
    .catch(() => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        timeout: 5000,
      });
    });

  form.reset();
});
