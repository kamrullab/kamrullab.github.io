document.addEventListener("DOMContentLoaded", function() {
    fetchContent();
});

function fetchContent() {
    console.time('fetchContent');
    fetch('content.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            console.timeEnd('fetchContent');
        });
}
