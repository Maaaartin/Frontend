if (process.env.NODE_ENV === "development") {
    global.END_POINT = `http://${window.location.hostname}:80`;
}
else {
    global.END_POINT = `http://${window.location.hostname}:${window.location.port}`;
}