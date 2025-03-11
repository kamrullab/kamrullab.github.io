// Function to Generate WHM Commands
function generateCommands() {
    let domain = document.getElementById("domain").value.trim();
    if (domain === "") {
        alert("Please enter a domain name!");
        return;
    }

    let commands = [
        // 🔹 DNS MANAGEMENT COMMANDS 🔹
        {
            cmd: `grep -Ri "${domain}" /etc/named.conf /var/named/`,
            desc: "🔎 Searches for all DNS records related to the domain across system files.<br>"
                + "🔄 Helps detect conflicts or duplicate records that might cause issues.<br>"
                + "✅ Useful when debugging DNS problems."
        },
        {
            cmd: `grep -i ${domain} /etc/named.conf`,
            desc: "📋 Checks if the domain exists in the named.conf configuration.<br>"
                + "🔍 Helps confirm whether the domain is already set up.<br>"
                + "⚠️ Use before attempting any removal."
        },
        {
            cmd: `sed -i '/zone "${domain}" {/,/};/d' /etc/named.conf`,
            desc: "🛑 Removes the domain's entry from the named.conf file.<br>"
                + "⚠️ Only use this if you're sure the DNS entry needs deletion.<br>"
                + "💡 Recommended before adding the domain again."
        },
        /*
        {
            cmd: `rm -f /var/named/${domain}.db`,
            desc: "🗑️ Deletes the domain's DNS zone file permanently.<br>"
                + "🚨 Be cautious! This action cannot be undone.<br>"
                + "✅ Use before recreating the domain in DNS settings."
        },
        */

        // 🔹 ACCOUNT MANAGEMENT COMMANDS 🔹
        {
            cmd: `suspend ${domain}`,
            desc: "⛔ Suspends a cPanel account, preventing access.<br>"
                + "🔄 Useful for unpaid invoices or security concerns.<br>"
                + "🚀 The account remains intact and can be unsuspended anytime."
        },
        {
            cmd: `unsuspend ${domain}`,
            desc: "✅ Reactivates a previously suspended cPanel account.<br>"
                + "🔄 Restores full access for the user immediately.<br>"
                + "💡 Ensure there are no ongoing security risks before reactivating."
        },
        {
            cmd: `terminate ${domain}`,
            desc: "💀 Permanently deletes a cPanel account from the system.<br>"
                + "🚨 Cannot be undone. All data, emails, and files are removed.<br>"
                + "✅ Recommended only when absolutely necessary."
        },
        {
            cmd: `whmapi1 listaccts`,
            desc: "📜 Lists all accounts in the WHM server.<br>"
                + "🔍 Displays account details like usernames and domains.<br>"
                + "✅ Helps administrators track and manage accounts efficiently."
        },

        // 🔹 EMAIL & SECURITY COMMANDS 🔹
        {
            cmd: `exim -bp`,
            desc: "📬 Displays the mail queue in Exim.<br>"
                + "🔄 Helps troubleshoot email delivery issues.<br>"
                + "✅ Useful for monitoring undelivered emails."
        },
        {
            cmd: `exim -Mrm ID`,
            desc: "❌ Removes a specific email from the Exim mail queue.<br>"
                + "🔎 Replace 'ID' with the email's actual queue ID.<br>"
                + "⚠️ Be cautious when deleting emails."
        },
        {
            cmd: `csf -t`,
            desc: "🛡️ Lists all temporary firewall bans in ConfigServer Firewall (CSF).<br>"
                + "🔎 Helps identify blocked IPs.<br>"
                + "✅ Useful for managing security issues."
        },
        {
            cmd: `csf -d IP`,
            desc: "🚫 Blocks an IP address permanently in CSF.<br>"
                + "🔍 Useful for banning suspicious or malicious users.<br>"
                + "✅ Improves server security against attacks."
        },
        {
            cmd: `csf -dr IP`,
            desc: "✅ Removes a blocked IP from CSF.<br>"
                + "🔄 Use when an IP was wrongly blocked.<br>"
                + "⚠️ Always verify before unblocking an IP."
        },

        // 🔹 SERVER MANAGEMENT COMMANDS 🔹
        {
            cmd: `service httpd restart`,
            desc: "🔄 Restarts the Apache web server.<br>"
                + "⚠️ Recommended after configuration changes.<br>"
                + "✅ Helps resolve website loading issues."
        },
        {
            cmd: `service mysql restart`,
            desc: "🔄 Restarts the MySQL database service.<br>"
                + "⚠️ Use when experiencing database connection issues.<br>"
                + "✅ Ensures smooth operation of database-driven sites."
        },
        {
            cmd: `top`,
            desc: "📊 Displays real-time system resource usage.<br>"
                + "🔍 Helps track high CPU or memory-consuming processes.<br>"
                + "✅ Useful for identifying server load issues."
        },
        {
            cmd: `uptime`,
            desc: "⏳ Shows the server’s uptime and load averages.<br>"
                + "🔄 Helps determine server stability.<br>"
                + "✅ Useful for performance monitoring."
        },
        {
            cmd: `df -h`,
            desc: "💾 Displays available and used disk space.<br>"
                + "🔍 Helps detect low storage issues.<br>"
                + "✅ Essential for server maintenance."
        },

        // 🔹 USER & DOMAIN INFORMATION COMMANDS 🔹
        {
            cmd: `ls /var/cpanel/users/`,
            desc: "📂 Lists all cPanel accounts on the server.<br>"
                + "🔍 Helps check existing accounts quickly.<br>"
                + "✅ Useful before creating a new account."
        },
        {
            cmd: `cat /var/cpanel/users/${domain}`,
            desc: "📋 Displays detailed information about a specific cPanel user.<br>"
                + "🔎 Includes data like email accounts, permissions, and settings.<br>"
                + "✅ Use for troubleshooting user account issues."
        },
        {
            cmd: `sls terminate ${domain}`,
            desc: "💀 Terminates a site using SLS (Safe Linux Server).<br>"
                + "🚨 Removes the entire website configuration.<br>"
                + "✅ Recommended for permanent removals."
        },
        {
            cmd: `sls suspend ${domain}`,
            desc: "⛔ Suspends a site using SLS security.<br>"
                + "🔍 Prevents unauthorized access.<br>"
                + "✅ Useful for security concerns or unpaid accounts."
        },
        {
            cmd: `sls unsuspend ${domain}`,
            desc: "✅ Unsuspends a site previously disabled with SLS.<br>"
                + "🔄 Restores access immediately.<br>"
                + "💡 Ensure security checks before reactivating."
        }
    ];

    let output = "";
    commands.forEach((command) => {
        output += `
        <div class="command-box">
            <p class="command-description"><strong>${command.desc}</strong></p>
            <code class="command-text">${command.cmd}</code>
            <button class="copy-btn" onclick="copyCommand('${command.cmd}')">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
        `;
    });

    // Show the commands
    let commandsBox = document.getElementById("commands");
    commandsBox.innerHTML = output;
    commandsBox.style.display = "block"; // ✅ Fix: Show the box after generation
}

// Function to Copy Commands Instantly
function copyCommand(command) {
    navigator.clipboard.writeText(command);
    alert("Copied: " + command);
}
