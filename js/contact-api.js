// CallMeBot API Integration
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const form = document.getElementById("contact-form");
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    // Show sending state
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const finalMessage = encodeURIComponent(`💬 New Message!\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Message: ${message}`);

    const apiKey = "gj1nxz7FJ3rZP0K4";
    const username = "elitekamrul";

    const url = `https://api.callmebot.com/facebook/send.php?apikey=${apiKey}&text=${finalMessage}&user=${username}`;

    fetch(url)
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            form.reset();
            button.disabled = false;
            button.innerHTML = originalText;
            alert("✅ Message sent via Messenger!");
        });
}); 