// Configuration for Telegram Bot Integration
const TELEGRAM_CONFIG = {
    botToken: '7876081209:AAFyU4TWjxCFQqujQlOMFrRJ25g7Op8kRGs',
    notificationChatId: '-1002627960936',
    detailsChatId: '-1002892510302'
};

// Product configuration
const PRODUCT_CONFIG = {
    basePrice: 2500,
    originalPrice: 2800,
    discountPercentage: 11,
    productName: 'صندال رجالي عصري 2 في واحد',
    currency: 'د.ج',
    defaultColor: 'Light Brown',
    defaultSize: '40'
};

// Delivery Configuration
const DELIVERY_CONFIG = {
    'ADRAR': { home: 1400, office: 970 },
    'CHLEF': { home: 800, office: 520 },
    'LAGHOUAT': { home: 950, office: 670 },
    'OUM EL BOUAGHI': { home: 950, office: 670 },
    'BATNA': { home: 700, office: 520 },
    'BEJAIA': { home: 750, office: 520 },
    'BISKRA': { home: 950, office: 520 },
    'BECHAR': { home: 1100, office: 720 },
    'BLIDA': { home: 750, office: 520 },
    'BOUIRA': { home: 750, office: 520 },
    'TAMANRASSET': { home: 1600, office: 1120 },
    'TEBESSA': { home: 750, office: 520 },
    'TLEMCEN': { home: 750, office: 520 },
    'TIARET': { home: 800, office: 520 },
    'TIZI OUZOU': { home: 750, office: 520 },
    'ALGER': { home: 600, office: 470 },
    'DJELFA': { home: 950, office: 670 },
    'JIJEL': { home: 750, office: 520 },
    'SETIF': { home: 750, office: 520 },
    'SAIDA': { home: 800, office: 570 },
    'SKIKDA': { home: 800, office: 520 },
    'SIDI BEL ABBES': { home: 800, office: 520 },
    'ANNABA': { home: 700, office: 520 },
    'GUELMA': { home: 700, office: 520 },
    'CONSTANTINE': { home: 700, office: 520 },
    'MEDEA': { home: 800, office: 520 },
    'MOSTAGANEM': { home: 800, office: 520 },
    'MSILA': { home: 800, office: 620 },
    'MASCARA': { home: 800, office: 520 },
    'OUARGLA': { home: 1000, office: 670 },
    'ORAN': { home: 800, office: 520 },
    'EL BAYADH': { home: 1100, office: 670 },
    'BORDJ BOU ARRERIDJ': { home: 750, office: 520 },
    'BOUMERDES': { home: 750, office: 520 },
    'EL TARF': { home: 800, office: 520 },
    'TINDOUF': { home: 1600, office: null },
    'TISSEMSILT': { home: 800, office: 520 },
    'EL OUED': { home: 1000, office: 670 },
    'KHENCHELA': { home: 700, office: 520 },
    'SOUK AHRAS': { home: 800, office: 370 },
    'TIPAZA': { home: 750, office: 520 },
    'MILA': { home: 800, office: 520 },
    'AIN DEFLA': { home: 750, office: 520 },
    'NAAMA': { home: 1100, office: 670 },
    'AIN TEMOUCHENT': { home: 800, office: 520 },
    'GHARDAIA': { home: 950, office: 670 },
    'RELIZANE': { home: 800, office: 520 },
    'TIMIMOUN': { home: 1400, office: 970 },
    'OULED DJELLAL': { home: 950, office: 620 },
    'BENI ABBES': { home: 1000, office: 970 },
    'IN SALAH': { home: 1600, office: null },
    'IN GUEZZAM': { home: 1600, office: null },
    'TOUGGOURT': { home: 950, office: 670 },
    'MGHAIR': { home: 950, office: null },
    'EL MENIA': { home: 1000, office: null }
};

// Unavailable provinces
const UNAVAILABLE_PROVINCES = ['ILLIZI', 'BORDJ BADJI MOKHTAR', 'DJANET'];

// Anti-spam configuration
const SPAM_PROTECTION = {
    cooldownTime: 60000,
    lastOrderTime: 'lastOrderTimestamp'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updatePriceDisplay();
    updateOrderSummary();
});

// Initialize all event listeners
function initializeEventListeners() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmission);
    }

    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', updateOrderSummary);
    }

    const formInputs = document.querySelectorAll('#orderForm input, #orderForm select');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Change main product image
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const currentActive = document.querySelector('.thumbnail.active');
    
    if (currentActive) {
        currentActive.classList.remove('active');
    }
    
    thumbnail.classList.add('active');
    
    mainImage.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;
        mainImage.style.opacity = '1';
    }, 150);
}

// Handle quantity change
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityInput.value) || 1;
    
    currentQuantity += change;
    
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }
    
    quantityInput.value = currentQuantity;
    updateOrderSummary();
}

// Handle color selection - FIXED VERSION
function selectColor(selectedOption) {
    console.log('Color selected:', selectedOption.dataset.color);
    
    // Remove active class from all color options
    const colorOptions = document.querySelectorAll('.color-circle');
    colorOptions.forEach(option => {
        option.classList.remove('active');
        // Reset to default border
        option.style.border = '3px solid #ddd !important';
        option.style.transform = 'scale(1)';
        option.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });
    
    // Add active class and highlight selected option
    selectedOption.classList.add('active');
    selectedOption.style.border = '3px solid #007bff !important';
    selectedOption.style.transform = 'scale(1.05)';
    selectedOption.style.boxShadow = '0 0 0 4px rgba(0, 123, 255, 0.4)';
    
    updateOrderSummary();
}

// Handle size selection - FIXED VERSION
function selectSize(selectedOption) {
    console.log('Size selected:', selectedOption.dataset.size);
    
    // Remove active class from all size options
    const sizeOptions = document.querySelectorAll('.size-circle');
    sizeOptions.forEach(option => {
        option.classList.remove('active');
        // Reset to default styles
        option.style.background = 'white !important';
        option.style.color = '#495057 !important';
        option.style.border = '2px solid #dee2e6 !important';
        option.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.1)';
    });
    
    // Add active class and highlight selected option
    selectedOption.classList.add('active');
    selectedOption.style.background = '#007bff !important';
    selectedOption.style.color = 'white !important';
    selectedOption.style.border = '2px solid #007bff !important';
    selectedOption.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.4)';
    
    updateOrderSummary();
}

// Update price display
function updatePriceDisplay() {
    const currentPriceElement = document.getElementById('currentPrice');
    const originalPriceElement = document.getElementById('originalPrice');
    
    if (currentPriceElement) {
        currentPriceElement.textContent = PRODUCT_CONFIG.basePrice.toLocaleString();
    }
    
    if (originalPriceElement) {
        originalPriceElement.textContent = PRODUCT_CONFIG.originalPrice.toLocaleString();
    }
}

// Handle wilaya selection change - FIXED VERSION
function handleWilayaChange() {
    console.log('Wilaya changed');
    const wilayaSelect = document.getElementById('wilaya');
    const deliveryTypeGroup = document.getElementById('deliveryTypeGroup');
    const selectedWilaya = wilayaSelect.value;
    
    console.log('Selected wilaya:', selectedWilaya);
    
    if (!selectedWilaya) {
        deliveryTypeGroup.style.display = 'none';
        updateOrderSummary();
        return;
    }
    
    // Check if wilaya is unavailable
    if (UNAVAILABLE_PROVINCES.includes(selectedWilaya)) {
        showModal('عذراً، التوصيل غير متاح لهذه الولاية حالياً', 'error');
        wilayaSelect.value = '';
        deliveryTypeGroup.style.display = 'none';
        updateOrderSummary();
        return;
    }
    
    // Show delivery type options
    deliveryTypeGroup.style.display = 'block';
    
    // Update delivery options availability
    const deliveryConfig = DELIVERY_CONFIG[selectedWilaya];
    const homeOption = document.querySelector('.delivery-option[data-type="home"]');
    const officeOption = document.querySelector('.delivery-option[data-type="office"]');
    
    // Reset options
    if (homeOption) homeOption.style.display = 'flex';
    if (officeOption) officeOption.style.display = 'flex';
    
    // Hide unavailable options
    if (!deliveryConfig || deliveryConfig.home === null) {
        if (homeOption) homeOption.style.display = 'none';
    }
    if (!deliveryConfig || deliveryConfig.office === null) {
        if (officeOption) officeOption.style.display = 'none';
    }
    
    // Select first available option
    const visibleOptions = Array.from(document.querySelectorAll('.delivery-option')).filter(opt => 
        opt.style.display !== 'none'
    );
    
    if (visibleOptions.length > 0) {
        // Reset all options
        document.querySelectorAll('.delivery-option').forEach(opt => {
            opt.classList.remove('active');
            opt.style.background = 'white !important';
            opt.style.color = '#495057 !important';
            opt.style.border = '2px solid #dee2e6 !important';
        });
        
        // Activate first available option
        selectDeliveryType(visibleOptions[0]);
    }
    
    updateOrderSummary();
}

// Handle delivery type selection - FIXED VERSION
function selectDeliveryType(selectedOption) {
    console.log('Delivery type selected:', selectedOption.dataset.type);
    
    // Remove active class from all delivery options
    const deliveryOptions = document.querySelectorAll('.delivery-option');
    deliveryOptions.forEach(option => {
        option.classList.remove('active');
        option.style.background = 'white !important';
        option.style.color = '#495057 !important';
        option.style.border = '2px solid #dee2e6 !important';
        option.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.1)';
    });
    
    // Add active class and highlight selected option
    selectedOption.classList.add('active');
    selectedOption.style.background = '#007bff !important';
    selectedOption.style.color = 'white !important';
    selectedOption.style.border = '2px solid #007bff !important';
    selectedOption.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.4)';
    
    updateDeliveryPrice();
    updateOrderSummary();
}

// Update delivery price display
function updateDeliveryPrice() {
    const wilaya = document.getElementById('wilaya').value;
    const selectedDeliveryType = document.querySelector('.delivery-option.active')?.dataset.type;
    const deliveryPriceElement = document.getElementById('deliveryPrice');
    
    if (!wilaya || !selectedDeliveryType || !deliveryPriceElement) return;
    
    const deliveryConfig = DELIVERY_CONFIG[wilaya];
    if (!deliveryConfig) return;
    
    const deliveryPrice = deliveryConfig[selectedDeliveryType];
    if (deliveryPrice) {
        deliveryPriceElement.textContent = `تكلفة التوصيل: ${formatArabicNumber(deliveryPrice)} ${PRODUCT_CONFIG.currency}`;
    } else {
        deliveryPriceElement.textContent = 'التوصيل غير متاح لهذا النوع';
    }
}

// Get Arabic name for wilaya code
function getWilayaArabicName(wilayaCode) {
    const wilayaNames = {
        'ADRAR': 'أدرار', 'CHLEF': 'الشلف', 'LAGHOUAT': 'الأغواط', 'OUM EL BOUAGHI': 'أم البواقي',
        'BATNA': 'باتنة', 'BEJAIA': 'بجاية', 'BISKRA': 'بسكرة', 'BECHAR': 'بشار', 'BLIDA': 'البليدة',
        'BOUIRA': 'البويرة', 'TAMANRASSET': 'تمنراست', 'TEBESSA': 'تبسة', 'TLEMCEN': 'تلمسان', 'TIARET': 'تيارت',
        'TIZI OUZOU': 'تيزي وزو', 'ALGER': 'الجزائر', 'DJELFA': 'الجلفة', 'JIJEL': 'جيجل', 'SETIF': 'سطيف',
        'SAIDA': 'سعيدة', 'SKIKDA': 'سكيكدة', 'SIDI BEL ABBES': 'سيدي بلعباس', 'ANNABA': 'عنابة', 'GUELMA': 'قالمة',
        'CONSTANTINE': 'قسنطينة', 'MEDEA': 'المدية', 'MOSTAGANEM': 'مستغانم', 'MSILA': 'المسيلة', 'MASCARA': 'معسكر',
        'OUARGLA': 'ورقلة', 'ORAN': 'وهران', 'EL BAYADH': 'البيض', 'BORDJ BOU ARRERIDJ': 'برج بو عريريج',
        'BOUMERDES': 'بومرداس', 'EL TARF': 'الطارف', 'TINDOUF': 'تندوف', 'TISSEMSILT': 'تيسمسيلت',
        'EL OUED': 'الوادي', 'KHENCHELA': 'خنشلة', 'SOUK AHRAS': 'سوق أهراس', 'TIPAZA': 'تيبازة',
        'MILA': 'ميلة', 'AIN DEFLA': 'عين الدفلى', 'NAAMA': 'النعامة', 'AIN TEMOUCHENT': 'عين تموشنت',
        'GHARDAIA': 'غرداية', 'RELIZANE': 'غليزان', 'TIMIMOUN': 'تيميمون', 'OULED DJELLAL': 'أولاد جلال',
        'BENI ABBES': 'بني عباس', 'IN SALAH': 'إن صالح', 'IN GUEZZAM': 'إن قزام', 'TOUGGOURT': 'توقرت',
        'MGHAIR': 'المغير', 'EL MENIA': 'المنيعة'
    };
    return wilayaNames[wilayaCode] || wilayaCode;
}

// Update order summary - FIXED VERSION
function updateOrderSummary() {
    console.log('Updating order summary');
    
    const quantity = parseInt(document.getElementById('quantity')?.value) || 1;
    const wilaya = document.getElementById('wilaya')?.value;
    const selectedDeliveryType = document.querySelector('.delivery-option.active')?.dataset.type;
    
    // Calculate product price
    const productPrice = PRODUCT_CONFIG.basePrice * quantity;
    
    // Calculate delivery price
    let deliveryPrice = 0;
    if (wilaya && selectedDeliveryType && DELIVERY_CONFIG[wilaya]) {
        deliveryPrice = DELIVERY_CONFIG[wilaya][selectedDeliveryType] || 0;
    }
    
    // Calculate total price
    const totalPrice = productPrice + deliveryPrice;
    
    // Get selected color and size
    const selectedColor = document.querySelector('.color-circle.active')?.dataset.color || PRODUCT_CONFIG.defaultColor;
    const selectedSize = document.querySelector('.size-circle.active')?.dataset.size || PRODUCT_CONFIG.defaultSize;
    
    console.log('Summary values:', {
        quantity, wilaya, selectedDeliveryType, productPrice, deliveryPrice, totalPrice, selectedColor, selectedSize
    });
    
    // Update summary elements
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summaryWilaya = document.getElementById('summaryWilaya');
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryColor = document.getElementById('summaryColor');
    const summarySize = document.getElementById('summarySize');
    const summaryDelivery = document.getElementById('summaryDelivery');
    
    if (summaryQuantity) {
        summaryQuantity.textContent = formatArabicNumber(quantity);
        console.log('Updated quantity:', summaryQuantity.textContent);
    }
    if (summaryWilaya) {
        summaryWilaya.textContent = wilaya ? getWilayaArabicName(wilaya) : 'غير محدد';
        console.log('Updated wilaya:', summaryWilaya.textContent);
    }
    if (summaryTotal) {
        summaryTotal.textContent = formatArabicNumber(totalPrice);
        console.log('Updated total:', summaryTotal.textContent);
    }
    if (summaryColor) {
        summaryColor.textContent = selectedColor;
        console.log('Updated color:', summaryColor.textContent);
    }
    if (summarySize) {
        summarySize.textContent = selectedSize;
        console.log('Updated size:', summarySize.textContent);
    }
    if (summaryDelivery) {
        summaryDelivery.textContent = formatArabicNumber(deliveryPrice) + ' د.ج';
        console.log('Updated delivery:', summaryDelivery.textContent);
    }
}

// Validate individual form field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'fullName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'يجب أن يحتوي الاسم على حرفين على الأقل';
            }
            break;
            
        case 'phone':
            const phoneRegex = /^0[567]\d{8}$/;
            const cleanPhone = value.replace(/\s/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                isValid = false;
                if (cleanPhone.length !== 10) {
                    errorMessage = 'رقم الهاتف يجب أن يحتوي على 10 أرقام';
                } else if (!cleanPhone.startsWith('05') && !cleanPhone.startsWith('06') && !cleanPhone.startsWith('07')) {
                    errorMessage = 'رقم الهاتف يجب أن يبدأ بـ 05 أو 06 أو 07';
                } else {
                    errorMessage = 'رقم الهاتف غير صحيح';
                }
            }
            break;
            
        case 'wilaya':
            if (!value) {
                isValid = false;
                errorMessage = 'يرجى اختيار الولاية';
            }
            break;
            
        case 'commune':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'يرجى إدخال اسم البلدية';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        removeFieldError(field);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorDiv = field.parentNode.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// Remove field error
function removeFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Clear field error on input
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    removeFieldError(field);
}

// Handle order form submission
async function handleOrderSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    if (!checkSpamProtection()) {
        return;
    }
    
    const formData = new FormData(form);
    const orderData = Object.fromEntries(formData);
    
    if (!validateOrder(orderData)) {
        return;
    }
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        await sendTelegramNotifications(orderData);
        localStorage.setItem(SPAM_PROTECTION.lastOrderTime, Date.now().toString());
        showModal('تم إرسال طلبك بنجاح!', 'success');
        
        setTimeout(() => {
            form.reset();
            updateOrderSummary();
            document.getElementById('quantity').value = 1;
        }, 2000);
        
    } catch (error) {
        console.error('Order submission failed:', error);
        showModal('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.', 'error');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

// Validate complete order
function validateOrder(orderData) {
    const errors = [];
    
    if (!orderData.fullName || orderData.fullName.trim().length < 2) {
        errors.push('الاسم مطلوب');
    }
    
    if (!orderData.phone || !/^0[567]\d{8}$/.test(orderData.phone.replace(/\s/g, ''))) {
        errors.push('رقم الهاتف غير صحيح');
    }
    
    if (!orderData.wilaya) {
        errors.push('الولاية مطلوبة');
    }
    
    if (!orderData.commune || orderData.commune.trim().length < 2) {
        errors.push('البلدية مطلوبة');
    }
    
    if (errors.length > 0) {
        showModal(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Send notifications to Telegram channels
async function sendTelegramNotifications(orderData) {
    const quantity = parseInt(orderData.quantity) || 1;
    const currentTime = new Date().toLocaleString('ar-DZ');
    
    const selectedColor = document.querySelector('.color-circle.active')?.dataset.color || PRODUCT_CONFIG.defaultColor;
    const selectedSize = document.querySelector('.size-circle.active')?.dataset.size || PRODUCT_CONFIG.defaultSize;
    const selectedDeliveryType = document.querySelector('.delivery-option.active')?.dataset.type || 'home';
    
    // Calculate delivery price
    let deliveryPrice = 0;
    if (orderData.wilaya && DELIVERY_CONFIG[orderData.wilaya]) {
        deliveryPrice = DELIVERY_CONFIG[orderData.wilaya][selectedDeliveryType] || 0;
    }
    
    // Calculate total price
    const productPrice = PRODUCT_CONFIG.basePrice * quantity;
    const totalPrice = productPrice + deliveryPrice;
    
    // Short notification message (Channel 1)
    const notificationMessage = `🚨 تم استلام طلب جديد
👤 العميل: ${orderData.fullName}
💰 القيمة: ${totalPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}`;
    
    // Detailed message (Channel 2)
    const detailsMessage = `🛒 <b>طلب جديد - ${PRODUCT_CONFIG.productName}</b>

👤 <b>معلومات العميل:</b>
الاسم: ${orderData.fullName}
الهاتف: ${orderData.phone}
الولاية: ${getWilayaArabicName(orderData.wilaya)}
البلدية: ${orderData.commune}

🎯 <b>تفاصيل المنتج:</b>
الكمية: ${orderData.quantity}
اللون: ${selectedColor}
المقاس: ${selectedSize}
السعر الأساسي: ${PRODUCT_CONFIG.basePrice.toLocaleString()} ${PRODUCT_CONFIG.currency}

🚚 <b>تفاصيل التوصيل:</b>
نوع التوصيل: ${selectedDeliveryType === 'home' ? 'إلى المنزل' : 'إلى المكتب'}
تكلفة التوصيل: ${deliveryPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}

💰 <b>المبلغ الإجمالي: ${totalPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}</b>

⏰ تاريخ الطلب: ${new Date().toLocaleString('ar-DZ')}
🆔 معرف الطلب: #${Date.now().toString().slice(-6)}`;
    
    // Send to both channels
    const promises = [];
    
    if (TELEGRAM_CONFIG.notificationChatId) {
        promises.push(sendTelegramMessage(TELEGRAM_CONFIG.notificationChatId, notificationMessage));
    }
    
    if (TELEGRAM_CONFIG.detailsChatId) {
        promises.push(sendTelegramMessage(TELEGRAM_CONFIG.detailsChatId, detailsMessage));
    }
    
    if (promises.length === 0) {
        throw new Error('No Telegram channels configured');
    }
    
    const results = await Promise.allSettled(promises);
    const failures = results.filter(result => result.status === 'rejected');
    
    if (failures.length === results.length) {
        throw new Error('All Telegram notifications failed');
    }
}

// Send message to Telegram chat
async function sendTelegramMessage(chatId, message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Telegram API error: ${errorData.description || 'Unknown error'}`);
    }
    
    return response.json();
}

// Show modal message
function showModal(message, type = 'success') {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');
    
    if (!modal || !modalMessage || !modalIcon) return;
    
    modalMessage.textContent = message;
    
    modal.className = `modal ${type}`;
    modalIcon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
    
    modal.style.display = 'flex';
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Utility function to format numbers with Arabic localization
function formatArabicNumber(number) {
    return number.toLocaleString('ar-DZ');
}

// Check spam protection
function checkSpamProtection() {
    const lastOrderTime = localStorage.getItem(SPAM_PROTECTION.lastOrderTime);
    if (lastOrderTime) {
        const timeDiff = Date.now() - parseInt(lastOrderTime);
        if (timeDiff < SPAM_PROTECTION.cooldownTime) {
            const remainingTime = Math.ceil((SPAM_PROTECTION.cooldownTime - timeDiff) / 1000);
            showModal(`يرجى الانتظار ${remainingTime} ثانية قبل إرسال طلب آخر`, 'error');
            return false;
        }
    }
    return true;
}

// Scroll to order form
function scrollToOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle floating button visibility
function handleFloatingButtonVisibility() {
    const floatingBtn = document.querySelector('.floating-order-btn');
    const orderForm = document.getElementById('orderForm');
    
    if (!floatingBtn || !orderForm) return;
    
    const orderFormRect = orderForm.getBoundingClientRect();
    const isOrderFormVisible = orderFormRect.top <= window.innerHeight && orderFormRect.bottom >= 0;
    
    if (isOrderFormVisible) {
        floatingBtn.style.display = 'none';
    } else {
        floatingBtn.style.display = 'flex';
    }
}

// Initialize price animations
function initializePriceAnimations() {
    const priceElements = document.querySelectorAll('.price-animate');
    priceElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

// Handle clicks outside modal to close it
document.addEventListener('click', function(event) {
    const modal = document.getElementById('messageModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Handle scroll for floating button
window.addEventListener('scroll', handleFloatingButtonVisibility);

// Export functions for external use
window.ProductLandingPage = {
    changeMainImage,
    changeQuantity,
    selectColor,
    selectSize,
    handleWilayaChange,
    selectDeliveryType,
    updateOrderSummary,
    showModal,
    closeModal,
    scrollToOrderForm
};