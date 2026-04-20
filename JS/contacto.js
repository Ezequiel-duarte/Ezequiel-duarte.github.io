(function() {
    const PUBLIC_KEY = '4_frP6QkjPLm6JB3k';
    const SERVICE_ID = 'service_pnn0e9w';
    const TEMPLATE_ID = 'template_9nvl4ad';
    document.addEventListener('DOMContentLoaded', function() {
        emailjs.init(PUBLIC_KEY);
        const form = document.getElementById('contact-form');
        if (!form) return;
        let statusDiv = document.getElementById('form-status');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.id = 'form-status';
            form.parentNode.insertBefore(statusDiv, form.nextSibling);
        }
        form.addEventListener('submit', handleSubmit);
        function handleSubmit(e) {
            e.preventDefault(); 
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
                .then(function(response) {
                    console.log('EmailJS éxito:', response);
                    showMessage('Mensaje enviado con éxito', 'success');
                    form.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS error:', error);
                    showMessage('Error al enviar. Intentalo de nuevo.', 'error');
                })
                .finally(function() {
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        }
        
        function showMessage(text, type) {
            statusDiv.textContent = text;
            
            statusDiv.style.padding = '1rem';
            statusDiv.style.marginTop = '1rem';
            statusDiv.style.borderRadius = '8px';
            statusDiv.style.fontWeight = '500';
            
            if (type === 'success') {
                statusDiv.style.color = '#10b981';
                statusDiv.style.backgroundColor = '#d1fae5';
                statusDiv.style.border = '1px solid #a7f3d0';
            } else {
                statusDiv.style.color = '#dc2626';
                statusDiv.style.backgroundColor = '#fee2e2';
                statusDiv.style.border = '1px solid #fecaca';
            }
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    });
    
})();
