import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1730117056522 implements MigrationInterface {
    name = 'DataBase1730117056522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`card\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cardName\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`listId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`listName\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board\` (\`id\` int NOT NULL AUTO_INCREMENT, \`boardName\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`workspaceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_space\` (\`id\` int NOT NULL AUTO_INCREMENT, \`workspaceName\` varchar(100) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_workspaces\` (\`workSpaceId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_3ff115cb67d41812265cdd3580\` (\`workSpaceId\`), INDEX \`IDX_a9eab88a60b4f0314575d26ae4\` (\`userId\`), PRIMARY KEY (\`workSpaceId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`card\` ADD CONSTRAINT \`FK_4267e15872bbabeb7d9c0448ca0\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_bbb2794eef8a900448a5f487eb5\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_394199497c0242b3270d03611bf\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`work_space\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_workspaces\` ADD CONSTRAINT \`FK_3ff115cb67d41812265cdd35805\` FOREIGN KEY (\`workSpaceId\`) REFERENCES \`work_space\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_workspaces\` ADD CONSTRAINT \`FK_a9eab88a60b4f0314575d26ae47\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_workspaces\` DROP FOREIGN KEY \`FK_a9eab88a60b4f0314575d26ae47\``);
        await queryRunner.query(`ALTER TABLE \`user_workspaces\` DROP FOREIGN KEY \`FK_3ff115cb67d41812265cdd35805\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_394199497c0242b3270d03611bf\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_bbb2794eef8a900448a5f487eb5\``);
        await queryRunner.query(`ALTER TABLE \`card\` DROP FOREIGN KEY \`FK_4267e15872bbabeb7d9c0448ca0\``);
        await queryRunner.query(`DROP INDEX \`IDX_a9eab88a60b4f0314575d26ae4\` ON \`user_workspaces\``);
        await queryRunner.query(`DROP INDEX \`IDX_3ff115cb67d41812265cdd3580\` ON \`user_workspaces\``);
        await queryRunner.query(`DROP TABLE \`user_workspaces\``);
        await queryRunner.query(`DROP TABLE \`work_space\``);
        await queryRunner.query(`DROP TABLE \`board\``);
        await queryRunner.query(`DROP TABLE \`list\``);
        await queryRunner.query(`DROP TABLE \`card\``);
    }

}
