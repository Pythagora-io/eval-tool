document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addScenario').addEventListener('click', addScenario);
    const form = document.getElementById('scenarioForm');
    if (form) {
        form.addEventListener('submit', submitForm);
    }
});

function addScenario() {
    const scenariosDiv = document.getElementById('scenarios');
    const scenarioCount = scenariosDiv.children.length;
    const newScenarioHtml = `
        <div class="scenario" data-index="${scenarioCount}">
            <label>Provider:</label>
            <select name="scenarios[${scenarioCount}][provider]" class="form-select">
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="groq">Groq</option>
            </select>
            <label>Model:</label>
            <input type="text" name="scenarios[${scenarioCount}][model]" required class="form-control">
            <label>Temperature:</label>
            <input type="number" step="0.01" name="scenarios[${scenarioCount}][temp]" required class="form-control">
            <label>N:</label>
            <input type="number" name="scenarios[${scenarioCount}][n]" value="1" min="1" required class="form-control">
            <button type="button" onclick="removeScenario(this)" class="btn btn-danger">Delete</button>
        </div>
    `;
    scenariosDiv.insertAdjacentHTML('beforeend', newScenarioHtml);
}

function removeScenario(buttonElement) {
    const scenarioDiv = buttonElement.parentNode;
    scenarioDiv.remove();
    // Re-index scenarios
    document.querySelectorAll('.scenario').forEach((scenario, index) => {
        scenario.setAttribute('data-index', index);
        scenario.querySelectorAll('select, input').forEach(input => {
            let name = input.name.replace(/\[\d+\]\[(\w+)\]/, `[${index}][$1]`);
            input.setAttribute('name', name);
        });
    });
}

function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const scenarios = [];
    formData.forEach((value, key) => {
        const match = key.match(/^scenarios\[(\d+)\]\[(\w+)\]$/);
        if (match) {
            const index = parseInt(match[1], 10);
            const field = match[2];
            if (!scenarios[index]) scenarios[index] = {};
            scenarios[index][field] = value;
        }
    });

    const json = {
        test_id: formData.get('test_id'), // Assuming there's a hidden input for test_id in the form
        scenarios: scenarios
    };

    console.log('Submitting form:', json);
    fetch(`/tests/${json.test_id}/run`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = `/tests/${json.test_id}/`;
    })
    .catch((error) => {
        console.error('Error submitting test run configuration:', error);
    });
}