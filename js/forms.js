// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form Validation & Submission - Mentee Application
    const menteeForm = document.getElementById('menteeForm');
    if (menteeForm) {
        // Show/hide "Other Country" field based on selection
        const countrySelect = document.getElementById('country');
        const otherCountryField = document.getElementById('otherCountry').parentNode;
        
        otherCountryField.style.display = 'none';
        
        countrySelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherCountryField.style.display = 'block';
            } else {
                otherCountryField.style.display = 'none';
            }
        });
        
        // Show/hide "Other Interest" field based on selection
        const interestSelect = document.getElementById('interestArea');
        const otherInterestField = document.getElementById('otherInterest').parentNode;
        
        otherInterestField.style.display = 'none';
        
        interestSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherInterestField.style.display = 'block';
            } else {
                otherInterestField.style.display = 'none';
            }
        });
        
        // Validate availability checkboxes
        const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]');
        
        // Ensure at least one checkbox is checked
        const validateAvailability = () => {
            const checked = document.querySelectorAll('input[name="availability"]:checked');
            if (checked.length === 0) {
                return false;
            }
            return true;
        };
        
        // Form submission
        menteeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Basic validation
            const requiredFields = menteeForm.querySelectorAll('input[required], select[required], textarea[required]');
            
            requiredFields.forEach(field => {
                if (field.value.trim() === '') {
                    highlightError(field, 'This field is required');
                    isValid = false;
                } else {
                    removeError(field);
                }
            });
            
            // Validate email format
            const email = document.getElementById('email');
            if (email.value.trim() !== '' && !isValidEmail(email.value)) {
                highlightError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate availability
            if (!validateAvailability()) {
                const availabilityLabel = document.querySelector('label[for="availability"]');
                availabilityLabel.insertAdjacentHTML('afterend', '<div class="error-message">Please select at least one availability option</div>');
                isValid = false;
            } else {
                const errorMsg = document.querySelector('label[for="availability"] + .error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your mentee application has been submitted successfully! We will review your application and get back to you soon.';
                
                // Remove any existing success message
                const existingSuccessMessage = menteeForm.querySelector('.success-message');
                if (existingSuccessMessage) {
                    existingSuccessMessage.remove();
                }
                
                menteeForm.appendChild(successMessage);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form after delay
                setTimeout(() => {
                    menteeForm.reset();
                    
                    // Hide conditional fields
                    otherCountryField.style.display = 'none';
                    otherInterestField.style.display = 'none';
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 2000);
            }
        });
    }
    
    // Form Validation & Submission - Mentor Application
    const mentorForm = document.getElementById('mentorForm');
    if (mentorForm) {
        // Show/hide "Other Country" field based on selection
        const countrySelect = document.getElementById('country');
        const otherCountryField = document.getElementById('otherCountry').parentNode;
        
        otherCountryField.style.display = 'none';
        
        countrySelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherCountryField.style.display = 'block';
            } else {
                otherCountryField.style.display = 'none';
            }
        });
        
        // Show/hide "Other Heard From" field based on selection
        const heardFromSelect = document.getElementById('heardFrom');
        const otherHeardFromField = document.getElementById('otherHeardFrom').parentNode;
        
        otherHeardFromField.style.display = 'none';
        
        heardFromSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherHeardFromField.style.display = 'block';
            } else {
                otherHeardFromField.style.display = 'none';
            }
        });
        
        // Limit expertise checkboxes to 3 selections
        const expertiseCheckboxes = document.querySelectorAll('input[name="expertise"]');
        
        expertiseCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checked = document.querySelectorAll('input[name="expertise"]:checked');
                
                if (checked.length > 3) {
                    this.checked = false;
                    
                    // Show warning
                    const warningMsg = document.createElement('div');
                    warningMsg.classList.add('error-message', 'expertise-warning');
                    warningMsg.textContent = 'You can select up to 3 areas of expertise';
                    
                    // Remove existing warning if present
                    const existingWarning = document.querySelector('.expertise-warning');
                    if (existingWarning) {
                        existingWarning.remove();
                    }
                    
                    // Add new warning
                    const expertiseLabel = document.querySelector('label[for="expertise"]');
                    expertiseLabel.appendChild(warningMsg);
                    
                    // Remove warning after 3 seconds
                    setTimeout(() => {
                        warningMsg.remove();
                    }, 3000);
                }
            });
        });
        
        // Validate availability checkboxes
        const validateAvailability = () => {
            const checked = document.querySelectorAll('input[name="availability"]:checked');
            if (checked.length === 0) {
                return false;
            }
            return true;
        };
        
        // Validate expertise checkboxes
        const validateExpertise = () => {
            const checked = document.querySelectorAll('input[name="expertise"]:checked');
            if (checked.length === 0) {
                return false;
            }
            return true;
        };
        
        // Form submission
        mentorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Basic validation
            const requiredFields = mentorForm.querySelectorAll('input[required], select[required], textarea[required]');
            
            requiredFields.forEach(field => {
                if (field.value.trim() === '') {
                    highlightError(field, 'This field is required');
                    isValid = false;
                } else {
                    removeError(field);
                }
            });
            
            // Validate email format
            const email = document.getElementById('email');
            if (email.value.trim() !== '' && !isValidEmail(email.value)) {
                highlightError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate file size for resume
            const resume = document.getElementById('resume');
            if (resume.files.length > 0) {
                const fileSize = resume.files[0].size / 1024 / 1024; // Size in MB
                if (fileSize > 5) {
                    highlightError(resume, 'File size must be less than 5MB');
                    isValid = false;
                }
            }
            
            // Validate availability
            if (!validateAvailability()) {
                const availabilityLabel = document.querySelector('label[for="availability"]');
                availabilityLabel.insertAdjacentHTML('afterend', '<div class="error-message">Please select at least one availability option</div>');
                isValid = false;
            } else {
                const errorMsg = document.querySelector('label[for="availability"] + .error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
            
            // Validate expertise
            if (!validateExpertise()) {
                const expertiseLabel = document.querySelector('label[for="expertise"]');
                expertiseLabel.insertAdjacentHTML('afterend', '<div class="error-message">Please select at least one area of expertise</div>');
                isValid = false;
            } else {
                const errorMsg = document.querySelector('label[for="expertise"] + .error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your mentor application has been submitted successfully! We will review your application and get back to you soon.';
                
                // Remove any existing success message
                const existingSuccessMessage = mentorForm.querySelector('.success-message');
                if (existingSuccessMessage) {
                    existingSuccessMessage.remove();
                }
                
                mentorForm.appendChild(successMessage);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form after delay
                setTimeout(() => {
                    mentorForm.reset();
                    
                    // Hide conditional fields
                    otherCountryField.style.display = 'none';
                    otherHeardFromField.style.display = 'none';
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 2000);
            }
        });
    }
    
    // Helper functions for form validation
    function highlightError(element, message) {
        element.style.borderColor = '#dc3545';
        
        // Add error message if it doesn't exist
        if (!element.nextElementSibling || !element.nextElementSibling.classList.contains('error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = message || `Please enter a valid ${element.placeholder || 'value'}`;
            
            element.parentNode.insertBefore(errorMessage, element.nextSibling);
        }
    }
    
    function removeError(element) {
        element.style.borderColor = '';
        
        // Remove error message if it exists
        const nextSibling = element.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('error-message')) {
            nextSibling.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 