const mongoose = require('mongoose');
const User = mongoose.model('User');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ===PASSWORD RECOVER AND RESET

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user)
                return res.status(401).json({
                    message:
                        'The email address ' +
                        req.body.email +
                        ' is not associated with any account. Double-check your email address and try again.',
                });

            //Generate and set password reset token
            user.generatePasswordReset();

            // Save the updated user object
            user.save()
                .then((user) => {
                    // send email
                    let link = 'http://' + req.headers.host + '/reset-password/' + user.resetPasswordToken;
                    const mailOptions = {
                        to: user.email,
                        from: process.env.FROM_EMAIL,
                        subject: 'Password change request',
                        text: `Hi ${user.username}, \nPlease click on the following link ${link} to reset your password. \n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
                    };

                    sgMail.send(mailOptions, (error, result) => {
                        if (error) return res.status(500).json({ message: error.message });

                        res.status(200).json({ message: 'A reset email has been sent to ' + user.email + '.' });
                    });
                })
                .catch((err) => res.status(500).json({ message: err.message }));
        })
        .catch((err) => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }).then((user) => {
        if (!user) return res.status(401).json({ message: 'Password reset token is invalid or has expired.' });

        //Set the new password
        user.setPassword(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save
        user.save((err) => {
            if (err) return res.status(500).json({ message: err.message });

            // send email
            const mailOptions = {
                to: user.email,
                from: process.env.FROM_EMAIL,
                subject: 'Your password has been changed',
                text: `Hi ${user.username}, \nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
            };

            sgMail.send(mailOptions, (error, result) => {
                if (error) return res.status(500).json({ message: error.message });

                user.token = user.generateJWT();
                return res.json(user.toAuthJSON());
            });
        });
    });
};
