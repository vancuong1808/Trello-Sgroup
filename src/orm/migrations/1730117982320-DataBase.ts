import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1730117982320 implements MigrationInterface {
    name = 'DataBase1730117982320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\` ON \`role\``);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`roleName\` \`Name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_65aaedd70b9d60594dddcc36b2\` (\`Name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP INDEX \`IDX_65aaedd70b9d60594dddcc36b2\``);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`Name\` \`roleName\` varchar(100) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\` ON \`role\` (\`roleName\`)`);
    }

}
