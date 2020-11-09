const app = require('./server');
const PORT = process.env.PORT || 8888;

const init = () => {
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
};

init();
