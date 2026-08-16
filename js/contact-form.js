(function () {
    "use strict";

    var endpoint = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-03a7781d-6fae-41e8-844c-4b00ebc0e645/mail/webmailhandler";

    function escapeHtml(value) {
        return value.replace(/[&<>'"]/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                "\"": "&quot;"
            }[character];
        });
    }

    function buildPayload(form) {
        var formData = new FormData(form);
        var name = formData.get("name").trim();
        var email = formData.get("email").trim();
        var subject = formData.get("subject").trim();
        var message = formData.get("message").trim();

        return {
            name: name,
            email: email,
            subject: subject,
            text: [
                "New website contact enquiry",
                "",
                "Name: " + name,
                "Email: " + email,
                "Subject: " + subject,
                "",
                "Message:",
                message
            ].join("\n"),
            html: [
                "<h2>New website contact enquiry</h2>",
                "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>",
                "<p><strong>Email:</strong> " + escapeHtml(email) + "</p>",
                "<p><strong>Subject:</strong> " + escapeHtml(subject) + "</p>",
                "<p><strong>Message:</strong></p>",
                "<p>" + escapeHtml(message).replace(/\r?\n/g, "<br>") + "</p>"
            ].join("")
        };
    }

    document.querySelectorAll(".js-contact-form").forEach(function (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!form.reportValidity()) {
                return;
            }

            var button = form.querySelector('button[type="submit"]');
            var status = form.querySelector(".js-contact-status");
            var originalButtonText = button.textContent;

            button.disabled = true;
            button.textContent = "Sending...";
            status.className = "js-contact-status mt-3 mb-0 text-dark";
            status.textContent = "Sending your message...";

            try {
                var response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(buildPayload(form))
                });

                if (!response.ok) {
                    console.error("Mail service returned HTTP " + response);
                    throw new Error("Mail service returned HTTP " + response.status);
                }

                form.reset();
                status.className = "js-contact-status alert alert-success mt-3 mb-0";
                status.textContent = "Thank you. Your message has been sent successfully.";
            } catch (error) {
                console.error("Unable to send contact form:", error);
                status.className = "js-contact-status alert alert-danger mt-3 mb-0";
                status.textContent = "We could not send your message. Please try again or email us directly.";
            } finally {
                button.disabled = false;
                button.textContent = originalButtonText;
            }
        });
    });
})();
