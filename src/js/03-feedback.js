const feedBackForm = document.querySelector('.feedback-form');
let throttle = require('lodash.throttle');

const formInput = event => {
  const { email, message } = feedBackForm.elements;
  const formValue = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formValue));
};

const restoreFromLocal = () => {
  const formLocalOutput = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
  if (formLocalOutput === null) {
    return;
  }
  const { email, message } = feedBackForm.elements;
  email.value = formLocalOutput.email;
  message.value = formLocalOutput.message;
};

const onSubmit = event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  feedBackForm.reset();
  localStorage.removeItem('feedback-form-state');
};

feedBackForm.addEventListener('input', throttle(formInput, 500));
window.addEventListener('load', restoreFromLocal);
feedBackForm.addEventListener('submit', onSubmit);
