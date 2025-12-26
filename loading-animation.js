// ==========================================
// ADVANCED CANVAS INFINITY LOADING ANIMATION
// ==========================================

(function () {
    const canvas = document.getElementById('loadingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = 400;
        canvas.height = 200;
    }
    resizeCanvas();

    let progress = 0;
    let animationFrame;

    // Gold Gradient Colors
    const colors = {
        glow: 'rgba(255, 215, 0, 0.8)', // Gold glow
        trace: 'rgba(255, 165, 0, 0.5)', // Orange trace
        head: '#FFFFFF' // White head
    };

    function drawInfinity(t) {
        const width = canvas.width;
        const height = canvas.height;
        const cx = width / 2;
        const cy = height / 2;
        const a = 80; // Scale/width of loops

        ctx.clearRect(0, 0, width, height);

        // Draw the full infinity path (faint background)
        ctx.beginPath();
        for (let i = 0; i < 2 * Math.PI; i += 0.05) {
            const x = cx + (a * Math.cos(i)) / (1 + Math.sin(i) * Math.sin(i));
            const y = cy + (a * Math.cos(i) * Math.sin(i)) / (1 + Math.sin(i) * Math.sin(i));
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw the animating glowing trail
        const trailLength = 1.5; // Length of the trail in radians
        const segments = 50;

        ctx.lineCap = 'round';

        for (let i = 0; i < segments; i++) {
            const segmentT = t - (i * trailLength / segments);

            // Calculate opacity based on position in trail
            const alpha = 1 - (i / segments);

            // Parametric equations for Lemniscate of Bernoulli
            const t_val = segmentT;
            // Map t_val (continuous) to 0..2PI range for geometric calc
            const angle = t_val % (2 * Math.PI);

            const x = cx + (a * Math.cos(angle)) / (1 + Math.sin(angle) * Math.sin(angle));
            const y = cy + (a * Math.cos(angle) * Math.sin(angle)) / (1 + Math.sin(angle) * Math.sin(angle));

            // Calculate next point to form a segment
            const nextT = t - ((i + 1) * trailLength / segments);
            const nextAngle = nextT % (2 * Math.PI);
            const nextX = cx + (a * Math.cos(nextAngle)) / (1 + Math.sin(nextAngle) * Math.sin(nextAngle));
            const nextY = cy + (a * Math.cos(nextAngle) * Math.sin(nextAngle)) / (1 + Math.sin(nextAngle) * Math.sin(nextAngle));

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);

            // Head of the trail is brighter/thicker
            if (i === 0) {
                ctx.lineWidth = 8;
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.shadowBlur = 20;
                ctx.shadowColor = colors.glow;
            } else {
                ctx.lineWidth = 6;
                // Orange/Gold gradient trail
                ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
                ctx.shadowBlur = 10 * alpha;
                ctx.shadowColor = colors.trace;
            }

            ctx.stroke();

            // Reset shadows
            ctx.shadowBlur = 0;
        }

    }

    function animate() {
        progress -= 0.05; // Counter-clockwise or change sign for clockwise
        drawInfinity(Math.abs(progress));
        animationFrame = requestAnimationFrame(animate);
    }

    animate();

    // Stop animation when loading is done (UI handled by book.js)
    window.addEventListener('load', function () {
        setTimeout(function () {
            // Optional: Stop animation to save resources after hidden?
            // cancelAnimationFrame(animationFrame);
        }, 2500);
    });
})();
