import {
    closeTestingConnections,
    createTestingConnections,
} from "../../../utils/test-utils"
import { DataSource } from "../../../../src/data-source/DataSource"
import { Album, Artist, Customer, Employee, Genre, Invoice, InvoiceLine, MediaType, Playlist, Track, PlaylistTrack } from "../../chinook_database/entity/Entities"
import { seedChinookDatabase } from "../../chinook_database/seed"
import { generateTests, getTestName } from "./generate-select-tests"
import { AbstractSqliteDriver } from "../../../../src/driver/sqlite-abstract/AbstractSqliteDriver"
import { DriverUtils } from "../../../../src/driver/DriverUtils"

// TODO: move this function to the main source code
const doesTheDBNotSupportOffsetWithoutLimit = (dataSource: DataSource) => {
    return (
        DriverUtils.isMySQLFamily(dataSource.driver) ||
        dataSource.driver.options.type === "aurora-mysql" ||
        dataSource.driver.options.type === "sap" ||
        dataSource.driver.options.type === "spanner"
    )
}

const cantDoOffsetWithoutLimit = (dataSource: DataSource, testCase: ReturnType<typeof generateTests>[number]) => {
    return doesTheDBNotSupportOffsetWithoutLimit(dataSource) && testCase.offset.option && !testCase.limit.option
}

describe("Ultimate Test Suite > DML > Select", () => {
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
            it("repository qb getOne", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                return await testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                    )
                )
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                .getOne()
            })));

            it("repository qb getRawOne", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                    )
                )
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                .getRawOne()
            })));

            it("repository qb getMany", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                    )
                )
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                .getMany()
            })));

            it("repository qb getRawMany", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                    )
                )
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                .getRawMany()
            })));

            it("repository findOne", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                dataSource.getRepository(testCase.entity.entity).findOne({
                    where: testCase.where.option(testCase.entity.entity),
                    select: testCase.select.selectOption(testCase.entity.entity),
                    order: testCase.order.optionForRepo(testCase.entity.entity),
                })
            })));
            
            it("repository find", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                dataSource.getRepository(testCase.entity.entity).find({
                    where: testCase.where.option(testCase.entity.entity),
                    select: testCase.select.selectOption(testCase.entity.entity),
                    order: testCase.order.optionForRepo(testCase.entity.entity),
                    skip: testCase.offset.option,
                    take: testCase.limit.option,
                })
            })));
            
            it("repository qb stream", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                if (!(dataSource.driver instanceof AbstractSqliteDriver)) {
                    const stream = await testCase.order.applyOption(testCase.entity.entity,
                        testCase.select.applySelectToQB(testCase.entity.entity,
                            dataSource.getRepository(testCase.entity.entity).createQueryBuilder()
                        )
                    )
                    .where(testCase.where.option(testCase.entity.entity))
                    .limit(testCase.limit.option)
                    .offset(testCase.offset.option)
                    .stream()
                    if (!(dataSource.driver.options.type === "spanner"))
                        await new Promise((ok) => stream.once("readable", ok))
                    const data: any[] = []
                    stream.on("data", (row) => data.push(row))
                    await new Promise((ok) => stream.once("end", ok))
                }
            })));
            
            it("qb from getOne", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.createQueryBuilder()
                    )
                ).from(testCase.entity.entity, testCase.entity.nameAlias)
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                .getOne()
            })));

            it("qb from getRawOne", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.createQueryBuilder()
                    )
                ).from(testCase.entity.entity, testCase.entity.nameAlias)
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                .getRawOne()
            })));

            it("qb from getMany", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.createQueryBuilder()
                    )
                ).from(testCase.entity.entity, testCase.entity.nameAlias)
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                .getMany()
            })));

            it("qb from getRawMany", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.createQueryBuilder()
                    )
                ).from(testCase.entity.entity, testCase.entity.nameAlias)
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                .getRawMany()
            })));

            it("qb from stream", () => Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;
                if (!(dataSource.driver instanceof AbstractSqliteDriver)) {
                    const stream = await testCase.order.applyOption(testCase.entity.entity,
                        testCase.select.applySelectToQB(testCase.entity.entity,
                            dataSource.createQueryBuilder()
                        )
                    ).from(testCase.entity.entity, testCase.entity.nameAlias)
                    .where(testCase.where.option(testCase.entity.entity))
                    .limit(testCase.limit.option)
                    .offset(testCase.offset.option)
                    .stream()
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
