module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== "false",
    devtools: process.env.HEADLESS !== "false"
  }
};
