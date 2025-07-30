
// Bootstrap validation
// (() => {
//   'use strict'

//   // Fetch all the forms we want to apply custom validation to
//   const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission if invalid
//   Array.from(forms).forEach(form => {
//     form.addEventListener('submit', event => {
//       if (!form.checkValidity()) {
//         event.preventDefault()
//         event.stopPropagation()
//       }

//       form.classList.add('was-validated')
//     }, false)
//   })
// })()

// Bootstrap validation
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      let isValid = true;

      // Regex to check if value is only numbers
      const numberOnlyRegex = /^\d+$/;

      // Title validation
      const titleInput = form.querySelector('input[name="listing[title]"]');
      if (numberOnlyRegex.test(titleInput.value.trim())) {
        titleInput.classList.add('is-invalid');
        isValid = false;
      } else {
        titleInput.classList.remove('is-invalid');
        titleInput.classList.add('is-valid');
      }

      // Description validation
      const descriptionInput = form.querySelector('textarea[name="listing[description]"]');
      if (numberOnlyRegex.test(descriptionInput.value.trim())) {
        descriptionInput.classList.add('is-invalid');
        isValid = false;
      } else {
        descriptionInput.classList.remove('is-invalid');
        descriptionInput.classList.add('is-valid');
      }

      // Country validation
      const countryInput = form.querySelector('input[name="listing[country]"]');
      if (numberOnlyRegex.test(countryInput.value.trim())) {
        countryInput.classList.add('is-invalid');
        isValid = false;
      } else {
        countryInput.classList.remove('is-invalid');
        countryInput.classList.add('is-valid');
      }

      // Location validation
      const locationInput = form.querySelector('input[name="listing[location]"]');
      if (numberOnlyRegex.test(locationInput.value.trim())) {
        locationInput.classList.add('is-invalid');
        isValid = false;
      } else {
        locationInput.classList.remove('is-invalid');
        locationInput.classList.add('is-valid');
      }

      // If form is invalid OR custom checks failed, stop submission
      if (!form.checkValidity() || !isValid) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()



