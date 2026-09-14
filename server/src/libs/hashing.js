import bcrypt from "bcryptjs"

export const hashPassword = async (Password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(Password, salt)
}