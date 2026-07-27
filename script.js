document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cmdInput');
    const output = document.getElementById('outputContent');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();

            if (command === 'whoami') {
                // Inputni o'qib bo'lingach muzlatib qo'yamiz va tayyorlaymiz
                input.value = 'whoami';
                input.disabled = true;
                
                // Sekin va ohistalik bilan ma'lumotlarni ko'rsatamiz
                output.classList.remove('hidden');
                output.classList.add('show');
            } else if (command === 'clear') {
                output.classList.remove('show');
                output.classList.add('hidden');
                input.value = '';
            } else {
                alert("Buyruq topilmadi. Iltimos 'whoami' deb yozing.");
            }
        }
    });
});
