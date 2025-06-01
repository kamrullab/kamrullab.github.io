async function showReadmeModal(repo) {
  const modal = document.getElementById("readme-modal");
  modal.classList.remove("hidden");
  modal.innerHTML = `<div class="modal-content"><p>Loading README...</p></div>`;

  try {
    let res = await fetch(`https://raw.githubusercontent.com/${repo}/main/README.md`);
    if (!res.ok) {
      res = await fetch(`https://raw.githubusercontent.com/${repo}/master/README.md`);
    }

    const md = await res.text();
    const short = md.split(" ").slice(0, 300).join(" ") + "...";

    modal.innerHTML = `
      <div class="modal-content">
        <button onclick="closeReadmeModal()" style="float:right;font-size:20px;">✖</button>
        <h2>${repo}</h2>
        <div class="readme-preview">${short}</div>
      </div>
    `;
  } catch {
    modal.innerHTML = `
      <div class="modal-content">
        <button onclick="closeReadmeModal()" style="float:right;font-size:20px;">✖</button>
        <p>README.md not found or invalid repo.</p>
      </div>
    `;
  }
}

function closeReadmeModal() {
  const modal = document.getElementById("readme-modal");
  modal.classList.add("hidden");
  modal.innerHTML = "";
}
