// ==========================================
// RESUME PDF DOWNLOAD - Simple jsPDF
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadResume');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function() {
        downloadBtn.innerHTML = '⏳ Generating...';
        downloadBtn.disabled = true;

        // Wait for jsPDF to load
        if (typeof window.jspdf === 'undefined') {
            alert('PDF library not loaded. Please refresh and try again.');
            downloadBtn.innerHTML = '📄 DOWNLOAD PDF';
            downloadBtn.disabled = false;
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Simple text-based resume
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('SUJIT S', 105, 25, { align: 'center' });
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text('Software Developer', 105, 35, { align: 'center' });
        
        doc.setFontSize(10);
        doc.text('LinkedIn: linkedin.com/in/sujit-s-b7933631b | GitHub: github.com/saibxbx', 105, 43, { align: 'center' });
        
        // Line
        doc.setLineWidth(0.5);
        doc.line(20, 48, 190, 48);
        
        // Education
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('EDUCATION', 20, 60);
        doc.setLineWidth(0.3);
        doc.line(20, 62, 50, 62);
        
        doc.setFontSize(12);
        doc.text('VIT Chennai', 20, 72);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text('MTech Integrated Software Engineering - Second Year', 20, 79);
        
        // Skills
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('TECHNICAL SKILLS', 20, 95);
        doc.line(20, 97, 60, 97);
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Programming: C, C++, Java, Python, JavaScript', 20, 107);
        doc.text('Web: HTML, CSS, Node.js', 20, 114);
        doc.text('Database: Oracle', 20, 121);
        
        // Projects
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('PROJECTS', 20, 137);
        doc.line(20, 139, 45, 139);
        
        doc.setFontSize(12);
        doc.text('Peace Messenger', 20, 149);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Real-time chat app with authentication, group chats, and emoji support.', 20, 156);
        doc.text('Tech: React, Node.js, WebSocket | github.com/saibxbx/peace_messenger', 20, 162);
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Expense Tracker', 20, 175);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Personal finance tool with visual analytics and category tracking.', 20, 182);
        doc.text('Tech: HTML, CSS, JavaScript | saibxbx.github.io/sujit_exp', 20, 188);
        
        // Certifications
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('CERTIFICATIONS', 20, 204);
        doc.line(20, 206, 55, 206);
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('- Introduction to C - SoloLearn (February 2025)', 20, 216);
        doc.text('- Introduction to C++ - SoloLearn (February 2025)', 20, 223);
        
        // Footer
        doc.setLineWidth(0.2);
        doc.line(20, 250, 190, 250);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('"If you believe in yourself, you can do it"', 105, 260, { align: 'center' });

        // Save the PDF
        doc.save('Sujit_S_Resume.pdf');
        
        downloadBtn.innerHTML = '📄 DOWNLOAD PDF';
        downloadBtn.disabled = false;
    });
});
