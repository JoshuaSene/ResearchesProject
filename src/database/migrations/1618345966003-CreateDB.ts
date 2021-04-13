import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1618377876601 implements MigrationInterface {
    name = 'CreateDB1618345966003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("tokenId" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "tokenStatus" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "expires" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_bb402e674ae9363a98e291ac2b7" PRIMARY KEY ("tokenId"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "email" character varying NOT NULL, "document" character varying NOT NULL, "contact_phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c1b20b2a1883ed106c3e746c25a" UNIQUE ("document"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "evaluationNote" integer NOT NULL, "comment" text NOT NULL, "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "brand_id" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "product" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_users_users" ("roleId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_3d373917ad1ae310d51ace06261" PRIMARY KEY ("roleId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_917cb4f8e289feb6e038f4e09d" ON "role_users_users" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b7b818cd42b91a06fd7abfd39" ON "role_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_24a47b318f20a5257395e928eaa" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users_users" ADD CONSTRAINT "FK_917cb4f8e289feb6e038f4e09d2" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_users_users" ADD CONSTRAINT "FK_1b7b818cd42b91a06fd7abfd394" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_users_users" DROP CONSTRAINT "FK_1b7b818cd42b91a06fd7abfd394"`);
        await queryRunner.query(`ALTER TABLE "role_users_users" DROP CONSTRAINT "FK_917cb4f8e289feb6e038f4e09d2"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_24a47b318f20a5257395e928eaa"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
        await queryRunner.query(`DROP INDEX "IDX_1b7b818cd42b91a06fd7abfd39"`);
        await queryRunner.query(`DROP INDEX "IDX_917cb4f8e289feb6e038f4e09d"`);
        await queryRunner.query(`DROP TABLE "role_users_users"`);
        await queryRunner.query(`DROP TABLE "brand"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
