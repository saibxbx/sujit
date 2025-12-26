// ==========================================
// RESUME PDF DOWNLOAD - Using jsPDF
// ==========================================

(function () {
    const downloadBtn = document.getElementById('downloadResume');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function () {
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '⏳ Generating...';
        downloadBtn.disabled = true;

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            let y = 20;
            const leftMargin = 20;
            const pageWidth = 210;
            const contentWidth = pageWidth - 40;

            // Header
            doc.setFontSize(28);
            doc.setTextColor(26, 26, 26);
            doc.setFont('helvetica', 'bold');
            doc.text('SUJIT S', pageWidth / 2, y, { align: 'center' });
            
            y += 10;
            doc.setFontSize(14);
            doc.setTextColor(184, 134, 11);
            doc.text('Software Developer', pageWidth / 2, y, { align: 'center' });
            
            y += 8;
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('LinkedIn: linkedin.com/in/sujit-s-b7933631b  |  GitHub: github.com/saibxbx', pageWidth / 2, y, { align: 'center' });
            
            // Line
            y += 5;
            doc.setDrawColor(218, 165, 32);
            doc.setLineWidth(1);
            doc.line(leftMargin, y, pageWidth - leftMargin, y);
            
            // Education
            y += 15;
            doc.setFontSize(14);
            doc.setTextColor(184, 134, 11);
            doc.setFont('helvetica', 'bold');
            doc.text('EDUCATION', leftMargin, y);
            
            y += 3;
            doc.setDrawColor(218, 165, 32);
            doc.setLineWidth(0.5);
            doc.line(leftMargin, y, leftMargin + 30, y);
            
            y += 8;
            doc.setFontSize(12);
            doc.setTextColor(26, 26, 26);
            doc.setFont('helvetica', 'bold');
            doc.text('VIT Chennai', leftMargin, y);
            
            y += 6;
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text('MTech Integrated Software Engineering', leftMargin, y);
            
            y += 5;
            doc.setFontSize(10);
            doc.setTextColor(120, 120, 120);
            doc.text('Second Year', leftMargin, y);
            
            // Technical Skills
            y += 15;
            doc.setFontSize(14);
            doc.setTextColor(184, 134, 11);
            doc.setFont('helvetica', 'bold');
            doc.text('TECHNICAL SKILLS', leftMargin, y);
            
            y += 3;
            doc.setDrawColor(218, 165, 32);
            doc.line(leftMargin, y, leftMargin + 45, y);
            
            y += 8;
            doc.setFontSize(11);
            doc.setTextColor(50, 50, 50);
            doc.setFont('helvetica', 'bold');
            doc.text('Programming: ', leftMargin, y);
            doc.setFont('helvetica', 'normal');
            doc.text('C, C++, Java, Python, JavaScript', leftMargin + 30, y);
            
            y += 6;
            doc.setFont('helvetica', 'bold');
            doc.text('Web: ', leftMargin, y);
            doc.setFont('helvetica', 'normal');
            doc.text('HTML, CSS, Node.js', leftMargin + 30, y);
            
            y += 6;
            doc.setFont('helvetica', 'bold');
            doc.text('Database: ', leftMargin, y);
            doc.setFont('helvetica', 'normal');
            doc.text('Oracle', leftMargin + 30, y);
            
            // Projects
            y += 15;
            doc.setFontSize(14);
            doc.setTextColor(184, 134, 11);
            doc.setFont('helvetica', 'bold');
            doc.text('PROJECTS', leftMargin, y);
            
            y += 3;
            doc.setDrawColor(218, 165, 32);
            doc.line(leftMargin, y, leftMargin + 25, y);
            
            // Project 1
            y += 10;
            doc.setFontSize(12);
            doc.setTextColor(26, 26, 26);
            doc.setFont('helvetica', 'bold');
            doc.text('Peace Messenger', leftMargin, y);
            
            y += 6;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text('Real-time chat application with user authentication, message persistence,', leftMargin, y);
            y += 5;
            doc.text('group chats, and emoji support.', leftMargin, y);
            
            y += 5;
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text('Tech: React, Node.js, WebSocket  |  github.com/saibxbx/peace_messenger', leftMargin, y);
            
            // Project 2
            y += 12;
            doc.setFontSize(12);
            doc.setTextColor(26, 26, 26);
            doc.setFont('helvetica', 'bold');
            doc.text('Expense Tracker', leftMargin, y);
            
            y += 6;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80);
            doc.text('Personal finance management tool with visual analytics and category-based tracking.', leftMargin, y);
            
            y += 5;
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text('Tech: HTML, CSS, JavaScript  |  saibxbx.github.io/sujit_exp', leftMargin, y);
            
            // Certifications
            y += 15;
            doc.setFontSize(14);
            doc.setTextColor(184, 134, 11);
            doc.setFont('helvetica', 'bold');
            doc.text('CERTIFICATIONS', leftMargin, y);
            
            y += 3;
            doc.setDrawColor(218, 165, 32);
            doc.line(leftMargin, y, leftMargin + 40, y);
            
            y += 8;
            doc.setFontSize(11);
            doc.setTextColor(50, 50, 50);
            doc.setFont('helvetica', 'normal');
            doc.text('• Introduction to C - SoloLearn (February 2025)', leftMargin, y);
            
            y += 6;
            doc.text('• Introduction to C++ - SoloLearn (February 2025)', leftMargin, y);
            
            // Footer quote
            y += 25;
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(leftMargin, y, pageWidth - leftMargin, y);
            
            y += 10;
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.setFont('helvetica', 'italic');
            doc.text('"If you believe in yourself, you can do it"', pageWidth / 2, y, { align: 'center' });

            // Save
            doc.save('Sujit_S_Resume.pdf');
            
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            
        } catch (error) {
            console.error('PDF Error:', error);
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            alert('PDF generation failed. Error: ' + error.message);
        }
    });
})();
