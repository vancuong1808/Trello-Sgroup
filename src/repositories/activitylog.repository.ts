import { mysqlSource } from '../configs/data-source.config.ts';
import { ActivityLog } from '../orm/entities/activitylog.entity.ts';

class ActivityLogRepository {
    private readonly activityLogRepository = mysqlSource.getRepository(ActivityLog);

    async addActivityLog( activityLog : ActivityLog ): Promise<ActivityLog | null> {
        const newActivityLog = this.activityLogRepository.create( activityLog );
        await this.activityLogRepository.save( newActivityLog );
        return newActivityLog;
    }

    async getAllActivityLogs() : Promise<ActivityLog[] | null> {
        const activityLogs = await this.activityLogRepository.find({
            select : ["id", "description"],
            order : {
                id : "ASC"
            },
            relations : ["user", "workspace", "board"]
        });
        return activityLogs;
    }
}

export default new ActivityLogRepository();