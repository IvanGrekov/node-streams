export const return500Err = (res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('Internal Server Error');
};

export const return404Err = (res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('No Such File');
};
