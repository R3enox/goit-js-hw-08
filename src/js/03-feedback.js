const feedBackForm = document.querySelector('.feedback-form');
let throttle = require('lodash.throttle');
const formLocalOutput = JSON.parse(localStorage.getItem('feedback-form-state'));

const restoreFromLocal = () => {
  if (formLocalOutput === null) {
    const { email, message } = feedBackForm.elements;
    email.value = formLocalOutput.email;
    message.value = formLocalOutput.message;
  }
};

const formInput = event => {
  const { email, message } = feedBackForm.elements;
  const formValue = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formValue));
};

const onSubmit = event => {
  event.preventDefault();
  feedBackForm.reset();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
};

feedBackForm.addEventListener('input', throttle(formInput, 500));
window.addEventListener('load', restoreFromLocal);
feedBackForm.addEventListener('submit', onSubmit);
