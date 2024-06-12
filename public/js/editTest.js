document.addEventListener('DOMContentLoaded', function() {
    const messagesList = document.getElementById('messagesList');
    const addMessageBtn = document.getElementById('addMessageBtn');
    const importMessagesBtn = document.getElementById('importMessagesBtn');
    const importMessagesFile = document.getElementById('importMessagesFile');

    function addMessage(index = null, role = '', content = '') {
        const newIndex = index !== null ? index : document.querySelectorAll('.message-row').length;
        const newRow = document.createElement('div');
        newRow.setAttribute('class', 'message-row');
        newRow.setAttribute('data-index', newIndex);
        newRow.innerHTML = `
            <select class="form-select role-select" name="messages[${newIndex}][role]">
                <option value="system" ${role === 'system' ? 'selected' : ''}>System</option>
                <option value="user" ${role === 'user' ? 'selected' : ''}>User</option>
                <option value="assistant" ${role === 'assistant' ? 'selected' : ''}>Assistant</option>
            </select>
            <textarea class="form-control content-textarea" name="messages[${newIndex}][content]" rows="10" style="overflow-y: auto;">${content}</textarea>
            <button type="button" class="btn btn-danger remove-message-btn">Remove</button>
        `;
        messagesList.appendChild(newRow);
    }

    addMessageBtn.addEventListener('click', function() {
        addMessage();
        console.log('Added new message row');
    });

    messagesList.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-message-btn')) {
            const parentDiv = e.target.parentElement;
            const indexToRemove = parseInt(parentDiv.getAttribute('data-index'));
            parentDiv.remove();
            // Update indices of remaining message rows
            document.querySelectorAll('.message-row').forEach((row, index) => {
                row.setAttribute('data-index', index);
                row.querySelectorAll('select, textarea').forEach(input => {
                    input.name = input.name.replace(/\[\d+\]/, `[${index}]`);
                });
            });
            console.log('Removed message row');
        }
    });

    importMessagesBtn.addEventListener('click', function() {
        importMessagesFile.click();
    });

    importMessagesFile.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) {
            console.log('No file selected');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const messages = JSON.parse(e.target.result);
                while (messagesList.firstChild) {
                    messagesList.removeChild(messagesList.firstChild);
                }
                messages.forEach((message, index) => {
                    addMessage(index, message.role, message.content);
                });
                console.log('Messages imported successfully');
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Error parsing JSON. Please make sure the file is a valid JSON format.');
            }
        };
        reader.readAsText(file);
    });

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = { messages: [] };
        formData.forEach((value, key) => {
            const match = key.match(/^messages\[(\d+)\]\[(role|content)\]$/);
            if (match) {
                const index = parseInt(match[1], 10);
                const property = match[2];
                if (!data.messages[index]) {
                    data.messages[index] = { role: '', content: '' };
                }
                data.messages[index][property] = value;
            } else {
                data[key] = value;
            }
        });

        // Filter out any null entries from messages
        data.messages = data.messages.filter(message => message.role && message.content);

        // Extract test_id from the current URL
        const testIdMatch = window.location.pathname.match(/\/tests\/([^\/]+)/);
        if (testIdMatch) {
            const testId = testIdMatch[1];
            fetch(`/tests/${testId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => {
                if (response.ok) {
                    console.log('Test updated successfully');
                    window.location.href = `/tests/${testId}/`;
                } else {
                    console.error('Failed to update test');
                    response.json().then(err => console.error(err));
                }
            }).catch(error => {
                console.error('Error updating test:', error);
            });
        } else {
            console.error('Failed to extract test ID from URL');
        }
    });
});