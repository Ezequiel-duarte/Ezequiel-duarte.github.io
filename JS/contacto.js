(function() {
    // Public Key - Reemplazá con la tuya
    const PUBLIC_KEY = '4_frP6QkjPLm6JB3k';
    
    // Service ID y Template ID - Reemplazá con los tuyos
    const SERVICE_ID = 'service_pnn0e9w';
    const TEMPLATE_ID = 'template_9nvl4ad';
    
    // Esperar a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        // Inicializar EmailJS
        emailjs.init(PUBLIC_KEY);
        
        // Obtener el formulario
        const form = document.getElementById('contact-form');
        
        // Si no existe el formulario, salir (por si esta página no es contacto.html)
        if (!form) return;
        
        // Crear contenedor para mensajes de estado (si no existe)
        let statusDiv = document.getElementById('form-status');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.id = 'form-status';
            form.parentNode.insertBefore(statusDiv, form.nextSibling);
        }
        
        // Manejar el envío del formulario
        form.addEventListener('submit', handleSubmit);
        
        /**
         * Función que maneja el envío del formulario
         */
        function handleSubmit(e) {
            e.preventDefault(); // Evitar recarga de página
            
            // Cambiar el botón mientras se envía
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            
            // Enviar el formulario con EmailJS
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
                .then(function(response) {
                    console.log('EmailJS éxito:', response);
                    
                    // Mostrar mensaje de éxito
                    showMessage('✅ Mensaje enviado con éxito', 'success');
                    
                    // Limpiar el formulario
                    form.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS error:', error);
                    
                    // Mostrar mensaje de error
                    showMessage('❌ Error al enviar. Intentalo de nuevo.', 'error');
                })
                .finally(function() {
                    // Restaurar el botón
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        }
        
        /**
         * Función para mostrar mensajes de estado
         */
        function showMessage(text, type) {
            statusDiv.textContent = text;
            
            // Estilos según el tipo de mensaje
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
            
            // Ocultar después de 5 segundos
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    });
})();