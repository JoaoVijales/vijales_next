document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Futuristic feedback state
        const originalText = btnText.textContent;
        btnText.textContent = "TRANSMITTING...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.style.cursor = "wait";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                btnText.textContent = "SIGNAL RECEIVED";
                submitBtn.style.borderColor = "#00FF00";
                submitBtn.style.color = "#00FF00";
                contactForm.reset();
                
                // Show a success message if needed or just revert button after delay
                setTimeout(() => {
                    resetButton(submitBtn, btnText, originalText);
                }, 4000);
            } else {
                throw new Error(result.message || "SIGNAL LOST");
            }
        } catch (error) {
            btnText.textContent = "SIGNAL LOST: " + error.message;
            submitBtn.style.borderColor = "#FF0000";
            submitBtn.style.color = "#FF0000";
            
            setTimeout(() => {
                resetButton(submitBtn, btnText, originalText);
            }, 4000);
        }
    });

    function resetButton(btn, textElem, originalText) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        btn.style.borderColor = "#ff4500";
        btn.style.color = "#ff4500";
        textElem.textContent = originalText;
    }
});
