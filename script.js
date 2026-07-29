const articles = {
    '1': {
        title: "Linux fayl tizimi va ruxsatlar bilan ishlash",
        category: "Linux",
        content: `Mening kundalik ish jarayonimda Linux fayl tizimida ishlatadigan asosiy buyruqlar va ruxsatlar cheat-sheet'i:

1. Ruxsatlarni o'zgartirish (Permissions):
   chmod 755 script.sh   # Owner: rwx, Group: r-x, Others: r-x
   chmod +x deploy.sh    # Faylga bajarish huquqini berish
   chown -R www-data:www-data /var/www/html # Egalikni o'zgartirish

2. Katalog va fayllarni qidirish:
   find /var/log -type f -name "*.log" # Log fayllarni topish
   grep -rnw '/path/to/somewhere/' -e 'error' # Matn bo'yicha qidirish

3. Disk va xotira monitoringi:
   df -h   # Disk hajmini ko'rish
   free -m # RAM xotira holati`
    },
    '2': {
        title: "Vim va Nano terminal muharrirlari",
        category: "Tools",
        content: `Serverga SSH orqali kirganda fayllarni tezkor tahrirlash uchun ishlatiladigan buyruqlar:

Vim bilan ishlash (Qisqa konspekt):
- i         -> Insert rejimiga o'tish
- Esc       -> Buyruq rejimiga qaytish
- :w        -> Faylni saqlash
- :wq       -> Saqlab chiqish
- :q!       -> Saqlamasdan majburiy chiqish
- dd        -> Butun satrni o'chirish
- /text     -> Matn ichidan qidirish

Nano (Oddiy tahrirlash uchun):
- Ctrl + O  -> Saqlash
- Ctrl + X  -> Chiqish`
    },
    '3': {
        title: "Bash skriptlash asoslari va avtomatlashtirish",
        category: "Automation",
        content: `Rutin vazifalarni avtomatlashtirish uchun yozgan Bash skriptlarim standarti:

#!/bin/bash

# O'zgaruvchilar va Shartlar
SERVER_NAME="prod-node-01"
LOG_FILE="/var/log/syslog"

if [ -f "$LOG_FILE" ]; then
    echo "[$SERVER_NAME] Log fayli mavjud, tekshirilmoqda..."
fi

# Sikllar orqali servislar holatini tekshirish
for service in nginx docker ssh; do
    systemctl is-active --quiet $service && echo "$service ishlamoqda" || echo "$service to'xtagan!"
done`
    },
    '4': {
        title: "Tarmoq diagnostikasi va portlar bilan ishlash",
        category: "Networking",
        content: `Serverlar o'rtasida tarmoq ulanishlarini va portlarni tekshirish uchun qo'llanma:

- ip a                    # Tarmoq interfeyslari va IP manzillar
- ss -tulpn               # Ochiq portlar va ularni band qilgan jarayonlar
- ping -c 4 8.8.8.8       # Tarmoq sifatini tekshirish
- traceroute example.com  # Paketlar yo'nalishini kuzatish
- dig +short example.com  # DNS yozuvlarini tezkor tekshirish
- curl -I https://site.uz # HTTP status va sarlavhalarni ko'rish`
    },
    '5': {
        title: "HTTP protokol, Headerlar va API So'rovlari",
        category: "Web",
        content: `Web-server va API integratsiyalarini sozlashda HTTP so'rovlar bilan ishlash:

Curl orqali API test qilish:
- GET so'rovi:
  curl -s https://api.example.com/health | jq

- POST so'rovi (JSON yuborish):
  curl -X POST https://api.example.com/v1/auth \
    -H "Content-Type: application/json" \
    -d '{"username": "admin", "key": "secret"}'

Muhim Status Kodlar:
200 OK          -> So'rov muvaffaqiyatli
401 Unauthorized-> Autentifikatsiya xatosi
502 Bad Gateway -> Proxy yoki upstream server javob bermadi`
    },
    '6': {
        title: "SSH kalitlar va xavfsiz masofaviy ulanish",
        category: "Security",
        content: `Serverlarga parolsiz, xavfsiz SSH kalitlar orqali ulanish va sozlash:

1. Kalitlar juftligini yaratish:
   ssh-keygen -t ed25519 -C "mamatyoqubov0@gmail.com"

2. Public kalitni serverga nusxalash:
   ssh-copy-id root@192.168.1.100

3. ~/.ssh/config faylini sozlash (Tezkor ulanish uchun):
   Host prod
       HostName 192.168.1.100
       User root
       IdentityFile ~/.ssh/id_ed25519

Endi serverga faqat 'ssh prod' buyrug'i orqali kiriladi.`
    }
};

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
    } else if (command === 'blog' || command === 'articles') {
        whoamiView.style.display = 'none';
        renderBlogList();
        showContainer();
    } else if (command === 'cat' && args[1]) {
        whoamiView.style.display = 'none';
        renderArticle(args[1]);
        showContainer();
    } else if (command === 'connect' || command === 'contact') {
        whoamiView.style.display = 'none';
        renderConnectForm();
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
                <li><b class="cmd">whoami</b> - Profil va ko'nikmalar</li>
                <li><b class="cmd">blog</b> - Shaxsiy Linux & DevOps cheat-sheet'larim</li>
                <li><b class="cmd">cat [id]</b> - Maqolani o'qish (Masalan: <code>cat 1</code>)</li>
                <li><b class="cmd">connect</b> - Men bilan to'g'ridan-to'g'ri bog'lanish</li>
                <li><b class="cmd">clear</b> - Terminalni tozalash</li>
            </ul>
        </div>
    `;
}

function renderBlogList() {
    let listHTML = `<div class="section-block">
        <h3><i class="fa-solid fa-book"></i> DevOps & Linux Qaydlarim</h3>
        <div class="cards-list">`;
    
    for (let id in articles) {
        listHTML += `
            <div class="card" onclick="document.getElementById('cmdInput').value='cat ${id}';">
                <div>
                    <h4>[ID: ${id}] ${articles[id].title}</h4>
                    <p>Kategoriya: ${articles[id].category}</p>
                </div>
                <span class="badge alt">O'qish →</span>
            </div>
        `;
    }
    
    listHTML += `</div><p class="hint-text">O'qish uchun: <code>cat [id]</code> buyrug'ini kiriting.</p></div>`;
    dynamicView.innerHTML = listHTML;
}

function renderArticle(id) {
    if (articles[id]) {
        const article = articles[id];
        dynamicView.innerHTML = `
            <div class="article-view">
                2>${article.title}</h2>
                <div class="article-meta">
                    <span><i class="fa-solid fa-tag"></i> ${article.category}</span>
                </div>
                <hr class="divider">
                <pre class="article-body">${article.content}</pre>
            </div>
        `;
    } else {
        dynamicView.innerHTML = `<p class="error-text">xatolik: '${id}' id'li qayd topilmadi. Ro'yxat uchun 'blog' deb yozing.</p>`;
    }
}

function renderConnectForm() {
    dynamicView.innerHTML = `
        <div class="article-view">
            <h2><i class="fa-solid fa-paper-plane"></i> Men bilan bog'lanish (Direct Mail)</h2>
            <p class="hint-text" style="margin-bottom: 18px;">Xabaringiz to'g'ridan-to'g'ri mening shaxsiy elektron pochtamga yetib boradi.</p>
            
            <form id="contactForm" class="connect-form" onsubmit="handleMailSubmit(event)">
                <div class="form-group">
                    <label><i class="fa-regular fa-user"></i> Ismingiz:</label>
                    <input type="text" name="name" required placeholder="Masalan: Ali Valiyev" class="form-input">
                </div>
                <div class="form-group">
                    <label><i class="fa-regular fa-envelope"></i> Email manzilingiz:</label>
                    <input type="email" name="email" required placeholder="mamatyoqubov0@gmail.com" class="form-input">
                </div>
                <div class="form-group">
                    <label><i class="fa-regular fa-comment-dots"></i> Xabar:</label>
                    <textarea name="message" rows="4" required placeholder="Xabaringizni shu yerda yozing..." class="form-input"></textarea>
                </div>
                <button type="submit" id="submitBtn" class="submit-btn">
                    <i class="fa-solid fa-paper-plane"></i> Xabarni yuborish
                </button>
            </form>
            <div id="formStatus" class="form-status-box"></div>
        </div>
    `;
}

// FORMSPREE DIRECT AJAX INTEGRATSIYA (Xatoliklar bartaraf etildi)
function handleMailSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const btn = document.getElementById('submitBtn');

    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Yuborilmoqda...`;
    status.style.display = 'none';

    const formData = new FormData(form);

    // Formspree AJAX Endpoint
    fetch("https://formspree.io/f/mqakozqj", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = `<div class="status-success"><i class="fa-solid fa-circle-check"></i> Xabaringiz muvaffaqiyatli yuborildi!</div>`;
            status.style.display = 'block';
            form.reset();
        } else {
            response.json().then(data => {
                status.innerHTML = `<div class="status-error"><i class="fa-solid fa-triangle-exclamation"></i> Xatolik yuz berdi. Iltimos qayta urinib ko'ring.</div>`;
                status.style.display = 'block';
            });
        }
    }).catch(error => {
        status.innerHTML = `<div class="status-error"><i class="fa-solid fa-wifi"></i> Tarmoq xatosi! Internet ulanishingizni tekshiring.</div>`;
        status.style.display = 'block';
    }).then(() => {
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Xabarni yuborish`;
    });
}

function renderError(cmd) {
    dynamicView.innerHTML = `<p class="error-text">zsh: command not found: ${cmd}. Yo'riqnoma uchun 'help' deb yozing.</p>`;
}
