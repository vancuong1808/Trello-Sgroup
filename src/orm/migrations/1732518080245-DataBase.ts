import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1732518080245 implements MigrationInterface {
    name = 'DataBase1732518080245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`attachment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fileName\` varchar(255) NOT NULL, \`filePath\` varchar(255) NOT NULL, \`publicId\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`attachment\` ADD CONSTRAINT \`FK_247ba7dad7a94b9fa36295b4c77\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`attachment\` DROP FOREIGN KEY \`FK_247ba7dad7a94b9fa36295b4c77\``);
        await queryRunner.query(`DROP TABLE \`attachment\``);
    }

}
