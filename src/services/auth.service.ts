import { Result } from '../handlers/result.handler.ts';
import { conflictError, unauthorizedError, notFoundError } from "../handlers/errors/customError.ts";
import { genToken } from "../utils/jwtToken.util.ts";
import { hashPassword, comparePassword } from "../utils/auth.util.ts";
import { LoginBody, RegisterBody } from "../common/typings/custom.interface";
import { User } from '../orm/entities/user.entity.ts';
import UserRepository from '../repositories/user.repository.ts';

class AuthService {
    async register( body : RegisterBody ) : Promise<Result> {
        try {
            const { username, email, password } = body;
            const user = await UserRepository.findUserByUsername( username );
            if (user) {
                throw new conflictError("Username already exists");
            }
            const userEmail = await UserRepository.findUserByEmail( email );
            if (userEmail) {
                throw new conflictError("Email already exists");
            }
            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.password = await hashPassword(password);
            await UserRepository.addUser( newUser );
            return new Result(true, 201, "User created successfully");
        } catch (error : unknown) {
            throw error
        }
    }

    async login( body : LoginBody ) : Promise<Result> {
        try {
            const { email, password } = body;
            const user = await UserRepository.findUserByEmail( email );
            if (!user) {
                throw new notFoundError("Email not found");
            }
            const compare = await comparePassword(password, user.password);
            if (!compare) {
                throw new unauthorizedError("Password not match");
            }
            const token = genToken(`${user.id}`);
            return new Result(true, 200, "Login successfully", { token });
        } catch (error:unknown) {
            throw error;
        }
    }
}

export default new AuthService()