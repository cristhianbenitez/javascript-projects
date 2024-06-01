const multiStepForm = document.querySelector('[data-multi-step]');
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')];

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains('active');
});

console.log(currentStep);

if (currentStep < 0) {
  currentStep = 0;
  formSteps[currentStep].classList.add('active');
}

multiStepForm.addEventListener('click', (e) => {
  let incrementor;
  if (e.target.matches('[data-next]')) {
    incrementor = 1;
  } else if (e.target.matches('[data-previous]')) {
    incrementor = -1;
  } else {
    return;
  }

  if (incrementor == null) return;

  currentStep += incrementor;
  showCurrentStep();
});

const showCurrentStep = () => {
  formSteps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
  });
};
