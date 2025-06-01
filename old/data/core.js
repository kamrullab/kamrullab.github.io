(async () => {
  const siteId =
    document.getElementById("site-id")?.dataset.id ||
    document.querySelector('meta[name="kamrul-site-id"]')?.content ||
    document.body?.dataset.embedId || "default";

  try {
    const res = await fetch("info.json");
    const allData = await res.json();
    const data = allData[siteId];
    if (!data) return;

    if (data.maintenance_mode) {
      document.body.innerHTML =
        '<div style="padding:30px;text-align:center;font-size:18px;">Profile temporarily unavailable. Please come back later.</div>';
      return;
    }

    if (data.custom_css) {
      const style = document.createElement("style");
      style.textContent = data.custom_css;
      document.head.appendChild(style);
    }

    if (data.meta_description) {
      const metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      metaDesc.content = data.meta_description;
      document.head.appendChild(metaDesc);
    }

    if (data.meta_keywords) {
      const metaKey = document.createElement("meta");
      metaKey.name = "keywords";
      metaKey.content = data.meta_keywords;
      document.head.appendChild(metaKey);
    }

    if (data.theme_mode === "dark") {
      document.body.classList.add("kamrul-dark");
    } else if (data.theme_mode === "light") {
      document.body.classList.add("kamrul-light");
    }

    if (data.external_script) {
      const s = document.createElement("script");
      s.src = data.external_script;
      document.head.appendChild(s);
    }

    if (data.logo && document.getElementById("logo")) {
      const link = data.logo_link || "https://kamrul.us";
      document.getElementById("logo").innerHTML = `<a href="${link}" target="_blank" rel="noopener">
        <img src="${data.logo}" alt="logo" class="logo-img">
      </a>`;
    }

    if (data.logo && document.getElementById("logos")) {
      document.getElementById("logos").innerHTML = `<img src="${data.logo}" alt="logo" class="logo-img">`;
    }

    if (data.name && document.getElementById("name")) {
      document.getElementById("name").textContent = data.name;
    }

    if (data.designation && document.getElementById("designation")) {
      document.getElementById("designation").textContent = data.designation;
    }

    if (data.quote && document.getElementById("quote")) {
      document.getElementById("quote").textContent = `“${data.quote}”`;
    }

    if (data.tagline && document.getElementById("tagline")) {
      document.getElementById("tagline").textContent = data.tagline;
    }

    if (data.phone && document.getElementById("phone")) {
      const p = document.getElementById("phone");
      p.textContent = data.phone;
      p.style.cursor = "pointer";
      p.title = "Click to copy";
      p.onclick = () => navigator.clipboard.writeText(data.phone);
    }

    if (data.email && document.getElementById("email")) {
      const e = document.getElementById("email");
      e.textContent = data.email;
      e.style.cursor = "pointer";
      e.title = "Click to copy";
      e.onclick = () => navigator.clipboard.writeText(data.email);
    }

    if (data.address && document.getElementById("address")) {
      const a = data.address;
      const out = `${a.village || ""}, ${a.post || ""}, ${a.upazila || ""}, ${a.district || ""}, ${a.country || ""}`;
      document.getElementById("address").textContent = out;
    }

    if (data.education && document.getElementById("education")) {
      const e = document.getElementById("education");
      Object.entries(data.education).forEach(([key, val]) => {
        e.innerHTML += `<div class="education"><b>${val.degree || val.name}</b><br>${val.institution || ""} (${val.passing_year || val.status})</div>`;
      });
    }

    if (data.projects && document.getElementById("projects")) {
      const p = document.getElementById("projects");
      data.projects.forEach((proj) => {
        p.innerHTML += `<div class="project"><b>${proj.title}</b><br>${proj.description}<br><a href="${proj.link}" target="_blank">🔗 View</a></div>`;
      });
    }

    if (data.skills && document.getElementById("skills")) {
      document.getElementById("skills").innerHTML = data.skills.join(" • ");
    }

    if (data.language_skills && document.getElementById("language_skills")) {
      document.getElementById("language_skills").innerHTML = data.language_skills.join(" | ");
    }

    if (data.experience_years && document.getElementById("experience_years")) {
      document.getElementById("experience_years").innerHTML =
        "🕒 Experience: " + data.experience_years;
    }

    if (data.working_hours && document.getElementById("working_hours")) {
      document.getElementById("working_hours").innerHTML =
        "🗓️ Available: " + data.working_hours;
    }

    if (document.getElementById("freelance_available")) {
      document.getElementById("freelance_available").innerHTML =
        data.freelance_available === true
          ? '<span style="color:green">✅ Available for Freelance</span>'
          : '<span style="color:red">❌ Not Taking Freelance</span>';
    }

    const socials = ["facebook", "github", "youtube", "linkedin", "telegram", "whatsapp"];
    socials.forEach((social) => {
      if (data.social?.[social] && document.getElementById(social)) {
        document.getElementById(social).innerHTML = `<a href="${data.social[social]}" target="_blank" rel="noopener">
          <img src="https://cdn.simpleicons.org/${social}" class="social-icon" />
        </a>`;
      }
    });

    if (document.getElementById("social-icons")) {
      const container = document.getElementById("social-icons");
      socials.forEach((social) => {
        if (data.social?.[social]) {
          container.innerHTML += `<a href="${data.social[social]}" target="_blank" rel="noopener">
            <img src="https://cdn.simpleicons.org/${social}" class="social-icon" />
          </a>`;
        }
      });
    }

    if (data.footer_note && document.getElementById("footer-note")) {
      let note = data.footer_note;
      const year = new Date().getFullYear();
      note = note.replace("{year}", year);
      if (note.includes("<logo>") && data.logo) {
        note = note.replace(
          "<logo>",
          `<img src="${data.logo}" alt="logo" style="height:20px;">`
        );
      }
      const linked = `<a href="${data.logo_link || "https://kamrul.us"}" target="_blank" rel="noopener">${note}</a>`;
      document.getElementById("footer-note").innerHTML = linked;
    }

    if (data.contact_button?.type && data.contact_button?.number) {
      const btn = document.createElement("a");
      btn.href =
        data.contact_button.type === "whatsapp"
          ? `https://wa.me/${data.contact_button.number.replace("+", "")}`
          : `https://m.me/${data.contact_button.number}`;
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.textContent = "Contact Me";
      btn.style.cssText =
        "position:fixed;bottom:20px;right:20px;background:#25D366;color:white;padding:10px 15px;border-radius:6px;text-decoration:none;font-size:14px;font-family:sans-serif;z-index:999;";
      document.body.appendChild(btn);
    }
  } catch (e) {
    console.error("Kamrul Embed Error:", e);
  }
})();
