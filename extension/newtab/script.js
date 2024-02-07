document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    // Prevent the form from submitting if certain conditions are not met
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting to see the console log

        // Example of retrieving and logging form data
        const description = document.getElementById('darkPatternDescription').value;
        const files = document.getElementById('darkPatternImages').files;
        const additionalField = document.getElementById('additionalField').value;
        const relatedLinks = document.getElementById('relatedLinks').value;

        console.log('Description:', description);
        console.log('Files:', files);
        console.log('Additional Field:', additionalField);
        console.log('Related Links:', relatedLinks);

        // Here you can add validation or further processing
        // For example, checking if the description is empty
        if (!description.trim()) {
            alert('Please describe the dark pattern.');
            return;
        }

        // For demonstration, we're logging the data to the console.
        // In a real application, you might send this data to a server.
        console.log('Form data is ready to be processed.');

        // Example of processing or sending data here
        // This could involve AJAX requests or setting up fetch() to send data to a server

        // Reset the form after processing if needed
        form.reset();
    });

    // Example functionality: showing file name when selected
    const fileInput = document.getElementById('darkPatternImages');
    fileInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            const fileName = this.files[0].name;
            console.log('Selected file:', fileName);
            // Update the UI to show the file name or preview the image if needed
        }
    });

    // Additional functionalities can be added as needed
    // For example, validating the 'additionalField' or 'relatedLinks',
    // or dynamically adding more input fields
});
