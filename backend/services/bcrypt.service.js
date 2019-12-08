import bcrypt from 'bcrypt';

export default {

    hash: (str, saltRounds) => {

        return new Promise((resolve, reject) => {

            bcrypt.hash(str, saltRounds, (err, hash) => {

                if (err)
                    return reject(err);
                resolve(hash);
            });
        })
       
    },
    compare: (painStr, hashStr) => {

        return new Promise((resolve, reject) => {
            
            bcrypt.compare(painStr, hashStr, (err, hash) => {

                if (err)
                    return reject(err);
                resolve(hash);
            });
        });
    }
}