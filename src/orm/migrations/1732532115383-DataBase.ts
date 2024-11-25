import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1732532115383 implements MigrationInterface {
    name = 'DataBase1732532115383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`reply_comment\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`reply_comment\` varchar(100) NULL`);
    }

}
