import jwt from 'jsonwebtoken';


const generatedJWT = ( uid, name ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name }

        console.log({uid, name});

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            
            if ( err ) {
                console.log( err );
                reject('No se pudo generar el token')
            }

            resolve( token )
        })

    })

}

export {
    generatedJWT
}