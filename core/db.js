const mongoose= require("mongoose")
mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
    console.log('success');
    }).catch(err => {
    console.log("errorni ushlab oldimmmm"+err);
})
module.exports = {mongoose}
