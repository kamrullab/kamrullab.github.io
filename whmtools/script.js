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
        },
        {
            cmd: `whmapi1 getdomainowner domain=${domain}`,
            desc: "🔍 Finds the cPanel username assigned to the specified domain.<br>"
                + "✅ Useful when managing multiple accounts.<br>"
                + "⚠️ Ensures correct user-domain mapping."
        },
        {
            cmd: `whmapi1 listaddondomains user=${domain}`,
            desc: "🌐 Lists all addon domains under a specified cPanel username.<br>"
                + "✅ Useful for checking secondary domains.<br>"
                + "🔄 Helps in migration and verification tasks."
        },
        {
            cmd: `whmapi1 get_main_domain user=${domain}`,
            desc: "🏠 Finds the main (primary) domain associated with a cPanel user.<br>"
                + "🔎 Useful when managing multiple addon domains.<br>"
                + "✅ Prevents misconfigurations when modifying accounts."
        },
        {
            cmd: `whmapi1 suspend_addon_domain domain=${domain}`,
            desc: "🚫 Suspends an addon domain without affecting the main account.<br>"
                + "✅ Useful for restricting access temporarily.<br>"
                + "🔍 Does not delete data."
        },
        {
            cmd: `whmapi1 unsuspend_addon_domain domain=${domain}`,
            desc: "✅ Reactivates a suspended addon domain.<br>"
                + "🔎 Useful for restoring access after troubleshooting.<br>"
                + "⚙️ Ensures minimal downtime."
        },
        {
            cmd: `whmapi1 removeacct user=${domain}`,
            desc: "❌ Permanently deletes a cPanel account.<br>"
                + "⚠️ Cannot be undone.<br>"
                + "✅ Use with caution when removing inactive accounts."
        },
        {
            cmd: `whmapi1 listaccts search=${domain} searchtype=owner`,
            desc: "📋 Lists all domains owned by a specific reseller.<br>"
                + "🔎 Helps verify reseller accounts.<br>"
                + "✅ Useful for reseller management."
        },
        {
            cmd: `whmapi1 getbwusage domain=${domain}`,
            desc: "📊 Retrieves bandwidth usage statistics for a domain.<br>"
                + "🔎 Helps in analyzing website traffic.<br>"
                + "✅ Useful for tracking resource limits."
        },
        {
            cmd: `whmapi1 list_domains`,
            desc: "🌎 Lists all active domains on the server.<br>"
                + "🔍 Useful for auditing and verification.<br>"
                + "✅ Ensures no unauthorized domains are hosted."
        },
        {
            cmd: `whmapi1 getipforwhmuser user=${domain}`,
            desc: "📌 Finds the primary IP address assigned to a domain.<br>"
                + "🔎 Useful for SSL and DNS configuration.<br>"
                + "✅ Prevents misconfigurations in domain routing."
        },
        
            {
                cmd: `whmapi1 gethostname`,
                desc: "🌍 Retrieves the hostname of the WHM server.<br>"
                    + "✅ Useful for checking if the server hostname is correctly configured.<br>"
                    + "⚙️ Helps when setting up SSL and email services."
            },
            {
                cmd: `whmapi1 listparkeddomains user=${domain}`,
                desc: "🔄 Lists all parked (alias) domains for a cPanel account.<br>"
                    + "✅ Useful for identifying additional domains mapped to the main site.<br>"
                    + "⚠️ Helps in troubleshooting domain redirection issues."
            },
            {
                cmd: `whmapi1 changepackage user=${domain} pkg=new_package_name`,
                desc: "📦 Changes the hosting package assigned to a cPanel user.<br>"
                    + "✅ Useful for upgrading or downgrading accounts.<br>"
                    + "⚠️ Ensure the new package is correctly configured before applying."
            },
            {
                cmd: `whmapi1 reboot`,
                desc: "⚡ Reboots the WHM server.<br>"
                    + "✅ Use this only when necessary (e.g., major updates, frozen services).<br>"
                    + "⚠️ All sites will be temporarily unavailable during the reboot."
            },
            {
                cmd: `whmapi1 suspend_outgoing_email user=${domain}`,
                desc: "📩 Suspends all outgoing emails for a cPanel account.<br>"
                    + "✅ Prevents spam or excessive email usage.<br>"
                    + "⚠️ Useful for accounts flagged for high email sending rates."
            },
            {
                cmd: `whmapi1 unsuspend_outgoing_email user=${domain}`,
                desc: "📨 Restores outgoing email functionality for a cPanel account.<br>"
                    + "✅ Use when the issue is resolved.<br>"
                    + "⚙️ Ensures smooth email communication without restrictions."
            },
            {
                cmd: `whmapi1 delete_zone domain=${domain}`,
                desc: "🚀 Deletes the DNS zone for a specific domain.<br>"
                    + "✅ Useful when removing a domain completely from the server.<br>"
                    + "⚠️ Be careful, as this will remove all DNS records."
            },
            {
                cmd: `whmapi1 set_resolver resolver1=8.8.8.8 resolver2=8.8.4.4`,
                desc: "🔧 Updates the server's DNS resolvers.<br>"
                    + "✅ Helps in resolving domains faster and fixing DNS lookup issues.<br>"
                    + "⚠️ Use trusted DNS providers like Google (8.8.8.8, 8.8.4.4)."
            },
            {
                cmd: `whmapi1 install_ssl hostname=${domain} ip=YOUR_SERVER_IP key='SSL_KEY' crt='SSL_CERT' ca='SSL_CA'`,
                desc: "🔒 Installs an SSL certificate for a domain.<br>"
                    + "✅ Required for HTTPS security and encrypted connections.<br>"
                    + "⚠️ Ensure the correct SSL key, certificate, and CA bundle are provided."
            },
            {
                cmd: `whmapi1 get_auto_ssl_log user=${domain}`,
                desc: "🔍 Retrieves the AutoSSL log for a cPanel account.<br>"
                    + "✅ Useful for debugging SSL installation issues.<br>"
                    + "⚙️ Helps diagnose certificate renewal failures."
            },
            {
                cmd: `whmapi1 restartservice service=apache`,
                desc: "⚙️ Restarts the Apache web server.<br>"
                    + "✅ Useful when applying configuration changes.<br>"
                    + "⚠️ A restart may cause temporary website downtime."
            },
            {
                cmd: `whmapi1 restartservice service=exim`,
                desc: "📬 Restarts the Exim mail service.<br>"
                    + "✅ Useful when fixing email delivery issues.<br>"
                    + "⚠️ Ensure all email queues are processed before restarting."
            },
            {
                cmd: `whmapi1 listaccts searchtype=owner search=${domain}`,
                desc: "👥 Lists all cPanel accounts owned by a reseller.<br>"
                    + "✅ Helps identify reseller accounts and their associated domains.<br>"
                    + "⚙️ Useful for reseller account management."
            },
            {
                cmd: `whmapi1 terminate_session session=${domain}`,
                desc: "🚫 Terminates an active WHM or cPanel session.<br>"
                    + "✅ Useful for force-logging out a user.<br>"
                    + "⚠️ Helps prevent unauthorized access."
            },
            {
                cmd: `whmapi1 create_user_session user=${domain} service=whm`,
                desc: "🔐 Creates a temporary WHM session for a user.<br>"
                    + "✅ Allows users to log in without needing a password.<br>"
                    + "⚙️ Useful for resellers or temporary access."
            },
            
                {
                    cmd: `whmapi1 configuresessiontimeout logouttime=7200`,
                    desc: "⏳ Increases WHM & cPanel session timeout (default is 1440 seconds).<br>"
                        + "✅ Helps prevent auto-logout issues for long sessions.<br>"
                        + "⚙️ Set to 7200 seconds (2 hours) for better accessibility."
                },
                {
                    cmd: `whmapi1 modifyacct user=${domain} MAXFTP=unlimited`,
                    desc: "🔄 Increases the maximum FTP accounts for a cPanel user.<br>"
                        + "✅ Useful when a user needs more FTP connections.<br>"
                        + "⚠️ Ensure this does not exceed server limits."
                },
                {
                    cmd: `whmapi1 get_session_expiry_time`,
                    desc: "🕒 Displays current session expiration settings.<br>"
                        + "✅ Helps debug automatic logout issues.<br>"
                        + "⚙️ Modify with `configuresessiontimeout` if needed."
                },
                {
                    cmd: `sls status`,
                    desc: "🛡️ Checks the status of the Server-Level Security (SLS) service.<br>"
                        + "✅ Useful for confirming whether security enforcement is active.<br>"
                        + "⚙️ Ensures WHM and cPanel security policies are functioning correctly."
                },
                {
                    cmd: `sls restart`,
                    desc: "🔄 Restarts the SLS security service.<br>"
                        + "✅ Helps resolve firewall issues, login failures, or security conflicts.<br>"
                        + "⚠️ Should be used after major security changes."
                },
                {
                    cmd: `sls logs`,
                    desc: "📜 Displays recent security logs from the SLS service.<br>"
                        + "✅ Useful for debugging firewall rules or unauthorized login attempts.<br>"
                        + "⚙️ Helps track suspicious activity."
                },
                {
                    cmd: `sls unblock ip=${domain}`,
                    desc: "🔓 Unblocks an IP address that was mistakenly blocked by SLS.<br>"
                        + "✅ Useful for restoring access to WHM, cPanel, or SSH.<br>"
                        + "⚠️ Verify the IP before unblocking for security reasons."
                },
                {
                    cmd: `sls whitelist ip=${domain}`,
                    desc: "⚪ Adds an IP to the whitelist, preventing security blocks.<br>"
                        + "✅ Use for trusted admin or developer IPs.<br>"
                        + "⚠️ Only whitelist known and secure IPs."
                },
                {
                    cmd: `sls ban ip=${domain}`,
                    desc: "🚫 Bans an IP from accessing the server due to security violations.<br>"
                        + "✅ Helps prevent brute-force attacks and unauthorized logins.<br>"
                        + "⚠️ Use this cautiously, as it completely blocks access."
                },
                {
                    cmd: `whmapi1 disable_password_authentication`,
                    desc: "🔐 Disables password-based login and forces SSH key authentication.<br>"
                        + "✅ Enhances server security by preventing brute-force attacks.<br>"
                        + "⚠️ Ensure SSH keys are set up before using this command."
                },
                {
                    cmd: `whmapi1 enable_password_authentication`,
                    desc: "🔑 Re-enables password-based authentication for WHM and SSH.<br>"
                        + "✅ Useful if you need temporary access via passwords.<br>"
                        + "⚠️ Less secure than SSH keys, so use only if necessary."
                },
                {
                    cmd: `whmapi1 update_license`,
                    desc: "📜 Refreshes the WHM/cPanel license if activation issues occur.<br>"
                        + "✅ Helps resolve 'License File Expired' errors.<br>"
                        + "⚙️ Usually needed after an IP change or reinstallation."
                },
                {
                    cmd: `whmapi1 validate_license`,
                    desc: "🛠️ Checks the validity of your WHM/cPanel license.<br>"
                        + "✅ Ensures that your license is active and valid.<br>"
                        + "⚠️ If invalid, contact cPanel support to renew."
                },
                {
                    cmd: `whmapi1 get_server_load`,
                    desc: "📊 Displays the current server load statistics.<br>"
                        + "✅ Helps diagnose performance issues.<br>"
                        + "⚙️ Useful for monitoring CPU usage and traffic spikes."
                },
                {
                    cmd: `whmapi1 kill_process pid=1234`,
                    desc: "💀 Terminates a running process on the server.<br>"
                        + "✅ Useful for stopping stuck or high-resource-consuming processes.<br>"
                        + "⚠️ Use with caution, as it forcefully stops the process."
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
