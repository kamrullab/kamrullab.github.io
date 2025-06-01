const year = new Date().getFullYear();
document.getElementById("site-footer").innerHTML = `
  <hr>
  <p>Made with <i class="fas fa-heart" style="color:red"></i> by <strong>Kamrul</strong></p>
  <div style="margin-top: 10px;">
    <a href="https://github.com/kamrullab" target="_blank"><i class="fab fa-github fa-lg"></i></a>
    <a href="https://facebook.com/elitekamrul" target="_blank"><i class="fab fa-facebook fa-lg"></i></a>
    <a href="https://linkedin.com/in/kamrulofficial" target="_blank"><i class="fab fa-linkedin fa-lg"></i></a>
  </div>
  <p style="margin-top: 8px;">&copy; ${year} Kamrul. All rights reserved.</p>
`;
