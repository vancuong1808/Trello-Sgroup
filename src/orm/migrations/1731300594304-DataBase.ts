import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1731300594304 implements MigrationInterface {
    name = 'DataBase1731300594304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`DROP INDEX \`IDX_65aaedd70b9d60594dddcc36b2\` ON \`role\``);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`Name\` \`roleName\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\` (\`roleName\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role\` DROP INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`roleName\` \`Name\` varchar(100) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_65aaedd70b9d60594dddcc36b2\` ON \`role\` (\`Name\`)`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
