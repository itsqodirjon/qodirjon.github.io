const whoamiView = document.getElementById('whoamiView');
const dynamicView = document.getElementById('dynamicView');
const output = document.getElementById('outputContent');
const input = document.getElementById('cmdInput');

function handleCommand(event) {
    event.preventDefault();
    const rawCommand = input.value.trim().toLowerCase();

    if (rawCommand === 'whoami') {
        showWhoami();
    } else if (rawCommand === 'more') {
        openMoreView();
    } else if (rawCommand === 'clear') {
        clearTerminal();
    } else if (rawCommand !== '') {
        whoamiView.style.display = 'none';
        renderError(rawCommand);
        showContainer();
    }

    input.value = '';
}

function showWhoami() {
    dynamicView.innerHTML = '';
    whoamiView.style.display = 'block';
    showContainer();
}

function clearTerminal() {
    output.classList.remove('show');
    output.classList.add('hidden');
    whoamiView.style.display = 'block';
    dynamicView.innerHTML = '';
}

function openMoreView() {
    whoamiView.style.display = 'none';
    renderMoreContent();
    showContainer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showContainer() {
    output.classList.remove('hidden');
    output.classList.add('show');
}

function renderMoreContent() {
    dynamicView.innerHTML = `
        <div class="more-content-wrapper">
            <button class="back-btn" onclick="showWhoami()">
                <i class="fa-solid fa-arrow-left"></i> Orqaga (whoami)
            </button>

            <!-- BLOG / ARTICLES -->
            <div class="section-block">
                <h3><i class="fa-solid fa-newspaper"></i> Texnik Maqolalar & Blog</h3>
                <div class="cards-list">
                    <div class="card blog-card">
                        <div>
                            <h4>Linux Serverlarni CI/CD va Docker orqali Avtomatlashtirish</h4>
                            <p>DevOps amaliyotida loyihalarni uzluksiz deploy qilish bo'yicha qo'llanma.</p>
                        </div>
                        <span class="badge alt">Read</span>
                    </div>
                    <div class="card blog-card">
                        <div>
                            <h4>Zsh va Terminalni Samadorlik Uchun Sozlash</h4>
                            <p>DevOps muhandisi kunlik ish tajribasini oshiruvchi plagin va buyruqlar.</p>
                        </div>
                        <span class="badge alt">Read</span>
                    </div>
                </div>
            </div>

            <!-- CONNECT / CONTACT FORM -->
            <div class="section-block">
                <h3><i class="fa-solid fa-paper-plane"></i> Bog'lanish / Connection</h3>
                <form class="contact-form" action="https://formspree.io/f/xknkyrvw" method="POST">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Ismingiz" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email manzilingiz" required>
                    </div>
                    <div class="form-group">
                        <textarea name="message" rows="4" placeholder="Xabaringizni yozing..." required></textarea>
                    </div>
                    <button type="submit" class="send-btn">
                        <span>Xabarni yuborish</span>
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    `;
}

function renderError(cmd) {
    dynamicView.innerHTML = `<p class="error-text">zsh: command not found: ${cmd}. Faqat 'whoami', 'more' yoki 'clear' deb yozing.</p>`;
}
