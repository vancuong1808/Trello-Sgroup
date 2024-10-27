import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1730037258453 implements MigrationInterface {
    name = 'DataBase1730037258453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_240853a0c3353c25fb12434ad3\` ON \`permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`name\` \`permissionName\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`name\` \`roleName\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD UNIQUE INDEX \`IDX_d89e1dadfa403bfefa4d49f7ec\` (\`permissionName\`)`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\` (\`roleName\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP INDEX \`IDX_d89e1dadfa403bfefa4d49f7ec\``);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`roleName\` \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`permissionName\` \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\` (\`name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_240853a0c3353c25fb12434ad3\` ON \`permission\` (\`name\`)`);
    }

}
