// Interactive Parallax Effect for Background DevOps Icons
document.addEventListener('mousemove', (e) => {
    const floatingItems = document.querySelectorAll('.floating-item');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    floatingItems.forEach((item, index) => {
        const speed = (index + 1) * 15;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        item.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});
