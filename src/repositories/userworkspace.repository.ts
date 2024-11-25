import { mysqlSource } from '../configs/data-source.config.ts';
import { UserWorkSpace } from '../orm/entities/userworkspace.entity';

class UserWorkspaceRepository {
    private readonly userWorkspaceRepository = mysqlSource.getRepository(UserWorkSpace);

    async getAllMembers(): Promise<UserWorkSpace[] | null> {
        const members = await this.userWorkspaceRepository.find({
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
                workspace : {
                    id : true,
                    workspaceName : true,
                }
            },
            relations : ["user", "role", "workspace"]
        });
        return members;
    }

    async getMemberById( workspaceId : number, memberId : number ): Promise<UserWorkSpace | null> {
        const member = await this.userWorkspaceRepository.findOne({
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
                workspace : {
                    id : true,
                    workspaceName : true,
                }
            },
            where : {
                user : {
                    id : memberId
                },
                workspace : {
                    id : workspaceId
                }
            },
            relations : ["user", "role", "workspace"]
        });
        return member;
    }

    async addMemberToWorkspace( userWorkSpace : UserWorkSpace ): Promise<UserWorkSpace | null> {
        const newUserWorkspace = this.userWorkspaceRepository.create( userWorkSpace );
        await this.userWorkspaceRepository.save( newUserWorkspace );
        return newUserWorkspace;
    }

    async removeMemberFromWorkspace( id : number ): Promise<void> {
        await this.userWorkspaceRepository.delete( id );
    }

    async changeUserRole( id : number, userWorkSpace : UserWorkSpace  ): Promise<void> {
        await this.userWorkspaceRepository.update( id, userWorkSpace );
    }
}

export default new UserWorkspaceRepository();
