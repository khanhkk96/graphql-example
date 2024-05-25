import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusField1716607855291 implements MigrationInterface {
    name = 'AddStatusField1716607855291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."categories_status_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "status" "public"."categories_status_enum" NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."categories_status_enum"`);
    }

}
