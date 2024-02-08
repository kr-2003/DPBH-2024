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
const data = {
  related_links: relatedLinks,
  additional_comments: additionalField,
  review_description: description,
  image: files[0],
  dark_patterns: selectedPatterns
};

// Use the fetch API to send the POST request
fetch('http://127.0.0.1:8000/', {
  method: 'POST', // Specify the method
  headers: {
    // Specify any HTTP headers you need to send
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Network response was not ok, status: ${response.status}`);
  }
  return response.json(); // Parse the JSON in the response
})
.then(data => {
  console.log('Success:', data); // Handle the success case
})
.catch(error => {
  console.error('Error:', error); // Handle errors, such as network issues
});

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
