import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStatusField1716609584227 implements MigrationInterface {
    name = 'UpdateStatusField1716609584227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "status" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "status" SET DEFAULT '0'`);
    }

}
