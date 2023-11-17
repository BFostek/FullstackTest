import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1700252747234 implements MigrationInterface {
    name = 'InitialMigration1700252747234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weather_condition" ("id" SERIAL NOT NULL, "conditionId" integer NOT NULL, "main" character varying NOT NULL, "description" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_d5b3435df5e5392586b1a8e71e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weather_forecast" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "timestamp" TIMESTAMP NOT NULL, "temperature" numeric NOT NULL, "feelsLike" numeric NOT NULL, "minTemperature" numeric NOT NULL, "maxTemperature" numeric NOT NULL, "pressure" integer NOT NULL, "humidity" integer NOT NULL, "cityId" integer, "weatherConditionId" integer, CONSTRAINT "PK_6c1de5beacff6a3b56bd7abeb5d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weather_forecast" ADD CONSTRAINT "FK_fd4a895dbb1945a87b929d81763" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weather_forecast" ADD CONSTRAINT "FK_676f98296e0b4542be42fe9eb36" FOREIGN KEY ("weatherConditionId") REFERENCES "weather_condition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather_forecast" DROP CONSTRAINT "FK_676f98296e0b4542be42fe9eb36"`);
        await queryRunner.query(`ALTER TABLE "weather_forecast" DROP CONSTRAINT "FK_fd4a895dbb1945a87b929d81763"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "weather_forecast"`);
        await queryRunner.query(`DROP TABLE "weather_condition"`);
    }

}
