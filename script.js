// 3D Tilt va Parallax effekti (faqat desktop ekranlar uchun qulaylik yaratadi)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        const floatingItems = document.querySelectorAll('.floating-item');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        floatingItems.forEach((item, index) => {
            const speed = (index + 1) * 18;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            item.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Cards uchun 3D Tilt effekti
    const cards = document.querySelectorAll('.badge, .cert-card, .timeline-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}
