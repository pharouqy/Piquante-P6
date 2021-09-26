module.exports = (req, res, next) => {
    const validadteEmail = (email) => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isRegexTrue = regex.test(String(email).toLowerCase());
        isRegexTrue ?  next() : res.status(400).json({message : "format email incorect"});
    };
    validadteEmail(req.body.email);
};