function authorize(req, res, next) {

    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "شما اجازه دسترسی به این بخش را ندارید" })
    }

    next();
}

module.exports = authorize;