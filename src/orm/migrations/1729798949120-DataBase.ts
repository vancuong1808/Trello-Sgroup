import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1729798949120 implements MigrationInterface {
    name = 'DataBase1729798949120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` ADD UNIQUE INDEX \`IDX_240853a0c3353c25fb12434ad3\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP INDEX \`IDX_240853a0c3353c25fb12434ad3\``);
    }

}
