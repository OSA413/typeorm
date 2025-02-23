import {
    closeTestingConnections,
    createTestingConnections,
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
        describe(getTestName(testCase), () => {
            it("query", () => Promise.all(dataSources.map(async (dataSource) => dataSource.query(`SELECT ${testCase.select.sqlSelectCondition(testCase.entity.entity)} FROM ${dataSource.driver.options.type === "oracle" ? `"` : ""}${testCase.entity.tableName}${dataSource.driver.options.type === "oracle" ? `"` : ""}`))));
            
            it("repository qb getOne", () => Promise.all(dataSources.map(async (dataSource) =>
                testCase.select.applySelectToQB(testCase.entity.entity, 
                    dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                ).getOne())));

            it("repository qb getRawOne", () => Promise.all(dataSources.map(async (dataSource) =>
                testCase.select.applySelectToQB(testCase.entity.entity, 
                    dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                ).getRawOne())));

            it("repository qb getMany", () => Promise.all(dataSources.map(async (dataSource) =>
                testCase.select.applySelectToQB(testCase.entity.entity, 
                    dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                ).getMany())));

            it("repository qb getRawMany", () => Promise.all(dataSources.map(async (dataSource) =>
                testCase.select.applySelectToQB(testCase.entity.entity, 
                    dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                ).getRawMany())));

            it("repository findOne", () => Promise.all(dataSources.map(async (dataSource) =>
                dataSource.getRepository(testCase.entity.entity).findOne({where: {}, select: testCase.select.selectOption(testCase.entity.entity)}))));
            
            it("repository find", () => Promise.all(dataSources.map(async (dataSource) =>
                dataSource.getRepository(testCase.entity.entity).find({select: testCase.select.selectOption(testCase.entity.entity)}))));
            
            it("repository qb stream", () => Promise.all(dataSources.map(async (dataSource) => {
                if (!(dataSource.driver instanceof AbstractSqliteDriver)) {
                    const stream = await testCase.select.applySelectToQB(testCase.entity.entity, 
                        dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                    ).stream()
                    if (!(dataSource.driver.options.type === "spanner"))
                        await new Promise((ok) => stream.once("readable", ok))
                    const data: any[] = []
                    stream.on("data", (row) => data.push(row))
                    await new Promise((ok) => stream.once("end", ok))
                }
            })));
            
            it("qb from getOne", () => Promise.all(dataSources.map(async (dataSource) =>    
                testCase.select.applySelectToQB(testCase.entity.entity,
                    dataSource.createQueryBuilder()
                ).from(testCase.entity.entity, testCase.entity.nameAlias).getOne())));

            it("qb from getRawOne", () => Promise.all(dataSources.map(async (dataSource) =>
                testCase.select.applySelectToQB(testCase.entity.entity,
                    dataSource.createQueryBuilder()
                ).from(testCase.entity.entity, testCase.entity.nameAlias).getRawOne())));

            it("qb from getMany", () => Promise.all(dataSources.map(async (dataSource) =>
                testCase.select.applySelectToQB(testCase.entity.entity,
                    dataSource.createQueryBuilder()
                ).from(testCase.entity.entity, testCase.entity.nameAlias).getMany())));

            it("qb from getRawMany", () => Promise.all(dataSources.map(async (dataSource) =>
                testCase.select.applySelectToQB(testCase.entity.entity,
                    dataSource.createQueryBuilder()
                ).from(testCase.entity.entity, testCase.entity.nameAlias).getRawMany())));
                
            it("qb from stream", () => Promise.all(dataSources.map(async (dataSource) => {
                if (!(dataSource.driver instanceof AbstractSqliteDriver)) {
                    const stream = await testCase.select.applySelectToQB(testCase.entity.entity, 
                        dataSource.createQueryBuilder().from(testCase.entity.entity, testCase.entity.nameAlias)
                    ).stream()
                    if (!(dataSource.driver.options.type === "spanner"))
                        await new Promise((ok) => stream.once("readable", ok))
                    const data: any[] = []
                    stream.on("data", (row) => data.push(row))
                    await new Promise((ok) => stream.once("end", ok))
                }
            })));
        })
    })
})
