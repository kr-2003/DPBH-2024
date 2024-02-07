console.log("testing");

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting traditionally

  // Collect input values
  const description = document.getElementById('darkPatternDescription').value.trim();
  const files = document.getElementById('darkPatternImages').files;
  const additionalField = document.getElementById('additionalField').value.trim();
  const relatedLinks = document.getElementById('relatedLinks').value.trim();
  // Collecting checkboxes
  const checkboxes = document.querySelectorAll('input[name="darkPattern"]:checked');
  let selectedPatterns = [];
  checkboxes.forEach((checkbox) => {
    selectedPatterns.push(checkbox.value);
  });

  // Basic Validation Example
  if (!description) {
    alert('Please describe the dark pattern.');
    return; // Stop the function if validation fails
  }

  // Log collected data for demonstration
  console.log('Description:', description);
  if (files.length > 0) {
    console.log('Files:', Array.from(files).map(file => file.name));
  }
  if (additionalField) {
    console.log('Additional Field:', additionalField);
  }
  if (relatedLinks) {
    console.log('Related Links:', relatedLinks);
  }
  // Logging selected dark patterns
  console.log('Selected Dark Patterns:', selectedPatterns.join(', '));

  alert('Form submitted successfully!');
});

// Show file name when a file is selected
const fileInput = document.getElementById('darkPatternImages');
fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    const fileNameDisplay = document.createElement('span'); // You might want to place this element somewhere in your HTML
    fileNameDisplay.textContent = `Selected file: ${fileInput.files[0].name}`;
    fileInput.parentNode.insertBefore(fileNameDisplay, fileInput.nextSibling);
  }
});
