import bcrypt from 'bcrypt'


const encryptPass = async( { password, confirmPassword } ) => {

    if ( password != confirmPassword ) {
        throw new Error('Not the same password') 
    }

    const salt = await bcrypt.genSalt(11)

    const hashedPassword = await bcrypt.hash( password, salt )

    return hashedPassword


}

export {
    encryptPass,
}