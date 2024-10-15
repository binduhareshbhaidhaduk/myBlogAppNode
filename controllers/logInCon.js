const logInForm = (req, res) => {
    res.render('logIn');
}

const logInCon = async (req, res) => {
    res.redirect('/')
};



module.exports = { logInCon, logInForm }