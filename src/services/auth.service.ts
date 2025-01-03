import { Result } from '../handlers/result.handler.ts';
import { conflictError, unauthorizedError, notFoundError } from "../handlers/errors/customError.ts";
import { genToken } from "../utils/jwtToken.util.ts";
import { hashPassword, comparePassword } from "../utils/auth.util.ts";
import { LoginBody, RegisterBody } from "../common/typings/custom.interface";
import { User } from '../orm/entities/user.entity.ts';
import UserRepository from '../repositories/user.repository.ts';
import RoleRepository from '../repositories/role.repository.ts';

class AuthService {
    async register( body : RegisterBody ) : Promise<Result> {
        const { username, email, password } = body;
        const user = await UserRepository.getUserByUsername( username );
        if (user) {
            throw new conflictError("Username already exists");
        }
        const userEmail = await UserRepository.getUserByEmail( email );
        if (userEmail) {
            throw new conflictError("Email already exists");
        }
        const isExistedRole = await RoleRepository.getRoleByName("USER");
        if (!isExistedRole) {
            throw new notFoundError("Role not found");
        }
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = await hashPassword(password);
        await UserRepository.addUser( newUser );
        const checkUser = await UserRepository.getUserByEmail( email );
        if (!checkUser) {
            throw new notFoundError("User not found");
        }
        const isExistedRoleFromUser = await UserRepository.getUserRelateWithRole( checkUser.id );
        if (!isExistedRoleFromUser) {
            throw new notFoundError("Find user relate with role fail");
        }
        await UserRepository.assignRoleToUser( isExistedRoleFromUser, isExistedRole );
        return new Result(true, 201, "User created successfully");
    }

    async login( body : LoginBody ) : Promise<Result> {
        const { email, password } = body;
        const user = await UserRepository.getUserByEmail( email );
        if (!user) {
            throw new notFoundError("Email not found");
        }
        const compare = await comparePassword(password, user.password);
        if (!compare) {
            throw new unauthorizedError("Password not match");
        }
        const token = genToken(`${user.id}`);
        return new Result(true, 200, "Login successfully", { token });
    }
}

export default new AuthService()
