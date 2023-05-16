const server = require('./api/server');
console.log("Hello World")
const PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// START YOUR SERVER HERE
