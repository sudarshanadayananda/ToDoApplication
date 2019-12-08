import User from '../models/user.model';
import Config from '../helpers/config';
import BcryptService from '../services/bcrypt.service';

export default {

    async login(req, res) {

        const username = req.body.username;
        const password = req.body.password;
        try {
            const user = await User.findOne({email: username});

            if (!user) {
                return res.send({ status: Config.STATUS_CODE.NOT_FOUND, message: 'user is not found.' });
            }
            if (user) {
                // TODO: JWT/Passport authentication.
                BcryptService.compare(password, user.password)
                    .then((matched) => {

                        if (!matched) {
                            return res.send({ status: Config.STATUS_CODE.FAILED, message: 'password mismatch.' }); 
                        }
                        const resUser = {name: user.name, email: user.email };
                        return res.send({ status: Config.STATUS_CODE.SUCCESS, user: resUser }); 
                    })
                    .catch((error) => {

                        return res.status(500).send(error);
                    });
            }
        } catch (error) {

            return res.status(500).send(error);
        }
    },
}