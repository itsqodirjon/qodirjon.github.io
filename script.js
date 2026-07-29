const whoamiView = document.getElementById('whoamiView');
const dynamicView = document.getElementById('dynamicView');
const output = document.getElementById('outputContent');
const input = document.getElementById('cmdInput');

function handleCommand(event) {
    event.preventDefault();
    const rawCommand = input.value.trim().toLowerCase();
    const args = rawCommand.split(' ');
    const command = args[0];

    if (command === 'whoami') {
        dynamicView.innerHTML = '';
        whoamiView.style.display = 'block';
        showContainer();
    } else if (command === 'help') {
        whoamiView.style.display = 'none';
        renderHelp();
        showContainer();
    } else if (command === 'clear') {
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

function renderHelp() {
    dynamicView.innerHTML = `
        <div class="terminal-block">
            <h3><i class="fa-solid fa-terminal"></i> Mavjud buyruqlar:</h3>
            <ul class="help-list">
                <li><b class="cmd">whoami</b> - Profil va ma'lumotlarni ko'rsatish</li>
                <li><b class="cmd">clear</b> - Terminalni tozalash</li>
            </ul>
        </div>
    `;
}

function renderError(cmd) {
    dynamicView.innerHTML = `<p class="error-text">zsh: command not found: ${cmd}. Yo'riqnoma uchun 'help' deb yozing.</p>`;
}
