document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.querySelector('form[action*="/review"]');

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting through standard form submission

        const testId = this.action.replace(/.*\/tests\//, '').split('/review')[0];
        const url = `/tests/${testId}/review`;
        const reviewInstructions = document.getElementById('review_instructions').value.trim();

        if (!reviewInstructions) {
            alert('Please fill in the review instructions and save the test before reviewing.');
            return;
        }

        const reviewButton = document.querySelector('button[type="submit"]');
        reviewButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Reviewing...'; // Show spinner

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // No need to send any data in the body, as the review is based on existing data in the database
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if(data.success) {
                alert('Review completed successfully.');
                window.location.reload(); // Reload the page to reflect the changes
            } else {
                console.error('Failed to review scenarios.');
                alert('Failed to review scenarios. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during review scenarios:', error);
            alert('An error occurred. Please try again.');
        })
        .finally(() => {
            reviewButton.innerHTML = 'Save'; // Hide spinner
        });
    });
});