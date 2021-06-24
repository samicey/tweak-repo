import bcrypt from 'bcryptjs';


export const hash = async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
};

export const compareHash = (requestPassword: string, userPassword: string): boolean=> {
        return bcrypt.compareSync(requestPassword, userPassword);
}