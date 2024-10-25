import { UserRoleBody } from './../common/typings/custom.interface.d';
import { User } from '../orm/entities/user.entity.ts';
import { Role } from '../orm/entities/role.entity.ts';
import { mysqlSource } from '../configs/data-source.config.ts';

class UserRepository {
    private readonly userRepository = mysqlSource.getRepository(User);

    async findUserById( userId : number ) : Promise<User | null> {
        const user = await this.userRepository.findOne({
            select : ["id", "email", "username"],
            where : {
                id : userId
            }
        });
        return user
    }

    async findUserByEmail( email : string ) : Promise<User | null> {
        const user = await this.userRepository.findOne({
            select : ["id", "email", "username", "password"],
            where : {
                email : email
            }
        });
        return user;
    }

    async findUserByUsername( username : string ) : Promise<User | null> {
        const user = await this.userRepository.findOne({
            select : ["id", "email", "username", "password"],
            where : {
                username : username
            }
        })
        return user;
    }

    async findAllUser() : Promise<User | null> {
        const users = await this.userRepository.find({
            select : ["id", "email", "username"]
        });
        return users[0];
    }

    async findUserRelateWithRole() : Promise<User | null> {
        const users = await this.userRepository.find({
            select : ["id"],
            relations : ["role"],
        });
        return users[0];
    }

    async addUser( user : User ) : Promise<User | null> {
        const newUser = this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async updatedUser( userId: number, userData : Partial<User> ) : Promise<void> {
        await this.userRepository.update( userId, userData );
    }

    async deleteUser( userId : number ) : Promise<void> {
        await this.userRepository.delete(userId);
    }

    async assignRoleToUser( user : User, role : Role ) : Promise<void> {
        user.roles.push(role);
        await this.userRepository.save( user );
    }

    async removeRoleFromUser( user : User, role : Role ) : Promise<void> {
        user.roles = user.roles.filter( ( element ) => element.id !== role.id );
        await this.userRepository.save( user );
    }
}

export default new UserRepository();