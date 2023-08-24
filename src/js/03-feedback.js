const feedBackForm = document.querySelector('.feedback-form');
let throttle = require('lodash.throttle');
const formLocalOutput = JSON.parse(localStorage.getItem('feedback-form-state'));

const formInput = event => {
  const { email, message } = event.currentTarget;
  const formValue = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formValue));
};

const restoreFromLocal = () => {
  const { email, message } = feedBackForm.elements;
  if (formLocalOutput) {
    email.value = formLocalOutput.email;
    message.value = formLocalOutput.message;
  }
};

const onSubmit = event => {
  event.preventDefault();
  feedBackForm.reset();
  console.log(formLocalOutput);
  localStorage.removeItem('feedback-form-state');
};

feedBackForm.addEventListener('input', throttle(formInput, 500));
window.addEventListener('load', restoreFromLocal);
feedBackForm.addEventListener('submit', onSubmit);
