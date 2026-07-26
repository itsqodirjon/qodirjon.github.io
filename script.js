// 3D Tilt and Interactive Mouse Parallax Effect
document.addEventListener('mousemove', (e) => {
    const floatingItems = document.querySelectorAll('.floating-item');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    floatingItems.forEach((item, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        item.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Interactive 3D Card Hover Effect for Badges and Cards
const cards = document.querySelectorAll('.badge, .cert-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.06, 1.06, 1.06)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
