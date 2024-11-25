import { mysqlSource } from '../configs/data-source.config.ts';
import { UserBoard } from '../orm/entities/userboard.entity';

class UserBoardRepository {
    private readonly userBoardRepository = mysqlSource.getRepository(UserBoard);

    async getAllMembers( ): Promise<UserBoard[] | null> {
        const members = await this.userBoardRepository.find({
            select : {
                user : {    
                    id : true,
                    username : true,
                    email : true,
                    createdAt : true,
                },
                role : {
                    id : true,
                    roleName : true,
                },
                board : {
                    id : true,
                    boardName : true,
                }
            },
            relations : ["user", "role", "board"]
        });
        return members;
    }

    async getMemberById( boardId : number, memberId : number ): Promise<UserBoard | null> {
        const member = await this.userBoardRepository.findOne({
            select : {
                user : {    
                    id : true,
                    username : true,
                    email : true,
                    createdAt : true,
                },
                role : {
                    id : true,
                    roleName : true,
                }
            },
            where : {
                user : {
                    id : memberId
                },
                board : {
                    id : boardId
                }
            },
            relations : ["user", "role", "board"]
        });
        return member;
    }

    async addMemberToBoard( userBoard : UserBoard ): Promise<UserBoard | null> {
        const newUserBoard = this.userBoardRepository.create( userBoard );
        await this.userBoardRepository.save( newUserBoard );
        return newUserBoard;
    }

    async removeMemberFromBoard( id : number ): Promise<void> {
        await this.userBoardRepository.delete( id );
    }

    async changeUserRole( id : number, userBoard : UserBoard ): Promise<void> {
        await this.userBoardRepository.update( id, userBoard );
    }
}

export default new UserBoardRepository();
