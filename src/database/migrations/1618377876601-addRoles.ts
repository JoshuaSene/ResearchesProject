import {MigrationInterface, QueryRunner} from "typeorm";

export class addRoles1618277876601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`insert into "role" (id, name) values ('4a8e2fbf-e68f-4f76-8108-26fa049c7530', 'employee')`);
         await queryRunner.query(`insert into "role" (id, name) values ('fc500750-4975-45f6-bde4-e3139fd1e591', 'client')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "role"`);
    }

}

