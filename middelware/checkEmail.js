module.exports = (req, res, next) => {
    const validadteEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isRegexTrue = regex.test(String(email).toLowerCase());
        isRegexTrue ? next() : res.status(400).json({ message: "format email incorect" }); // Ternaire
    };
    validadteEmail(req.body.email);
};