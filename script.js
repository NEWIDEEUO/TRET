// Configuration for Telegram Bot Integration
const TELEGRAM_CONFIG = {
    botToken: 'YOUR_BOT_TOKEN', // Replace with actual bot token from environment or config
    notificationChatId: 'YOUR_NOTIFICATION_CHAT_ID', // Channel 1 - Short notifications
    detailsChatId: 'YOUR_DETAILS_CHAT_ID' // Channel 2 - Full order details
};

// Product configuration - easily modifiable for different products
const PRODUCT_CONFIG = {
    basePrice: 4900,
    originalPrice: 5500,
    discountPercentage: 11,
    productName: 'منبه الحرمين ha-3005',
    currency: 'د.ج'
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

    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => selectColor(option));
    });

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
    // Remove selected class from all options
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
        option.querySelector('input').checked = false;
    });
    
    // Add selected class to clicked option
    selectedOption.classList.add('selected');
    selectedOption.querySelector('input').checked = true;
    
    // Update price if different colors have different prices
    const newPrice = selectedOption.dataset.price;
    if (newPrice) {
        PRODUCT_CONFIG.basePrice = parseInt(newPrice);
        updatePriceDisplay();
        updateOrderSummary();
    }
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
    const totalPrice = PRODUCT_CONFIG.basePrice * quantity;
    
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
            const phoneRegex = /^(0[5-7]\d{8}|(\+213|213)[5-7]\d{8})$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'رقم الهاتف غير صحيح';
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
        
        // Show success message
        showModal('تم إرسال طلبك بنجاح!', 'success');
        
        // Reset form after successful submission
        setTimeout(() => {
            form.reset();
            updateOrderSummary();
            // Reset color selection to first option
            const firstColorOption = document.querySelector('.color-option');
            if (firstColorOption) {
                selectColor(firstColorOption);
            }
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
    
    // Notification message (Channel 1)
    const notificationMessage = `🟢 طلب جديد!
الاسم: ${orderData.fullName}
السعر الإجمالي: ${totalPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}`;
    
    // Detailed message (Channel 2)
    const detailsMessage = `🛒 تم استلام طلب جديد:
الاسم: ${orderData.fullName}
الهاتف: ${orderData.phone}
الولاية / البلدية: ${orderData.wilaya} / ${orderData.commune}
الكمية: ${quantity}
السعر الإجمالي: ${totalPrice.toLocaleString()} ${PRODUCT_CONFIG.currency}
وقت الطلب: ${currentTime}`;
    
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

// Initialize price animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePriceAnimations);

// Export functions for external use if needed
window.ProductLandingPage = {
    changeMainImage,
    changeQuantity,
    selectColor,
    updateOrderSummary,
    showModal,
    closeModal
};
