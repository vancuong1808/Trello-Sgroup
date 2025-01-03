import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1735926765765 implements MigrationInterface {
    name = 'DataBase1735926765765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_972838d477a2be7879a8cfda49a\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`workspaceId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`workspaceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`title\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_972838d477a2be7879a8cfda49a\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`work_space\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
