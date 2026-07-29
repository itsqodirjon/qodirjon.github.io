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
                <i class="fa-solid fa-terminal"></i> Orqaga (whoami)
            </button>

            <!-- 6 TA TEXNIK MAQOLALAR -->
            <div class="section-block">
                <h3><i class="fa-solid fa-newspaper"></i> Texnik Maqolalar & Ma'lumotlar</h3>
                <div class="articles-grid">
                    
                    <div class="article-card">
                        <div class="article-header">
                            <h4>1. Linux Serverlarni CI/CD va Docker orqali Avtomatlashtirish</h4>
                            <span class="read-tag">DevOps</span>
                        </div>
                        <p class="article-desc">
                            Zamonaviy loyihalarni Production serverlarga GitHub Actions va Docker yordamida uzluksiz, xatosiz va xavfsiz deploy qilish bosqichlari hamda amaliy tajribalar.
                        </p>
                    </div>

                    <div class="article-card">
                        <div class="article-header">
                            <h4>2. Zsh va Terminal Muhitini Unumdorlik Uchun Sozlash</h4>
                            <span class="read-tag">Linux</span>
                        </div>
                        <p class="article-desc">
                            Oh My Zsh, Oh-My-Posh hamda foydali buyruq alias'lari orqali DevOps muhandisining kunlik terminal ish faoliyati tezligini 2 baravarga oshirish usullari.
                        </p>
                    </div>

                    <div class="article-card">
                        <div class="article-header">
                            <h4>3. Nginx Reverse Proxy va SSL Sertifikatlari Boshqaruvi</h4>
                            <span class="read-tag">Web Server</span>
                        </div>
                        <p class="article-desc">
                            Nginx yordamida web-so'rovlarni to'g'ri yo'naltirish, Certbot orqali tezsus HTTPS/SSL xavfsizlik sertifikatlarini avtomatik yangilab turish konfiguratsiyasi.
                        </p>
                    </div>

                    <div class="article-card">
                        <div class="article-header">
                            <h4>4. Docker Optimization va Multi-stage Build Usullari</h4>
                            <span class="read-tag">Docker</span>
                        </div>
                        <p class="article-desc">
                            Konteyner rasmlari (Image) hajmini minimal darajagacha qisqartirish, build vaqtini tezlashtirish va Production xavfsizligini ta'minlash sirlari.
                        </p>
                    </div>

                    <div class="article-card">
                        <div class="article-header">
                            <h4>5. Ansible Bilan Serverlarni Avtomatik Konfiguratsiya Qilish</h4>
                            <span class="read-tag">IaC</span>
                        </div>
                        <p class="article-desc">
                            O'nlarcha Linux serverlarga bir vaqtning o'zida dasturiy ta'minotlarni o'rnatish, sozlamalarni yangilash va Playbook'lar yordamida infratuzilmani boshqarish.
                        </p>
                    </div>

                    <div class="article-card">
                        <div class="article-header">
                            <h4>6. Kubernetes Asoslari: Pod, Service va Deployment Arxitekturasi</h4>
                            <span class="read-tag">K8s</span>
                        </div>
                        <p class="article-desc">
                            Konteynerlashtirilgan ilovalarni avtomatik masshtablash (Scaling), resurslarni to'g'ri taqsimlash va yuqori barqarorlikni (High Availability) ta'minlash.
                        </p>
                    </div>

                </div>
            </div>

            <!-- BOG'LANISH FORMASI (SIZNIG FORMSPREE ID: mjgnzvve KO'RSATILGAN) -->
            <div class="section-block">
                <h3><i class="fa-solid fa-paper-plane"></i> Bog'lanish / Connection</h3>
                <form class="contact-form" action="https://formspree.io/f/mjgnzvve" method="POST">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Ismingiz" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="_replyto" placeholder="Email manzilingiz" required>
                    </div>
                    <div class="form-group">
                        <textarea name="message" rows="4" placeholder="Xabaringizni shu yerga yozing..." required></textarea>
                    </div>
                    <button type="submit" class="send-btn">
                        <span>Xabarni Yuborish</span>
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    `;
}

function renderError(cmd) {
    dynamicView.innerHTML = `<p class="error-text">zsh: command not found: ${cmd}. Yo'riqnoma: faqat 'whoami' yoki 'clear' buyrug'idan foydalaning.</p>`;
}
