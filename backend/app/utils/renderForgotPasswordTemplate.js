const fs = require("fs");
const path = require("path");

const renderForgotPasswordTemplate = (resetLink) => {
  const filePath = path.join(__dirname, "templates", "forgot-password.html");
  let html = fs.readFileSync(filePath, "utf8");

  // Replace placeholder with real link
  html = html.replace(/__RESET_LINK__/g, resetLink);

  return html;
};

module.exports = renderForgotPasswordTemplate;
