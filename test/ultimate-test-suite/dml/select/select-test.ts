import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../../utils/test-utils"
import { DataSource } from "../../../../src/data-source/DataSource"
import { Album, Artist, Customer, Employee, Genre, Invoice, InvoiceLine, MediaType, Playlist, Track, PlaylistTrack } from "../../chinook_database/entity/Entities"
import { seedChinookDatabase } from "../../chinook_database/seed"
import { generateTests, getTestName } from "./generate-select-tests"
import { AbstractSqliteDriver } from "../../../../src/driver/sqlite-abstract/AbstractSqliteDriver"

describe("Ultimate Test Suite > DML", () => {
    let dataSources: DataSource[]
    before(async () => {
        dataSources = await createTestingConnections({
            schemaCreate: true,
            dropSchema: true,
            entities: [
                Album, Artist, Customer, Employee, Genre, Invoice, InvoiceLine, MediaType, Playlist, Track, PlaylistTrack
            ],
        });

        await Promise.all(dataSources.map(seedChinookDatabase))
    })
    after(() => closeTestingConnections(dataSources))

    generateTests().map(testCase => {
        describe(getTestName(...testCase), () => {
            it("query", () => Promise.all(dataSources.map(async (dataSource) => dataSource.query(`SELECT * FROM ${testCase[1].tableName}`))));
            it("repository qb getOne", () => Promise.all(dataSources.map(async (dataSource) => dataSource.getRepository(testCase[1].entity).createQueryBuilder().getOne())));
            it("repository qb getRawOne", () => Promise.all(dataSources.map(async (dataSource) => dataSource.getRepository(testCase[1].entity).createQueryBuilder().getRawOne())));
            it("repository qb getMany", () => Promise.all(dataSources.map(async (dataSource) => dataSource.getRepository(testCase[1].entity).createQueryBuilder().getMany())));
            it("repository qb getRawMany", () => Promise.all(dataSources.map(async (dataSource) => dataSource.getRepository(testCase[1].entity).createQueryBuilder().getRawMany())));
            it("repository findOne", () => Promise.all(dataSources.map(async (dataSource) => dataSource.getRepository(testCase[1].entity).findOne({where: {}}))));
            it("repository find", () => Promise.all(dataSources.map(async (dataSource) => dataSource.getRepository(testCase[1].entity).find())));
            it("repository qb stream", () => Promise.all(dataSources.map(async (dataSource) => {
                if (!(dataSource.driver instanceof AbstractSqliteDriver))
                    return dataSource.getRepository(testCase[1].entity).createQueryBuilder().stream()
                return Promise.resolve("test skip")
            })));
            it("qb from getOne", () => Promise.all(dataSources.map(async (dataSource) => dataSource.createQueryBuilder().from(testCase[1].entity, testCase[1].nameAlias).getOne())));
            it("qb from getRawOne", () => Promise.all(dataSources.map(async (dataSource) => dataSource.createQueryBuilder().from(testCase[1].entity, testCase[1].nameAlias).getRawOne())));
            it("qb from getMany", () => Promise.all(dataSources.map(async (dataSource) => dataSource.createQueryBuilder().from(testCase[1].entity, testCase[1].nameAlias).getMany())));
            it("qb from getRawMany", () => Promise.all(dataSources.map(async (dataSource) => dataSource.createQueryBuilder().from(testCase[1].entity, testCase[1].nameAlias).getRawMany())));
            it("qb from stream", () => Promise.all(dataSources.map(async (dataSource) => {
                if (!(dataSource.driver instanceof AbstractSqliteDriver))
                    return dataSource.createQueryBuilder().from(testCase[1].entity, testCase[1].nameAlias).stream()
                return Promise.resolve("test skip")
            })));
        })
    })
})
