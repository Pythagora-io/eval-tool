document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.querySelector('form[action*="/review"]');

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting through standard form submission

        const testId = this.action.split('/').pop().split('/review')[0];
        const url = `/tests/${testId}/review`;

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
                console.log('Review completed successfully.');
                window.location.reload(); // Reload the page to reflect the changes
            } else {
                console.error('Failed to review scenarios.');
                alert('Failed to review scenarios. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during review scenarios:', error);
            alert('An error occurred. Please try again.');
        });
    });
});