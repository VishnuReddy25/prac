document.addEventListener('DOMContentLoaded', () => {
  const userTableBody = document.getElementById('userTableBody');

  // Loop through localStorage items
  for (const item in localStorage) {
    // Check if the item key starts with 'user_'
    if (item.startsWith('user_')) {
      // Parse the JSON data stored in the item value
      const userData = JSON.parse(localStorage.getItem(item));

      // Create a new table row
      const newRow = userTableBody.insertRow();

      // Add cells for user data
      const nameCell = newRow.insertCell();
      nameCell.textContent = userData.name;
      const emailCell = newRow.insertCell();
      emailCell.textContent = userData.email;
      const passwordCell = newRow.insertCell();
      passwordCell.textContent = userData.password;
      const dobCell = newRow.insertCell();
      dobCell.textContent = userData.dob;
      const acceptedTermsCell = newRow.insertCell();
      acceptedTermsCell.textContent = userData.acceptedTerms ? 'Yes' : 'No';

      // Add styling to cells
      const cellStyle = 'border border-gray-300 p-2';
      nameCell.className = cellStyle;
      emailCell.className = cellStyle;
      passwordCell.className = cellStyle;
      dobCell.className = cellStyle;
      acceptedTermsCell.className = cellStyle;
    }
  }
});

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get user data from the form
  const name = registrationForm.elements.name.value;
  const email = registrationForm.elements.email.value;
  const password = registrationForm.elements.password.value;
  const dob = registrationForm.elements.dob.value;
  const acceptedTerms = registrationForm.elements.acceptedTerms.checked;

  // Validate age to accept users between 18 and 55 years old
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const birthDate = new Date(dob);
  const age = currentYear - birthDate.getFullYear();
  if (age < 18 || age > 55) {
    alert('Age should be between 18 and 55.');
    return;
  }

  // Generate a unique user key
  const userKey = 'user_' + Date.now();

  // Store user data in localStorage
  localStorage.setItem(userKey, JSON.stringify({
    name: name,
    email: email,
    password: password,
    dob: dob,
    acceptedTerms: acceptedTerms
  }));

  // Create a new table row for the newly registered user
  const newRow = userTableBody.insertRow();

  // Add cells for user data
  const nameCell = newRow.insertCell();
  nameCell.textContent = name;
  const emailCell = newRow.insertCell();
  emailCell.textContent = email;
  const passwordCell = newRow.insertCell();
  passwordCell.textContent = password;
  const dobCell = newRow.insertCell();
  dobCell.textContent = dob;
  const acceptedTermsCell = newRow.insertCell();
  acceptedTermsCell.textContent = acceptedTerms ? 'Yes' : 'No';

  // Add styling to cells
  const cellStyle = 'border border-gray-300 p-2';
  nameCell.className = cellStyle;
  emailCell.className = cellStyle;
  passwordCell.className = cellStyle;
  dobCell.className = cellStyle;
  acceptedTermsCell.className = cellStyle;
});
