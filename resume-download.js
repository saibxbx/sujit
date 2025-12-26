// ==========================================
// RESUME PDF DOWNLOAD
// ==========================================

(function () {
    const downloadBtn = document.getElementById('downloadResume');

    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', function () {
        // Show loading state
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '⏳ Generating PDF...';
        downloadBtn.disabled = true;

        // Create a visible container for PDF generation
        const container = document.createElement('div');
        container.id = 'resume-pdf-content';
        container.style.cssText = 'position: fixed; top: 0; left: 0; width: 210mm; min-height: 297mm; background: white; z-index: 99999; padding: 20mm; box-sizing: border-box; font-family: Arial, sans-serif;';
        
        container.innerHTML = `
            <div style="color: #333; line-height: 1.6;">
                <div style="text-align: center; margin-bottom: 25px; border-bottom: 3px solid #DAA520; padding-bottom: 15px;">
                    <h1 style="font-size: 28px; color: #1a1a1a; margin: 0 0 8px 0;">Sujit S</h1>
                    <p style="font-size: 16px; color: #B8860B; margin: 0 0 10px 0; font-weight: bold;">Software Developer</p>
                    <p style="font-size: 12px; color: #666; margin: 0;">
                        LinkedIn: linkedin.com/in/sujit-s-b7933631b | GitHub: github.com/saibxbx
                    </p>
                </div>

                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 16px; color: #B8860B; border-bottom: 2px solid #DAA520; padding-bottom: 5px; margin: 0 0 12px 0;">EDUCATION</h2>
                    <div style="padding-left: 10px;">
                        <p style="margin: 0 0 3px 0; font-weight: bold; color: #1a1a1a;">VIT Chennai</p>
                        <p style="margin: 0 0 3px 0; color: #555;">MTech Integrated Software Engineering</p>
                        <p style="margin: 0; color: #888; font-size: 12px;">Second Year</p>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 16px; color: #B8860B; border-bottom: 2px solid #DAA520; padding-bottom: 5px; margin: 0 0 12px 0;">TECHNICAL SKILLS</h2>
                    <div style="padding-left: 10px;">
                        <p style="margin: 0;"><strong>Languages:</strong> C, C++, Java, Python, JavaScript</p>
                        <p style="margin: 5px 0 0 0;"><strong>Web Technologies:</strong> HTML, CSS, Node.js</p>
                        <p style="margin: 5px 0 0 0;"><strong>Database:</strong> Oracle</p>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 16px; color: #B8860B; border-bottom: 2px solid #DAA520; padding-bottom: 5px; margin: 0 0 12px 0;">PROJECTS</h2>
                    
                    <div style="padding-left: 10px; margin-bottom: 15px;">
                        <p style="margin: 0 0 5px 0; font-weight: bold; color: #1a1a1a;">Peace Messenger</p>
                        <p style="margin: 0 0 5px 0; color: #555; font-size: 13px;">Real-time chat application with modern UI, user authentication, message persistence, group chats, and emoji support.</p>
                        <p style="margin: 0; font-size: 12px; color: #666;"><strong>Technologies:</strong> React, Node.js, WebSocket</p>
                        <p style="margin: 3px 0 0 0; font-size: 12px; color: #0077B5;">github.com/saibxbx/peace_messenger</p>
                    </div>
                    
                    <div style="padding-left: 10px;">
                        <p style="margin: 0 0 5px 0; font-weight: bold; color: #1a1a1a;">Expense Tracker</p>
                        <p style="margin: 0 0 5px 0; color: #555; font-size: 13px;">Personal finance management tool with visual analytics, category-based tracking, and monthly summaries.</p>
                        <p style="margin: 0; font-size: 12px; color: #666;"><strong>Technologies:</strong> HTML, CSS, JavaScript</p>
                        <p style="margin: 3px 0 0 0; font-size: 12px; color: #0077B5;">saibxbx.github.io/sujit_exp</p>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 16px; color: #B8860B; border-bottom: 2px solid #DAA520; padding-bottom: 5px; margin: 0 0 12px 0;">CERTIFICATIONS</h2>
                    <div style="padding-left: 10px;">
                        <p style="margin: 0 0 5px 0;">• Introduction to C - SoloLearn (February 2025)</p>
                        <p style="margin: 0;">• Introduction to C++ - SoloLearn (February 2025)</p>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd;">
                    <p style="color: #888; font-size: 11px; margin: 0; font-style: italic;">
                        "If you believe in yourself, you can do it"
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(container);

        // Wait for content to render
        setTimeout(function() {
            // PDF options
            const options = {
                margin: 0,
                filename: 'Sujit_S_Resume.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    logging: true,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Generate PDF
            html2pdf().set(options).from(container).save().then(function () {
                document.body.removeChild(container);
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }).catch(function (error) {
                console.error('PDF generation failed:', error);
                document.body.removeChild(container);
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
                alert('Failed to generate PDF. Please try again.');
            });
        }, 500);
    });
})();
