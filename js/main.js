document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DE RASTREO DE PEDIDO ---
    const trackingForm = document.getElementById('trackingForm');
    const trackingResult = document.getElementById('trackingResult');

    // Base de datos simulada de pedidos
    const mockOrders = {
        'RM-1020': { cliente: 'Juan Pérez', producto: 'Figura Personalizada', estado: '🎨 En proceso de modelado', entrega: '28 de Septiembre, 2026' },
        'RM-1021': { cliente: 'Sofía Gomez', producto: 'Muñeco Amigurumi', estado: '🧵 Tejido finalizado - En empaque', entrega: '25 de Septiembre, 2026' },
        '1019012345': { cliente: 'María Rodríguez', producto: 'CD Pintado', estado: '🚚 En camino con mensajería', entrega: '24 de Septiembre, 2026' }
    };

    if (trackingForm) {
        trackingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('orderCode').value.trim();

            if (mockOrders[code]) {
                const order = mockOrders[code];
                trackingResult.style.display = 'block';
                trackingResult.style.backgroundColor = '#e6f4ea';
                trackingResult.style.color = '#00684a';
                trackingResult.innerHTML = `
                    <h4 style="margin-bottom: 8px;"><b>Estado de Pedido Found:</b></h4>
                    <p><b>Cliente:</b> ${order.cliente}</p>
                    <p><b>Producto:</b> ${order.producto}</p>
                    <p><b>Estado Actual:</b> <span style="font-weight:bold;">${order.estado}</span></p>
                    <p><b>Fecha Estimada:</b> ${order.entrega}</p>
                `;
            } else if (code !== '') {
                // Genera un estado aleatorio realista para cualquier código nuevo ingresado
                trackingResult.style.display = 'block';
                trackingResult.style.backgroundColor = '#fef3c7';
                trackingResult.style.color = '#92400e';
                trackingResult.innerHTML = `
                    <h4 style="margin-bottom: 8px;"><b>Pedido Registrado (${code}):</b></h4>
                    <p><b>Estado Actual:</b> 📦 En cola de preparación de materiales.</p>
                    <p><b>Ubicación:</b> Taller ReMake - Bogotá D.C.</p>
                `;
            }
        });
    }

    // --- 2. LÓGICA DEL MODAL DE ENCARGO ---
    const modal = document.getElementById('orderModal');
    const closeModal = document.getElementById('closeModal');
    const orderButtons = document.querySelectorAll('.btn-order');
    const modalTitle = document.getElementById('modalTitle');
    const orderForm = document.getElementById('orderForm');

    if (orderButtons.length > 0) {
        orderButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-product');
                modalTitle.textContent = `Personalizar: ${productName}`;
                modal.style.display = 'flex';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newCode = 'RM-' + Math.floor(1000 + Math.random() * 9000);
            alert(`¡Encargo Confirmado con éxito!\n\nTu número de seguimiento es: ${newCode}\nPuedes usar este código en la sección 'Rastrear Pedido'.`);
            modal.style.display = 'none';
            orderForm.reset();
        });
    }
});