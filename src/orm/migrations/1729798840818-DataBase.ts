import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1729798840818 implements MigrationInterface {
    name = 'DataBase1729798840818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`name\` varchar(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`name\` varchar(32) NOT NULL`);
    }

}
