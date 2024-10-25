import { User } from '../orm/entities/user.entity.ts';
import { Role } from '../orm/entities/role.entity.ts';
import { mysqlSource } from '../configs/data-source.config.ts';
import { badRequestError } from "../handlers/errors/customError";

class UserRepository {
    private readonly userRepository = mysqlSource.getRepository(User);

    async findUserById( userId : number ) : Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                select : ["id", "email", "username"],
                where : {
                    id : userId
                }
            });
            return user
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async findUserByEmail( email : string ) : Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                select : ["id", "email", "username", "password"],
                where : {
                    email : email
                }
            });
            return user;
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async findUserByUsername( username : string ) : Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                select : ["id", "email", "username", "password"],
                where : {
                    username : username
                }
            });
            return user;
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async findAllUser() : Promise<User | null> {
        try {
            const users = await this.userRepository.find({
                select : ["id", "email", "username"]
            });
            return users[0];
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async findUserRelateWithRole() : Promise<User | null> {
        try {
            const users = await this.userRepository.find({
                select : ["id"],
                relations : ["roles"]
            });
            return users[0];
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async addUser( user : User ) : Promise<User | null> {
        try {
            const newUser = this.userRepository.create(user);
            await this.userRepository.save(newUser);
            return newUser;
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async updatedUser( userId: number, userData : Partial<User> ) : Promise<void> {
        try {
            await this.userRepository.update( userId, userData );
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async deleteUser( userId : number ) : Promise<void> {
        try {
            await this.userRepository.delete(userId);
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async assignRoleToUser( user : User, role : Role ) : Promise<void> {
        try {
            user.roles.push(role);
            await this.userRepository.save( user );
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }

    async removeRoleFromUser( user : User, role : Role ) : Promise<void> {
        try {
            user.roles = user.roles.filter((r) => r.id !== role.id);
            await this.userRepository.save( user );
        } catch (error : unknown) {
            throw new badRequestError(`UserRepository has error : ${ error }`);
        }
    }
}

export default new UserRepository();