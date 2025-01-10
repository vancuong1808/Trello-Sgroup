import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1736493898553 implements MigrationInterface {
    name = 'DataBase1736493898553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`activity_log\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(100) NOT NULL, \`userId\` int NULL, \`boardId\` int NULL, \`workspaceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_d19abacc8a508c0429478ad166b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_38bc8944d74fa2ccf6d51b4ad55\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity_log\` ADD CONSTRAINT \`FK_47d924e74c588dfd1547b2eb964\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`work_space\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_47d924e74c588dfd1547b2eb964\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_38bc8944d74fa2ccf6d51b4ad55\``);
        await queryRunner.query(`ALTER TABLE \`activity_log\` DROP FOREIGN KEY \`FK_d19abacc8a508c0429478ad166b\``);
        await queryRunner.query(`DROP TABLE \`activity_log\``);
    }

}
