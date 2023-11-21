window.addEventListener('DOMContentLoaded', function() {
  const userTableBody = document.querySelector('#userTableBody');

  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('user_')) {
      const userData = JSON.parse(localStorage.getItem(key));
      createUserTableRow(userData);
    }
  }
});

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const dateOfBirth = new Date(registrationForm.elements.dob.value);
  const currentYear = new Date().getFullYear();
  const age = currentYear - dateOfBirth.getFullYear();

  // Validate age to accept users between 18 and 55 years old
  if (age < 18 || age > 55) {
    alert('Age should be between 18 and 55.');
    return;
  }

  const userKey = 'user_' + Date.now();
  localStorage.setItem(userKey, JSON.stringify({
    name: registrationForm.elements.name.value,
    email: registrationForm.elements.email.value,
    password: registrationForm.elements.password.value,
    dob: registrationForm.elements.dob.value,
    acceptedTerms: registrationForm.elements.acceptedTerms.checked
  }));

  const userTableBody = document.querySelector('#userTableBody');
  createUserTableRow({
    name: registrationForm.elements.name.value,
    email: registrationForm.elements.email.value,
    password: registrationForm.elements.password.value,
    dob: registrationForm.elements.dob.value,
    acceptedTerms: registrationForm.elements.acceptedTerms.checked
  });
});

function createUserTableRow(userData) {
  const newRow = userTableBody.insertRow();

  const cellStyle = 'border border-gray-300 p-2';

  const nameCell = newRow.insertCell();
  nameCell.textContent = userData.name;
  nameCell.className = cellStyle;

  const emailCell = newRow.insertCell();
  emailCell.textContent = userData.email;
  emailCell.className = cellStyle;

  const passwordCell = newRow.insertCell();
  passwordCell.textContent = userData.password;
  passwordCell.className = cellStyle;

  const dobCell = newRow.insertCell();
  dobCell.textContent = userData.dob;
  dobCell.className = cellStyle;

  const acceptedTermsCell = newRow.insertCell();
  acceptedTermsCell.textContent = userData.acceptedTerms ? 'Yes' : 'No';
  acceptedTermsCell.className = cellStyle;
}
