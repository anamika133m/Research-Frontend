// script.js
document.addEventListener("DOMContentLoaded", () => {
    const queryInput = document.getElementById("query");
    const searchButton = document.getElementById("searchButton");
    const resultsDiv = document.getElementById("results");

    searchButton.addEventListener("click", () => {
        const query = queryInput.value;

        if (query) {
            searchWikipedia(query);
        } else {
            alert("Please enter a research topic.");
        }
    });

    function searchWikipedia(query) {
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

        axios
            .get(apiUrl)
            .then((response) => {
                displayResults(response.data.query.search);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function displayResults(results) {
        resultsDiv.innerHTML = '';

        results.forEach((result) => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            const title = document.createElement('h3');
            title.textContent = result.title;

            const snippet = document.createElement('p');
            snippet.innerHTML = result.snippet;

            const readMoreButton = document.createElement('button');
            readMoreButton.classList.add('read-more-button');
            readMoreButton.innerHTML = 'Read More';

            readMoreButton.addEventListener('click', () => {
                window.open(`https://en.wikipedia.org/wiki/${result.title}`, '_blank');
            });

            resultItem.appendChild(title);
            resultItem.appendChild(snippet);
            resultItem.appendChild(readMoreButton); // Add the "Read More" button

            resultsDiv.appendChild(resultItem);
        });
    }
});
