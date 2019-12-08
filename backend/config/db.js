import mongoose from 'mongoose';
import User from '../models/user.model'
import BcryptService from '../services/bcrypt.service';

mongoose.Promise = global.Promise;

export default {

    async connect() {

        mongoose.connect('mongodb://localhost/todoApplication', { useNewUrlParser: true });

        mongoose.connection.on('connected', () => {

            console.log('Connected to MongoDB Successfully.');
            this.generateFakeUser();
        });
        mongoose.connection.on('error', (error) => {

            console.error('Error in connecting MongoDB: ', error);
        });
    },
    //TODO: should remove. only demo purpose.
    async generateFakeUser() {

        const fakeUser = { email: 'user@123.com', name: 'Fake User' };
        const password = '1234';
        BcryptService.hash(password, 10).then((hashedPassword) => {

            fakeUser.password = hashedPassword;
            this.findOrCreate(fakeUser)
        }).catch((error) => console.error(error))
    },
    //TODO: should remove. only demo purpose.
    async findOrCreate(fakeUser) {
        try {
            const user = await User.findOne({ email: 'user@123.com' });

            if (!user) {

                const user = await User.create(fakeUser);

                if (user) {
                    console.log('User is created successfully.');
                }
            }
        } catch (error) {
            console.error('Error creating Fake User');
        }
    }
}