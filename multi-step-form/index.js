const multiStepForm = document.querySelector('[data-multi-step]');
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')];
const checkBoxes = [
  ...multiStepForm.querySelectorAll('input[type="checkbox"]')
];
const stepTracker = document.querySelector('[data-step-tracker]');

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains('active');
});

if (currentStep < 0) {
  currentStep = 0;
  formSteps[currentStep].classList.add('active');
}

checkBoxes.forEach((input) => {
  input.addEventListener('change', (e) => {
    if (e.target.checked) {
      e.target.classList.add('checked');
    } else {
      e.target.classList.remove('checked');
    }
    return;
  });
}); //Add checked class to checkbox on click

multiStepForm.addEventListener('click', (e) => {
  let incrementor;
  if (e.target.matches('[data-next]')) {
    incrementor = 1;
  } else if (e.target.matches('[data-previous]')) {
    incrementor = -1;
  } else {
    return;
  }
  const isOneChecked = checkBoxes.some((input) =>
    input.classList.contains('checked')
  ); // check if any checkbox is Checked

  if (incrementor == null) return;

  const inputs = e.target.parentElement.querySelectorAll('input');
  const isAllValid = [...inputs].every((input) => input.reportValidity());
  if (isAllValid || isOneChecked) {
    currentStep += incrementor;
    showCurrentStep();
    stepNumberCurrent();
    stepTrackerUpdate();
    if (currentStep > 1) {
      showSummary();
    }
  }
});

const showCurrentStep = () => {
  formSteps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
  });
};

const getInputValues = () => {
  const nameInput = multiStepForm.querySelector('input[name="name"]');
  const emailInput = multiStepForm.querySelector('input[name="email"]');
  const topicInputs = multiStepForm.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const topicValues = Array.from(topicInputs).map((input) => {
    const label = input.labels[0].textContent;
    return label;
  });
  return {
    name: nameInput.value,
    email: emailInput.value,
    topic: topicValues
  };
};

const showSummary = () => {
  const summaryName = multiStepForm.querySelector('#summary-name');
  const summaryEmail = multiStepForm.querySelector('#summary-email');
  const summaryTopics = multiStepForm.querySelector('#summary-topics');
  const summaryInputValues = getInputValues();
  summaryName.textContent = summaryInputValues.name;
  summaryEmail.textContent = summaryInputValues.email;
  summaryTopics.innerHTML = summaryInputValues.topic
    .map((topic) => `<li>${topic}</li>`)
    .join('');
};

const currentStepElement = document.querySelector('#current-step');

const stepNumberCurrent = () => {
  currentStepElement.textContent = currentStep + 1;
};

const stepTrackerUpdate = () => {
  const steps = [...stepTracker.children];
  steps.forEach((step, index) => {
    step.classList.remove('active');
    if (index === currentStep) {
      steps[currentStep].classList.add('active');
    }
  });
};

document.querySelector('[data-confirm]').addEventListener('click', () => {
  alert('✅ Success');
});
