// ==========================================
// RESUME PDF DOWNLOAD - SIMPLE APPROACH
// ==========================================

(function () {
    const downloadBtn = document.getElementById('downloadResume');

    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function () {
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '⏳ Generating...';
        downloadBtn.disabled = true;

        // Create PDF content
        const content = document.createElement('div');
        content.innerHTML = `
            <div id="pdf-resume" style="width: 210mm; padding: 15mm; background: white; font-family: Arial, sans-serif; color: #333; box-sizing: border-box;">
                
                <div style="text-align: center; border-bottom: 3px solid #DAA520; padding-bottom: 15px; margin-bottom: 20px;">
                    <h1 style="margin: 0 0 5px 0; font-size: 32px; color: #1a1a1a;">SUJIT S</h1>
                    <p style="margin: 0 0 10px 0; font-size: 18px; color: #B8860B; font-weight: bold;">Software Developer</p>
                    <p style="margin: 0; font-size: 12px; color: #666;">
                        LinkedIn: linkedin.com/in/sujit-s-b7933631b &nbsp;|&nbsp; GitHub: github.com/saibxbx
                    </p>
                </div>

                <div style="margin-bottom: 18px;">
                    <h2 style="font-size: 16px; color: #B8860B; border-bottom: 2px solid #DAA520; padding-bottom: 5px; margin: 0 0 10px 0; text-transform: uppercase;">Education</h2>
                    <p style="margin: 0 0 3px 0; font-weight: bold; font-size: 14px;">VIT Chennai</p>
                    <p style="margin: 0 0 3px 0; font-size: 13px;">MTech Integrated Software Engineering</p>
                    <p style="margin: 0; font-size: 12px; color: #888;">Second Year</p>
                </div>

                <div style="margin-bottom: 18px;">
                    <h2 style="font-size: 16px; color: #B8860B; border-bottom: 2px solid #DAA520; padding-bottom: 5px; margin: 0 0 10px 0; text-transform: uppercase;">Technical Skills</h2>
                    <p style="margin: 0 0 5px 0; font-size: 13px;"><strong>Programming:</strong> C, C++, Java, Python, JavaScript</p>
                    <p style="margin: 0 0 5px 0; font-size: 13px;"><strong>Web:</strong> HTML, CSS, Node.js</p>
                    <p style="margin: 0; font-size: 13px;"><strong>Database:</strong> Oracle</p>
                </div>

                <div style="margin-bottom: 18px;">
                    <h2 style="font-size: 16px; color: #B8860B; border-bottom: 2px solid #DAA520; padding-bottom: 5px; margin: 0 0 10px 0; text-transform: uppercase;">Projects</h2>
                    
                    <div style="margin-bottom: 12px;">
                        <p style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">Peace Messenger</p>
                        <p style="margin: 0 0 4px 0; font-size: 12px; color: #555;">Real-time chat application with user authentication, message persistence, group chats, and emoji support.</p>
                        <p style="margin: 0; font-size: 11px; color: #666;">Tech: React, Node.js, WebSocket | github.com/saibxbx/peace_messenger</p>
                    </div>
                    
                    <div>
                        <p style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">Expense Tracker</p>
                        <p style="margin: 0 0 4px 0; font-size: 12px; color: #555;">Personal finance management tool with visual analytics and category-based tracking.</p>
                        <p style="margin: 0; font-size: 11px; color: #666;">Tech: HTML, CSS, JavaScript | saibxbx.github.io/sujit_exp</p>
                    </div>
                </div>

                <div style="margin-bottom: 18px;">
                    <h2 style="font-size: 16px; color: #B8860B; border-bottom: 2px solid #DAA520; padding-bottom: 5px; margin: 0 0 10px 0; text-transform: uppercase;">Certifications</h2>
                    <p style="margin: 0 0 5px 0; font-size: 13px;">• Introduction to C - SoloLearn (February 2025)</p>
                    <p style="margin: 0; font-size: 13px;">• Introduction to C++ - SoloLearn (February 2025)</p>
                </div>

                <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #ddd;">
                    <p style="margin: 0; font-size: 11px; color: #888; font-style: italic;">"If you believe in yourself, you can do it"</p>
                </div>
            </div>
        `;

        document.body.appendChild(content);
        const element = document.getElementById('pdf-resume');

        // Generate PDF
        const opt = {
            margin: 0,
            filename: 'Sujit_S_Resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save().then(function() {
            document.body.removeChild(content);
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }).catch(function(err) {
            console.error('PDF Error:', err);
            document.body.removeChild(content);
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
            
            // Fallback - open print dialog
            alert('PDF generation failed. Opening print dialog instead.');
            window.print();
        });
    });
})();
