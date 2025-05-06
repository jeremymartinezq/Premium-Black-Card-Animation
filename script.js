document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const creditCard = document.querySelector('.credit-card');
    const cardContainer = document.querySelector('.card-container');
    const cardForm = document.querySelector('#credit-card-form');
    
    // Card front elements
    const cardNumberDisplay = document.querySelector('.number-group');
    const cardHolderName = document.querySelector('.card-holder-name');
    const cardExpirationDate = document.querySelector('.card-expiration-date');
    const cardLogo = document.querySelector('.card-logo-img');
    
    // Card back elements
    const cvvDisplay = document.querySelector('.cvv-display');
    
    // Form elements
    const cardNumberInput = document.querySelector('#cardNumber');
    const cardNameInput = document.querySelector('#cardName');
    const cardExpiryInput = document.querySelector('#cardExpiry');
    const cardCvvInput = document.querySelector('#cardCvv');
    const cardTypeSelect = document.querySelector('#cardType');

    // Simple flip state
    let isFlipped = false;
    
    // Format Credit Card Number with spaces
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        cardNumberDisplay.textContent = formattedValue || '#### #### #### ####';
    });
    
    // Update Card Holder Name
    cardNameInput.addEventListener('input', (e) => {
        const value = e.target.value.toUpperCase();
        cardHolderName.textContent = value || 'FULL NAME';
    });
    
    // Format Expiry Date (MM/YY)
    cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/gi, '');
        let formattedValue = '';
        
        if (value.length > 0) {
            formattedValue = value.substring(0, 2);
            if (value.length > 2) {
                formattedValue += '/' + value.substring(2, 4);
            }
        }
        
        e.target.value = formattedValue;
        cardExpirationDate.textContent = formattedValue || 'MM/YY';
    });
    
    // Flip card when focusing on CVV
    cardCvvInput.addEventListener('focus', () => {
        creditCard.classList.add('flipped');
        isFlipped = true;
    });
    
    cardCvvInput.addEventListener('blur', () => {
        if (!window.manualFlip) {
            creditCard.classList.remove('flipped');
            isFlipped = false;
        }
    });
    
    cardCvvInput.addEventListener('input', (e) => {
        const value = e.target.value.replace(/[^0-9]/gi, '');
        e.target.value = value;
        cvvDisplay.textContent = value || '***';
    });
    
    // Change Card Type
    cardTypeSelect.addEventListener('change', (e) => {
        const cardType = e.target.value;
        
        const cardImages = {
            'visa': 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png',
            'mastercard': 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png',
            'amex': 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/amex.png',
            'discover': 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/discover.png'
        };
        
        cardLogo.src = cardImages[cardType];
    });
    
    // Prevent actual form submission
    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form would be submitted here. This is just a demo!');
    });
    
    // Prevent form clicks from triggering card flip
    cardForm.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Create flip button 
    const flipButton = document.createElement('button');
    flipButton.textContent = 'Flip Card';
    flipButton.className = 'flip-button';
    flipButton.id = 'flip-button';
    cardContainer.appendChild(flipButton);

    // Add toggle functionality to flip button
    flipButton.addEventListener('click', () => {
        creditCard.classList.toggle('flipped');
        isFlipped = !isFlipped;
        window.manualFlip = isFlipped;
    });

    // Add Visa as default card type on load
    cardLogo.src = 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png';

    // Direct click on card container also flips the card
    cardContainer.addEventListener('click', (e) => {
        if (e.target.className !== 'flip-button') {
            creditCard.classList.toggle('flipped');
            isFlipped = !isFlipped;
            window.manualFlip = isFlipped;
        }
    });
}); 