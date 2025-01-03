import { Notification } from './../orm/entities/notification.entity';
import { mysqlSource } from '../configs/data-source.config.ts';

class NotificationRepository {
    private readonly notificationRepository = mysqlSource.getRepository(Notification);

    async addNotification( notification : Notification ): Promise<Notification | null> {
        const newNotification = this.notificationRepository.create( notification );
        await this.notificationRepository.save( newNotification );
        return newNotification;
    }

    async getNotificationById( notificationId : number ): Promise<Notification | null> {
        const notification = await this.notificationRepository.findOne({
            select : ["id", "description", "createdAt", "updatedAt"],
            where : {
                id : notificationId
            }
        });
        return notification;
    }

    async getNotifications(): Promise<Notification[]> {
        const notifications = await this.notificationRepository.find({
            select : ["id", "description", "createdAt", "updatedAt"]
        });
        return notifications;
    }

    async deleteNotification( notificationId : number ): Promise<void> {
        await this.notificationRepository.delete( notificationId );
    }

    async updateNotification( notificationId : number, notification : Partial<Notification> ): Promise<void> {
        await this.notificationRepository.update( notificationId, notification );
    }

}

export default new NotificationRepository();
