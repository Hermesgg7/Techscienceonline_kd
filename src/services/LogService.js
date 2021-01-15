class LogService {
    log(error, info) {
        console.log(error.message, info);
    }
}

export default new LogService();
