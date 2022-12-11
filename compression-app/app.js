const form = document.getElementById('compression-form');

form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new URLSearchParams(new FormData(form));

    fetch('http://localhost:3000/compress', {
        method: 'POST',
        headers: {
            'Content-Type': undefined,
        },
        body: JSON.stringify(data),
    });

    console.log(data);
});
