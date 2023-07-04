module.exports.respond = (res, output, statusCode) => {
    res.set('Content-Type', 'application/json');
    res.set('x-timestamp', Date.now());
    res.status(statusCode);
    res.send(output);
    return true;
}