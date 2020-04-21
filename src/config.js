if (process.env.NODE_ENV === "development") {
    global.END_POINT = `http://${window.location.hostname}:80/api`;
    global.FILE_UPLOAD = `http://${window.location.hostname}:80/fileupload`;
}
else {
    global.END_POINT = `http://${window.location.host}/api`;
    global.FILE_UPLOAD = `http://${window.location.host}/fileupload`;
}