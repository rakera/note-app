import { MigrationInterface, QueryRunner } from "typeorm";

export class Notes1717340052541 implements MigrationInterface {
    name = 'Notes1717340052541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" bigint NOT NULL, "text" character varying NOT NULL, "create_date" TIMESTAMP(0) NOT NULL DEFAULT now(), "update_date" TIMESTAMP(0) NOT NULL DEFAULT now(), "share_id" uuid, CONSTRAINT "UQ_30041dc98d0f4a5843d6d8072cd" UNIQUE ("share_id"), CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7"`);
        await queryRunner.query(`DROP TABLE "notes"`);
    }

}
