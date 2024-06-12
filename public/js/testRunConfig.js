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
    const providersData = JSON.parse(document.getElementById('modelData').dataset.models);
    const providerOptions = Object.keys(providersData).map(provider => `<option value="${provider}">${provider}</option>`).join('');

    const newScenarioHtml = `
        <div class="scenario" data-index="${scenarioCount}">
            <label>Provider:</label>
            <select name="scenarios[${scenarioCount}][provider]" class="form-select" onchange="updateModelDropdown(this)">
                ${providerOptions}
            </select>
            <label>Model:</label>
            <select name="scenarios[${scenarioCount}][model]" class="form-select"></select>
            <label>Temperature:</label>
            <input type="number" step="0.01" name="scenarios[${scenarioCount}][temp]" required class="form-control">
            <label>N:</label>
            <input type="number" name="scenarios[${scenarioCount}][n]" value="1" min="1" required class="form-control">
            <button type="button" onclick="removeScenario(this)" class="btn btn-danger">Delete</button>
        </div>
    `;
    scenariosDiv.insertAdjacentHTML('beforeend', newScenarioHtml);
    updateModelDropdown(scenariosDiv.lastElementChild.querySelector('select[name^="scenarios["]'));
}

function updateModelDropdown(selectElement) {
    const provider = selectElement.value;
    const modelSelect = selectElement.parentNode.querySelector('select[name$="[model]"]');
    modelSelect.innerHTML = '';

    const modelsData = JSON.parse(document.getElementById('modelData').dataset.models);

    if (modelsData[provider]) {
        modelsData[provider].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
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
    document.getElementById('runButton').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Running...'; // Show spinner
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
        if (data.success) {
            window.location.href = `/tests/${json.test_id}/`;
        } else {
            alert('Failed to run test: ' + (data.error || 'Unknown error'));
        }
    })
    .catch((error) => {
        console.error('Error submitting test run configuration:', error);
        alert('Error submitting test run configuration: ' + error.message);
    })
    .finally(() => {
        document.getElementById('runButton').innerHTML = 'Run'; // Hide spinner
    });
}