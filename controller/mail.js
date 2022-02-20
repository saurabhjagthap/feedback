const sendgrid = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
module.exports = (email, name, mobile, rating, date) => {
  // console.log(email, process.env.FROM_MAIL);
  // console.log("in mail", date);

  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.FROM_MAIL,
    from: process.env.FROM_MAIL,
    subject: "Rating ",
    text: `details of user who gave feedback
           Name:${name} 
           Email:${email} 
           Mobile no:${mobile} 
           Rating:${rating} 
           Date:${date}`,
  };
  sendgrid
    .send(msg)
    .then((resp) => {
      return;
      // console.log("Email sent");
    })
    .catch((error) => {
      // console.error(error);
      return error;
    });
};
