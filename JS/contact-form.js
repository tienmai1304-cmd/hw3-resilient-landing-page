
"use strict";

const contactForm = document.querySelector("#contact-form");
const submitButton = document.querySelector("#submit-button");
const formStatus = document.querySelector("#form-status");

const FORM_STATES = Object.freeze({
    IDLE: "idle",
    SUBMITTING: "submitting",
    SUCCESS: "success",
    ERROR: "error"
});

let currentFormState = FORM_STATES.IDLE;

function setFormState(state, message = "") {
    if (!Object.values(FORM_STATES).includes(state)) {
        throw new Error("Invalid form state.");
    }

    currentFormState = state;

    const isSubmitting = state === FORM_STATES.SUBMITTING;

    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting
        ? "Sending..."
        : "Send message";

    formStatus.textContent = message;
    formStatus.dataset.state = state;
}

function validateFormData() {
    const nameInput = contactForm.elements.namedItem("name");
    const emailInput = contactForm.elements.namedItem("email");
    const messageInput = contactForm.elements.namedItem("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
        return {
            valid: false,
            message: "Please complete all fields."
        };
    }

    if (name.length > 100 || email.length > 254 || message.length > 2000) {
        return {
            valid: false,
            message: "One or more fields exceed the allowed length."
        };
    }

    if (!emailInput.validity.valid) {
        return {
            valid: false,
            message: "Please enter a valid email address."
        };
    }

    return { valid: true };
}

function simulateSubmission() {
    return new Promise((resolve) => {
        window.setTimeout(resolve, 800);
    });
}

async function handleFormSubmit(event) {
    event.preventDefault();

    if (currentFormState === FORM_STATES.SUBMITTING) {
        return;
    }

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const validation = validateFormData();

    if (!validation.valid) {
        setFormState(FORM_STATES.ERROR, validation.message);
        return;
    }

    setFormState(
        FORM_STATES.SUBMITTING,
        "Submitting your message..."
    );

    try {
        await simulateSubmission();

        setFormState(
            FORM_STATES.SUCCESS,
            "Thank you for reaching out! Your message has been received."
        );

        contactForm.reset();
    } catch (error) {
        setFormState(
            FORM_STATES.ERROR,
            "Something went wrong. Please try again."
        );

        console.error("Form submission simulation failed:", error);
    }
}

if (contactForm && submitButton && formStatus) {
    contactForm.addEventListener("submit", handleFormSubmit);
} else {
    console.error("Contact form elements could not be found.");
}
