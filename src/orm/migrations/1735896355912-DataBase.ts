import { MigrationInterface, QueryRunner } from "typeorm";

export class DataBase1735896355912 implements MigrationInterface {
    name = 'DataBase1735896355912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_cards\` (\`cardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_23aeb39a1d679e708ad11b757e\` (\`cardId\`), INDEX \`IDX_a49af5ad9f2cc9ca8f59c71946\` (\`userId\`), PRIMARY KEY (\`cardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_cards\` ADD CONSTRAINT \`FK_23aeb39a1d679e708ad11b757ee\` FOREIGN KEY (\`cardId\`) REFERENCES \`card\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_cards\` ADD CONSTRAINT \`FK_a49af5ad9f2cc9ca8f59c719462\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_cards\` DROP FOREIGN KEY \`FK_a49af5ad9f2cc9ca8f59c719462\``);
        await queryRunner.query(`ALTER TABLE \`user_cards\` DROP FOREIGN KEY \`FK_23aeb39a1d679e708ad11b757ee\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`userId\``);
        await queryRunner.query(`DROP INDEX \`IDX_a49af5ad9f2cc9ca8f59c71946\` ON \`user_cards\``);
        await queryRunner.query(`DROP INDEX \`IDX_23aeb39a1d679e708ad11b757e\` ON \`user_cards\``);
        await queryRunner.query(`DROP TABLE \`user_cards\``);
    }

}
