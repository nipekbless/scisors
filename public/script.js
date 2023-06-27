
  const originalURLInput = document.getElementById('originalURLInput');
  const shortenButton = document.getElementById('shortenButton');
  const shortenedURLContainer = document.getElementById('shortenedURLContainer');

  shortenButton.addEventListener('click', () => {
    const originalURL = originalURLInput.value;
console.log(originalURL)
    // Create the request payload
    const payload = {
      originalURL: originalURL
    };
    // Make API call to shorten the URL
    fetch('http://localhost:2020/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Update the UI with the shortened URL
        const shortenedURL = data.shortURL;
        const linkElement = document.createElement('a');
        linkElement.href = shortenedURL;
        linkElement.textContent = shortenedURL;
        shortenedURLContainer.appendChild(linkElement);
      })
      .catch(error => {
        console.error(error);
      });
  });

