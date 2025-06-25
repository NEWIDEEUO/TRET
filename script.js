// Configuration for Telegram Bot Integration
const TELEGRAM_CONFIG = {
    botToken: '7876081209:AAFyU4TWjxCFQqujQlOMFrRJ25g7Op8kRGs', // Updated bot token
    notificationChatId: '-1002627960936', // Channel 1 - Short notifications only
    detailsChatId: '-1002892510302' // Channel 2 - Full order details
};

// Product configuration - easily modifiable for different products
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

// Unavailable provinces (marked as / /)
const UNAVAILABLE_PROVINCES = ['ILLIZI', 'BORDJ BADJI MOKHTAR', 'DJANET'];

// Anti-spam configuration
const SPAM_PROTECTION = {
    cooldownTime: 60000, // 1 minute cooldown between orders
    lastOrderTime: 'lastOrderTimestamp'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updatePriceDisplay();
    updateOrderSummary();
});

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Order form submission
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', handleOrderSubmission);

    // Wilaya selection for summary update
    const wilayaSelect = document.getElementById('wilaya');
    wilayaSelect.addEventListener('change', updateOrderSummary);

    // Quantity change listeners
    const quantityInput = document.getElementById('quantity');
    quantityInput.addEventListener('change', updateOrderSummary);

    // Form validation on input
    const formInputs = document.querySelectorAll('#orderForm input, #orderForm select');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

/**
 * Change main product image when thumbnail is clicked
 * @param {HTMLElement} thumbnail - The clicked thumbnail element
 */
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const currentActive = document.querySelector('.thumbnail.active');
    
    // Remove active class from current thumbnail
    if (currentActive) {
        currentActive.classList.remove('active');
    }
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Change main image with smooth transition
    mainImage.style.opacity = '0.7';
    
    setTimeout(() => {
        mainImage.src = thumbnail.src;
        mainImage.alt = thumbnail.alt;
        mainImage.style.opacity = '1';
    }, 150);
}

/**
 * Handle quantity change
 * @param {number} change - The change amount (+1 or -1)
 */
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentQuantity = parseInt(quantityInput.value) || 1;
    
    currentQuantity += change;
    
    // Ensure quantity is at least 1
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }
    
    quantityInput.value = currentQuantity;
    updateOrderSummary();
}

/**
 * Handle color selection
 * @param {HTMLElement} selectedOption - The selected color option
 */
function selectColor(selectedOption) {
    // Remove active class and reset borders for all color options
    const colorOptions = document.querySelectorAll('.color-circle');
    colorOptions.forEach(option => {
        option.classList.remove('active');
        option.style.border = '3px solid #ddd';
        option.style.transform = 'scale(1)';
    });
    
    // Add active class and highlight selected option
    selectedOption.classList.add('active');
    selectedOption.style.border = '3px solid #007bff';
    selectedOption.style.transform = 'scale(1.05)';
    selectedOption.style.boxShadow = '0 0 0 4px rgba(0, 123, 255, 0.4)';
    
    // Update order summary
    updateOrderSummary();
}

/**
 * Handle size selection
 * @param {HTMLElement} selectedOption - The selected size option
 */
function selectSize(selectedOption) {
    // Remove active class and reset styles for all size options
    const sizeOptions = document.querySelectorAll('.size-circle');
    sizeOptions.forEach(option => {
        option.classList.remove('active');
        option.style.background = 'white';
        option.style.color = '#495057';
        option.style.border = '2px solid #dee2e6';
        option.style.transform = 'translateY(0)';
    });
    
    // Add active class and highlight selected option
    selectedOption.classList.add('active');
    selectedOption.style.background = '#007bff';
    selectedOption.style.color = 'white';
    selectedOption.style.border = '2px solid #007bff';
    selectedOption.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.4)';
    
    // Update order summary
    updateOrderSummary();
}

/**
 * Update price display
 */
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

/**
 * Update order summary
 */
function updateOrderSummary() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const wilaya = document.getElementById('wilaya').value;
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
    
    // Update summary elements
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summaryWilaya = document.getElementById('summaryWilaya');
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryColor = document.getElementById('summaryColor');
    const summarySize = document.getElementById('summarySize');
    
    if (summaryQuantity) summaryQuantity.textContent = formatArabicNumber(quantity);
    if (summaryWilaya) summaryWilaya.textContent = wilaya ? getWilayaArabicName(wilaya) : 'غير محدد';
    if (summaryTotal) summaryTotal.textContent = formatArabicNumber(totalPrice);
    if (summaryColor) summaryColor.textContent = selectedColor;
    if (summarySize) summarySize.textContent = selectedSize;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const wilaya = document.getElementById('wilaya').value;
    const totalPrice = PRODUCT_CONFIG.basePrice * quantity;
    
    // Get selected color and size
    const selectedColor = document.querySelector('.color-circle.active')?.dataset.color || PRODUCT_CONFIG.defaultColor;
    const selectedSize = document.querySelector('.size-circle.active')?.dataset.size || PRODUCT_CONFIG.defaultSize;
    
    // Update summary elements
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summaryPrice = document.getElementById('summaryPrice');
    const summaryWilaya = document.getElementById('summaryWilaya');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (summaryQuantity) summaryQuantity.textContent = quantity;
    if (summaryPrice) summaryPrice.textContent = PRODUCT_CONFIG.basePrice.toLocaleString();
    if (summaryWilaya) summaryWilaya.textContent = wilaya || '-';
    if (totalPriceElement) totalPriceElement.textContent = totalPrice.toLocaleString();
}

/**
 * Validate individual form field
 * @param {Event} event - The blur event
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    removeFieldError(field);
    
    // Validation rules
    switch (field.name) {
        case 'fullName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'يجب أن يحتوي الاسم على حرفين على الأقل';
            }
            break;
            
        case 'phone':
            // Enhanced phone validation: 10 digits starting with 05, 06, or 07
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
    }
    
    return isValid;
}

/**
 * Show field error
 * @param {HTMLElement} field - The form field
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        display: block;
    `;
    
    // Insert after the field
    field.parentNode.appendChild(errorElement);
}

/**
 * Remove field error
 * @param {HTMLElement} field - The form field
 */
function removeFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Clear field error on input
 * @param {Event} event - The input event
 */
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    removeFieldError(field);
}

/**
 * Handle order form submission
 * @param {Event} event - The form submission event
 */
async function handleOrderSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Check for spam protection
    if (!checkSpamProtection()) {
        return;
    }
    
    // Validate all fields
    const formData = new FormData(form);
    const orderData = Object.fromEntries(formData);
    
    if (!validateOrder(orderData)) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Send to Telegram channels
        await sendTelegramNotifications(orderData);
        
        // Set spam protection timestamp
        localStorage.setItem(SPAM_PROTECTION.lastOrderTime, Date.now().toString());
        
        // Show success message
        showModal('تم إرسال طلبك بنجاح!', 'success');
        
        // Reset form after successful submission
        setTimeout(() => {
            form.reset();
            updateOrderSummary();
            // Reset quantity to 1
            document.getElementById('quantity').value = 1;
        }, 2000);
        
    } catch (error) {
        console.error('Error submitting order:', error);
        showModal('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.', 'error');
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

/**
 * Validate complete order
 * @param {Object} orderData - The order data
 * @returns {boolean} - Whether the order is valid
 */
function validateOrder(orderData) {
    const requiredFields = ['fullName', 'phone', 'wilaya', 'commune', 'quantity'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const event = { target: field };
        
        if (!validateField(event)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Send notifications to Telegram channels
 * @param {Object} orderData - The order data
 */
async function sendTelegramNotifications(orderData) {
    const quantity = parseInt(orderData.quantity) || 1;
    const totalPrice = PRODUCT_CONFIG.basePrice * quantity;
    const currentTime = new Date().toLocaleString('ar-DZ');
    
    // Notification message (Channel 1) - Simple alert with customer name
    const notificationMessage = `🚨 تم استلام طلب جديد
👤 العميل: ${orderData.fullName}
💰 القيمة: ${totalPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}`;
    
    // Get selected options
    const selectedColor = document.querySelector('.color-circle.active')?.dataset.color || PRODUCT_CONFIG.defaultColor;
    const selectedSize = document.querySelector('.size-circle.active')?.dataset.size || PRODUCT_CONFIG.defaultSize;
    const selectedDeliveryType = document.querySelector('.delivery-option.active')?.dataset.type || 'home';
    
    // Calculate delivery price
    let deliveryPrice = 0;
    if (orderData.wilaya && DELIVERY_CONFIG[orderData.wilaya]) {
        deliveryPrice = DELIVERY_CONFIG[orderData.wilaya][selectedDeliveryType] || 0;
    }
    
    // Detailed message (Channel 2) - Complete order information
    const detailsMessage = `🛒 <b>طلب جديد - ${PRODUCT_CONFIG.productName}</b>

👤 <b>بيانات العميل:</b>
الاسم: ${orderData.fullName}
الهاتف: ${orderData.phone}

📍 <b>عنوان التوصيل:</b>
الولاية: ${orderData.wilaya}
البلدية: ${orderData.commune}

🛍️ <b>تفاصيل الطلب:</b>
المنتج: ${PRODUCT_CONFIG.productName}
اللون: ${selectedColor}
المقاس: ${selectedSize}
الكمية: ${quantity}
السعر: ${PRODUCT_CONFIG.basePrice.toLocaleString()} ${PRODUCT_CONFIG.currency}
السعر الإجمالي: ${totalPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}

⏰ <b>وقت الطلب:</b> ${currentTime}

✅ يرجى التواصل مع العميل لتأكيد الطلب`;
    
    // Send to both channels
    const promises = [];
    
    if (TELEGRAM_CONFIG.notificationChatId && TELEGRAM_CONFIG.notificationChatId !== 'YOUR_NOTIFICATION_CHAT_ID') {
        promises.push(sendTelegramMessage(TELEGRAM_CONFIG.notificationChatId, notificationMessage));
    }
    
    if (TELEGRAM_CONFIG.detailsChatId && TELEGRAM_CONFIG.detailsChatId !== 'YOUR_DETAILS_CHAT_ID') {
        promises.push(sendTelegramMessage(TELEGRAM_CONFIG.detailsChatId, detailsMessage));
    }
    
    // If no valid chat IDs configured, simulate success for demo
    if (promises.length === 0) {
        console.log('Telegram configuration needed. Order data:', {
            notification: notificationMessage,
            details: detailsMessage
        });
        return Promise.resolve();
    }
    
    return Promise.all(promises);
}

/**
 * Send message to Telegram chat
 * @param {string} chatId - The chat ID
 * @param {string} message - The message to send
 */
async function sendTelegramMessage(chatId, message) {
    const botToken = TELEGRAM_CONFIG.botToken;
    
    if (!botToken || botToken === 'YOUR_BOT_TOKEN') {
        throw new Error('Telegram bot token not configured');
    }
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
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
        throw new Error(`Telegram API error: ${response.status}`);
    }
    
    return response.json();
}

/**
 * Show modal message
 * @param {string} message - The message to show
 * @param {string} type - The message type ('success' or 'error')
 */
function showModal(message, type = 'success') {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.innerHTML = `
        <div class="${type}-message">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Auto close after 3 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            closeModal();
        }, 3000);
    }
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('messageModal');
    modal.style.display = 'none';
}

/**
 * Handle clicks outside modal to close it
 */
window.addEventListener('click', function(event) {
    const modal = document.getElementById('messageModal');
    if (event.target === modal) {
        closeModal();
    }
});

/**
 * Utility function to format numbers with Arabic localization
 * @param {number} number - The number to format
 * @returns {string} - Formatted number
 */
function formatArabicNumber(number) {
    return number.toLocaleString('ar-DZ');
}

/**
 * Initialize price animations on page load
 */
function initializePriceAnimations() {
    const priceElements = document.querySelectorAll('.current-price, .original-price');
    priceElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

/**
 * Check spam protection - prevent duplicate orders within cooldown period
 * @returns {boolean} - Whether the user can submit an order
 */
function checkSpamProtection() {
    const lastOrderTime = localStorage.getItem(SPAM_PROTECTION.lastOrderTime);
    
    if (lastOrderTime) {
        const timeDiff = Date.now() - parseInt(lastOrderTime);
        const remainingTime = SPAM_PROTECTION.cooldownTime - timeDiff;
        
        if (remainingTime > 0) {
            const remainingSeconds = Math.ceil(remainingTime / 1000);
            showModal(`تم تقديم طلب مسبقاً. يرجى الانتظار ${remainingSeconds} ثانية قبل تقديم طلب جديد.`, 'error');
            return false;
        }
    }
    
    return true;
}

/**
 * Scroll to order form when floating button is clicked
 */
function scrollToOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Focus on first input field
        setTimeout(() => {
            const firstInput = orderForm.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 500);
    }
}

/**
 * Hide floating button when user is near the form
 */
function handleFloatingButtonVisibility() {
    const floatingBtn = document.getElementById('floatingOrderBtn');
    const orderForm = document.getElementById('orderForm');
    
    if (!floatingBtn || !orderForm) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                floatingBtn.style.display = 'none';
            } else {
                floatingBtn.style.display = 'flex';
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(orderForm);
}

// Initialize price animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePriceAnimations);

// Initialize floating button visibility handler
document.addEventListener('DOMContentLoaded', handleFloatingButtonVisibility);

// Export functions for external use if needed
window.ProductLandingPage = {
    changeMainImage,
    changeQuantity,
    selectColor,
    selectSize,
    updateOrderSummary,
    showModal,
    closeModal,
    scrollToOrderForm
};
