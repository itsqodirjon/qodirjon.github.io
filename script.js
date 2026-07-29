const whoamiView = document.getElementById('whoamiView');
const dynamicView = document.getElementById('dynamicView');
const output = document.getElementById('outputContent');
const input = document.getElementById('cmdInput');

function handleCommand(event) {
    event.preventDefault();
    const rawCommand = input.value.trim().toLowerCase();

    if (rawCommand === 'whoami') {
        dynamicView.innerHTML = '';
        whoamiView.style.display = 'block';
        showContainer();
    } else if (rawCommand === 'clear') {
        output.classList.remove('show');
        output.classList.add('hidden');
        whoamiView.style.display = 'block';
        dynamicView.innerHTML = '';
    } else if (rawCommand !== '') {
        whoamiView.style.display = 'none';
        renderError(rawCommand);
        showContainer();
    }

    input.value = '';
}

function showContainer() {
    output.classList.remove('hidden');
    output.classList.add('show');
}

function renderError(cmd) {
    dynamicView.innerHTML = `<p class="error-text">zsh: command not found: ${cmd}. Faqat 'whoami' yoki 'clear' buyrug'ini kiriting.</p>`;
}
