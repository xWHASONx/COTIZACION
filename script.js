// --- CÓDIGO COMPLETO Y CORREGIDO PARA script.js ---

// --- 1. CONFIGURACIÓN GLOBAL ---
const ADVISORS = {
    'katherine_rueda': { name: 'Katherine Rueda', photoUrl: 'https://i.imgur.com/21GKFPV.png', defaultWhatsapp: '573249450254' },
    'yonder_gonzalez': { name: 'Yonder Gonzalez', photoUrl: 'https://i.imgur.com/IPWYtIU.jpeg', defaultWhatsapp: '573508917512' },
    'juan_madrid': { name: 'Juan David Madrid', photoUrl: 'https://i.imgur.com/Oanbam8.jpeg', defaultWhatsapp: '573145352537' },
    'valentina_herrera': { name: 'Valentina Herrera', photoUrl: 'https://i.imgur.com/MHGZASr.png', defaultWhatsapp: '573184188621' },
    'maryory_gonzalez': { name: 'Maryory Gonzalez', photoUrl: 'https://i.imgur.com/G9nHKlg.jpeg', defaultWhatsapp: '573189150322' },
    'margareth_saucedo': { name: 'Margareth Saucedo', photoUrl: 'https://i.imgur.com/peBTIni.jpeg', defaultWhatsapp: '573502687290' },
    'karen_giraldo': { name: 'Karen Giraldo', photoUrl: 'https://i.imgur.com/Amn1Wtb.jpeg', defaultWhatsapp: '573216839241' },
    'sofia_giraldo': { name: 'Sofia Giraldo', photoUrl: 'https://i.imgur.com/GMOLJxa.jpeg', defaultWhatsapp: '573113854751' },
    'nicol_tamayo': { name: 'Nicol Tamayo', photoUrl: 'https://i.imgur.com/7pg3HvF.jpeg', defaultWhatsapp: '' },
    'daniela_cardona': { name: 'Daniela Cardona', photoUrl: 'https://i.imgur.com/dwnDmHy.png', defaultWhatsapp: '' },
    'sarah_esteves': { name: 'Sarah George Esteves', photoUrl: 'https://i.imgur.com/mt1UKBS.jpeg', defaultWhatsapp: '573226817507' },
    'Carolina_Muñoz': { name: 'Carolina Muñoz', photoUrl: 'https://i.imgur.com/sXnamkJ.jpeg', defaultWhatsapp: '573113855927' }
};

const ICONS = {
    destination: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
    calendar: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
    moon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>',
    bed: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7h2a2 2 0 012 2v9a2 2 0 01-2 2h-2m-6 0H7a2 2 0 01-2-2V9a2 2 0 012-2h2m4-4h2a2 2 0 012 2v2H9V5a2 2 0 012-2zM9 12h6"></path></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    plane: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>'
};

const TERMS_AND_CONDITIONS = {
    flights: `<h3>✈️ Tiquetes Aéreos</h3><ul>...</ul>`, // Contenido omitido por brevedad
    hotels: `<h3>🏨 Hoteles</h3><ul>...</ul>`, // Contenido omitido por brevedad
    transfers: `<h3>🚐 Traslados</h3><ul>...</ul>` // Contenido omitido por brevedad
};

const REGIMEN_TEMPLATES = {
    'todo_incluido': `Alojamiento en habitación estándar.\nDesayunos, almuerzos y cenas tipo buffet.\nSnacks entre comidas.\nBebidas alcohólicas y no alcohólicas nacionales ilimitadas.`,
    'pension_completa': `Alojamiento en habitación estándar.\nDesayuno, almuerzo y cena.\nNo incluye bebidas en las comidas.`,
    'media_pension': `Alojamiento en habitación estándar.\nDesayuno y cena.\nNo incluye bebidas en la cena.`,
    'desayuno': `Alojamiento en habitación estándar.\nDesayuno tipo buffet.`,
    'solo_hotel': `Alojamiento en habitación estándar.\nNo incluye comidas ni bebidas.`
};

let pastedImages = {};
let hotelCounter = 0;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pre-reserva-form');
    const formTitleSection = document.getElementById('form-title-section');
    const formSection = document.getElementById('form-section');
    const confirmationSection = document.getElementById('confirmation-section');
    const processQuoteBtn = document.getElementById('process-quote-btn');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const loaderOverlay = document.getElementById('loader-overlay');
    const dynamicComponentsContainer = document.getElementById('dynamic-components-container');
    const confirmationComponentsContainer = document.getElementById('confirmation-components-container');
    const advisorSelect = document.getElementById('asesor');
    const advisorWhatsappInput = document.getElementById('whatsapp-asesor');

    const requiredFieldsConfig = {
        'flights': ['ciudad-salida', 'flight-1-airline', 'flight-1-price'],
        'tours': ['tour-1-name', 'tour-1-price'], 
        'transfers': ['transfer-1-desc', 'transfer-1-price']
    };

    function addSection(sectionKey) {
        if (sectionKey === 'hotel') {
            hotelCounter++;
            const template = document.getElementById('template-hotel');
            if (!template) return;

            let cloneHtml = template.innerHTML.replace(/PLACEHOLDER/g, hotelCounter);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cloneHtml;
            const cloneNode = tempDiv.firstElementChild;

            dynamicComponentsContainer.appendChild(cloneNode);

            const nightsSelect = document.getElementById(`cantidad-noches-${hotelCounter}`);
            for (let i = 1; i <= 30; i++) {
                const option = new Option(`${i} noche${i > 1 ? 's' : ''}`, i);
                if (i === 4) option.selected = true;
                nightsSelect.add(option);
            }
            const roomsSelect = document.getElementById(`cantidad-habitaciones-${hotelCounter}`);
            for (let i = 1; i <= 10; i++) {
                const option = new Option(`${i} habitación${i > 1 ? 'es' : ''}`, i);
                if (i === 1) option.selected = true;
                roomsSelect.add(option);
            }
            
            addEventListenersToSection(cloneNode);
            
            if (hotelCounter === 1) {
                document.querySelector(`.add-section-btn[data-section="hotel"]`).style.display = 'none';
            }
            if (hotelCounter > 1) {
                document.querySelector(`#hotel-form-wrapper-${hotelCounter - 1} .add-subsection-btn`).style.display = 'none';
            }
        } else {
            const template = document.getElementById(`template-${sectionKey}`);
            if (!template) return;
            const clone = template.content.cloneNode(true);
            dynamicComponentsContainer.appendChild(clone);
            addEventListenersToSection(dynamicComponentsContainer.querySelector(`#${sectionKey}-form-wrapper`));
            document.querySelector(`.add-section-btn[data-section="${sectionKey}"]`).style.display = 'none';
            updateRequiredFields(sectionKey, true);
        }
    }

    function removeSection(sectionKey) {
        if (sectionKey.startsWith('hotel-')) {
            const wrapper = document.getElementById(`hotel-form-wrapper-${sectionKey.split('-')[1]}`);
            if (wrapper) {
                wrapper.remove();
                if (document.querySelectorAll('.hotel-form-wrapper').length === 0) {
                    document.querySelector(`.add-section-btn[data-section="hotel"]`).style.display = 'block';
                    hotelCounter = 0;
                } else {
                    const lastHotel = Array.from(document.querySelectorAll('.hotel-form-wrapper')).pop();
                    lastHotel.querySelector('.add-subsection-btn').style.display = 'block';
                }
            }
        } else {
            const originalWrapper = document.getElementById(`${sectionKey}-form-wrapper`);
            if (originalWrapper) {
                originalWrapper.remove();
                document.querySelector(`.add-section-btn[data-section="${sectionKey}"]`).style.display = 'block';
                updateRequiredFields(sectionKey, false);
            }
        }
    }

    function addSubSection(subSectionKey) {
        if (subSectionKey === 'hotel') { // Lógica para añadir nuevo hotel
             addSection('hotel');
        } else { // Lógica antigua para subsecciones como flight-2
            const wrapper = document.getElementById(`${subSectionKey}-form-wrapper`);
            if (wrapper) {
                wrapper.style.display = 'block';
                document.querySelector(`.add-subsection-btn[data-subsection="${subSectionKey}"]`).style.display = 'none';
                updateRequiredFields(subSectionKey, true);
            }
        }
    }
    
    function removeSubSection(subSectionKey) {
        const wrapper = document.getElementById(`${subSectionKey}-form-wrapper`);
        if (wrapper) {
            wrapper.style.display = 'none';
            wrapper.querySelectorAll('input').forEach(input => input.value = '');
            document.querySelector(`.add-subsection-btn[data-subsection="${subSectionKey}"]`).style.display = 'block';
            updateRequiredFields(subSectionKey, false);
        }
    }

    function updateRequiredFields(key, isRequired) {
        (requiredFieldsConfig[key] || []).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.required = isRequired;
        });
    }
    
    form.addEventListener('click', e => {
        const { target } = e;
        const { section, subsection } = target.dataset;
        if (target.matches('.add-section-btn')) addSection(section);
        if (target.matches('.remove-section-btn')) removeSection(section);
        if (target.matches('.add-subsection-btn')) addSubSection(section || subsection);
        if (target.matches('.remove-section-btn[data-subsection]')) removeSubSection(subsection);
    });

    function handlePaste(e) {
        e.preventDefault();
        const pasteArea = e.currentTarget; const imageId = pasteArea.dataset.imgId;
        const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'));
        if (item) {
            const reader = new FileReader();
            reader.onload = event => {
                const base64Image = event.target.result;
                const previewImg = pasteArea.querySelector('img');
                previewImg.src = base64Image;
                previewImg.style.display = 'block';
                pasteArea.querySelector('p').style.display = 'none';
                pastedImages[imageId] = base64Image;
            };
            reader.readAsDataURL(item.getAsFile());
        }
    }

    function addEventListenersToSection(sectionElement) {
        sectionElement.querySelectorAll('.paste-area').forEach(area => area.addEventListener('paste', handlePaste));
    }

    function populateMainDropdowns() {
        const adultsSelect = document.getElementById('adultos');
        const ninosSelect = document.getElementById('ninos');
        for (let i = 1; i <= 20; i++) {
            const option = new Option(i, i);
            if (i === 2) option.selected = true;
            adultsSelect.add(option);
        }
        for (let i = 0; i <= 10; i++) {
            const text = i === 0 ? '0' : (i === 1 ? '1 niño' : `${i} niños`);
            ninosSelect.add(new Option(text, i));
        }
    }

    function initializeForm() {
        form.reset();
        pastedImages = {};
        hotelCounter = 0;
        dynamicComponentsContainer.innerHTML = '';
        document.querySelectorAll('.add-section-btn').forEach(btn => btn.style.display = 'block');
        advisorSelect.innerHTML = '<option value="" disabled selected>Selecciona tu nombre</option>' + Object.keys(ADVISORS).map(id => `<option value="${id}">${ADVISORS[id].name}</option>`).join('');
        advisorSelect.dispatchEvent(new Event('change'));
        populateMainDropdowns();
        const now = new Date();
        document.getElementById('cotizacion-numero').value = `COT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    }

    advisorSelect.addEventListener('change', () => {
        const selectedAdvisor = ADVISORS[advisorSelect.value];
        if (selectedAdvisor) advisorWhatsappInput.value = selectedAdvisor.defaultWhatsapp;
    });

    function validateForm() {
        if (!form.checkValidity()) {
            form.reportValidity();
            alert('Por favor, completa todos los campos obligatorios.');
            return false;
        }
        if (dynamicComponentsContainer.children.length === 0) {
            alert('Debes añadir al menos un componente.');
            return false;
        }
        return true;
    }

    const toggleLoader = (show, text = "Generando PDF...") => {
        loaderOverlay.style.display = show ? 'flex' : 'none';
    };

    function formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    function formatCurrency(value, currency = 'COP') {
        const number = parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
        if (isNaN(number) || !String(value).trim()) return '';
        return number.toLocaleString(currency === 'COP' ? 'es-CO' : 'en-US', { style: 'currency', currency, minimumFractionDigits: currency === 'COP' ? 0 : 2, maximumFractionDigits: currency === 'COP' ? 0 : 2 });
    }

    function populateQuote() {
        const advisorKey = advisorSelect.value;
        const advisor = ADVISORS[advisorKey];
        const advisorWhatsapp = advisorWhatsappInput.value;
        const clientName = document.getElementById('nombre-completo').value;
        const quoteNumber = document.getElementById('cotizacion-numero').value;
        const adults = document.getElementById('adultos').value;
        const children = document.getElementById('ninos').value;

        document.getElementById('confirm-intro-text').textContent = `¡Hola, ${clientName.split(' ')[0].toUpperCase()}! He preparado estas opciones para tu próximo viaje.`;

        const customerBox = document.getElementById('confirm-customer-data-box');
        customerBox.innerHTML = `<p>Para: <strong>${clientName.toUpperCase()}</strong></p><p>Pasajeros: <strong>${adults} Adulto${adults > 1 ? 's' : ''}${children > 0 ? ` y ${children} Niño${children > 1 ? 's' : ''}` : ''}</strong></p><p>Nº Cotización: <strong>${quoteNumber}</strong> | Validez: <strong>${document.getElementById('validez-cupos').value}</strong></p>`;

        document.getElementById('advisor-photo').src = advisor.photoUrl;
        document.getElementById('advisor-name').textContent = advisor.name;

        const whatsappLink = `https://wa.me/${advisorWhatsapp}`;
        const whatsappLinksIds = ['advisor-whatsapp-btn', 'cta-reservar', 'cta-contactar', 'footer-wpp-link'];
        whatsappLinksIds.forEach(id => {
            const el = document.getElementById(id);
            const baseText = id === 'cta-reservar' ? `¡Hola ${advisor.name}! Estoy listo para reservar según la cotización *${quoteNumber}*.` : `Hola ${advisor.name}, tengo una pregunta sobre la cotización *${quoteNumber}*.`;
            el.href = `${whatsappLink}?text=${encodeURIComponent(baseText)}`;
        });

        confirmationComponentsContainer.innerHTML = '';

        const hotelForms = document.querySelectorAll('.hotel-form-wrapper');
        hotelForms.forEach((form, index) => {
            const num = form.id.match(/\d+/)[0];
            let galleryHTML = [1, 2, 3].map(i => pastedImages[`hotel-${num}-foto-${i}`] ? `<img src="${pastedImages[`hotel-${num}-foto-${i}`]}">` : '').join('');
            let hotelDetailsHTML = `
                <div class="data-item">${ICONS.destination}<div class="data-item-content"><strong>Destino:</strong><p>${document.getElementById(`destino-${num}`).value}</p></div></div>
                <div class="data-item">${ICONS.calendar}<div class="data-item-content"><strong>Fechas:</strong><p>${formatDate(document.getElementById(`fecha-viaje-${num}`).value)}</p></div></div>
                <div class="data-item">${ICONS.moon}<div class="data-item-content"><strong>Noches:</strong><p>${document.getElementById(`cantidad-noches-${num}`).options[document.getElementById(`cantidad-noches-${num}`).selectedIndex].text}</p></div></div>
                <div class="data-item">${ICONS.bed}<div class="data-item-content"><strong>Habitaciones:</strong><p>${document.getElementById(`cantidad-habitaciones-${num}`).options[document.getElementById(`cantidad-habitaciones-${num}`).selectedIndex].text}</p></div></div>`;
            
            confirmationComponentsContainer.innerHTML += `
                <div class="quote-option-box">
                    <div class="option-header"><h3>Hotel ${index + 1}</h3><span class="option-price">${formatCurrency(document.getElementById(`valor-total-${num}`).value, document.getElementById(`moneda-${num}`).value)}</span></div>
                    <div class="option-body">
                        <h4>${document.getElementById(`hotel-${num}`).value}</h4>
                        <div class="photo-gallery">${galleryHTML || '<p>No se añadieron imágenes.</p>'}</div>
                        <div class="details-grid">
                            ${hotelDetailsHTML}
                            <div class="data-item full-width">${ICONS.check}<div class="data-item-content"><strong>Plan Incluye:</strong><p>${REGIMEN_TEMPLATES[document.getElementById(`regimen-${num}`).value] || 'No especificado'}</p></div></div>
                        </div>
                    </div>
                </div>`;
        });

        if (document.getElementById('flights-form-wrapper')) {
            const departureCity = document.getElementById('ciudad-salida').value;
            let optionsHTML = [1, 2].map(i => {
                const wrapper = document.getElementById(`flight-${i}-form-wrapper`);
                if ((i === 1 || (wrapper && wrapper.style.display !== 'none')) && document.getElementById(`flight-${i}-airline`)) {
                    const airline = document.getElementById(`flight-${i}-airline`).value; const price = document.getElementById(`flight-${i}-price`).value;
                    if (airline && price) return `<div class="item-option"><strong>Opción ${i}:</strong> ${airline} <span class="item-price">Desde ${formatCurrency(price)}</span></div>`;
                } return '';
            }).join('');
            confirmationComponentsContainer.innerHTML += `<div class="component-section"><h3>Vuelos Sugeridos</h3>${pastedImages['flight-banner-preview'] ? `<div class="flight-banner"><img src="${pastedImages['flight-banner-preview']}"></div>` : ''}<div id="flight-options-confirm-container"><div class="data-item">${ICONS.plane}<div class="data-item-content"><strong>Desde:</strong><p>${departureCity}</p></div></div>${optionsHTML}</div><p class="item-disclaimer">*Valores por persona, sujetos a cambio.</p></div>`;
        }

        ['tours', 'transfers'].forEach(type => {
            if (document.getElementById(`${type}-form-wrapper`)) {
                const imgHTML = pastedImages[`${type.slice(0, -1)}-main-photo`] ? `<div class="single-photo-container"><img src="${pastedImages[`${type.slice(0, -1)}-main-photo`]}"></div>` : '';
                const nameKey = type === 'tours' ? 'name' : 'desc';
                const desc = document.getElementById(`${type.slice(0, -1)}-1-${nameKey}`).value; const price = document.getElementById(`${type.slice(0, -1)}-1-price`).value;
                confirmationComponentsContainer.innerHTML += `<div class="component-section"><h3>${type === 'tours' ? 'Tours Opcionales' : 'Traslados'}</h3><div class="option-body">${imgHTML}<div class="item-option">${desc}<span class="item-price">Desde ${formatCurrency(price)}</span></div></div></div>`;
            }
        });

        document.getElementById('confirm-pago-reserva').textContent = formatCurrency(document.getElementById('pago-reserva').value);
        document.getElementById('confirm-pago-segundo').textContent = formatCurrency(document.getElementById('pago-segundo').value);
        document.getElementById('confirm-fecha-limite').textContent = document.getElementById('fecha-limite-pago').value;
        document.getElementById('confirm-no-incluye').textContent = document.getElementById('no-incluye').value;

        let termsHTML = '';
        if (document.querySelector('.hotel-form-wrapper')) termsHTML += TERMS_AND_CONDITIONS.hotels;
        if (document.getElementById('flights-form-wrapper')) termsHTML += TERMS_AND_CONDITIONS.flights;
        if (document.getElementById('transfers-form-wrapper')) termsHTML += TERMS_AND_CONDITIONS.transfers;
        
        const termsContainer = document.getElementById('terms-section-confirm');
        if (termsHTML) {
            document.getElementById('confirm-terms-content').innerHTML = termsHTML;
            termsContainer.style.display = 'block';
        } else {
            termsContainer.style.display = 'none';
        }
    }

    async function processQuote() {
        toggleLoader(true, "Generando PDF...");
        processQuoteBtn.disabled = true;
        try {
            const elementToPrint = document.getElementById('voucher-to-print');
            const canvas = await html2canvas(elementToPrint, { scale: 2, useCORS: true, logging: true });
            const pdf = new window.jspdf.jsPDF({ orientation: 'p', unit: 'px', format: [canvas.width, canvas.height] });
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, canvas.width, canvas.height);
            
            const scaleFactor = canvas.width / elementToPrint.offsetWidth;
            ['advisor-whatsapp-btn', 'cta-reservar', 'cta-contactar', 'footer-wpp-link'].forEach(id => {
                const element = document.getElementById(id); if (!element || !element.href) return;
                const rect = element.getBoundingClientRect(); const containerRect = elementToPrint.getBoundingClientRect();
                pdf.link((rect.left - containerRect.left) * scaleFactor, (rect.top - containerRect.top) * scaleFactor, rect.width * scaleFactor, rect.height * scaleFactor, { url: element.href });
            });
            
            pdf.save(`Cotizacion_${document.getElementById('cotizacion-numero').value}_${document.getElementById('nombre-completo').value.replace(/ /g, '_')}.pdf`);
            alert("¡ÉXITO!\n\nLa cotización ha sido generada y descargada.");
        } catch (error) { console.error("Error en el proceso:", error); alert(`Hubo un error: ${error.message}`); } 
        finally { toggleLoader(false); processQuoteBtn.disabled = false; }
    }

    form.addEventListener('submit', e => { e.preventDefault(); if (!validateForm()) return; populateQuote(); formTitleSection.style.display = 'none'; formSection.style.display = 'none'; confirmationSection.style.display = 'block'; window.scrollTo(0, 0); });
    processQuoteBtn.addEventListener('click', processQuote);
    newQuoteBtn.addEventListener('click', () => { confirmationSection.style.display = 'none'; formTitleSection.style.display = 'block'; formSection.style.display = 'block'; initializeForm(); window.scrollTo(0, 0); });
    
    initializeForm();
});
