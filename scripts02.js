const postcontainer = document.querySelector("#post-container")

var nextPostId = 1;

function loadPosts() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        var newParagraph = document.createElement("p");

        // Step 3: Add content to the paragraph
        let asJson = JSON.parse(this.responseText);
        newParagraph.textContent = asJson.title + " - " + asJson.body;

        postcontainer.appendChild(newParagraph);
        }
    };
    xhttp.open("GET", `https://jsonplaceholder.typicode.com/posts/${nextPostId}`, true);
    xhttp.send();
    nextPostId++;
}

for (let i = 0; i < 10; i++) {
    loadPosts();
}

let loadingPages = false;
window.addEventListener('scroll', function() {

    // Calculate how far the user has scrolled
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to the bottom of the page
    if (loadingPages == false && scrollTop + windowHeight >= documentHeight - 1) {
        loadingPages = true;
        // Trigger the function when scrolled to the end
        this.setTimeout(function() {
            loadPosts();
            loadingPages = false;
        }, 1000);
    }
});