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
        it(getTestName(testCase), async () => {
            await Promise.all(dataSources.map(async (dataSource) => {
                if (cantDoOffsetWithoutLimit(dataSource, testCase)) return;

                const repo = dataSource.getRepository(testCase.entity.entity);

                const baseRepoQueryBuilder = testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        repo.createQueryBuilder()
                    , dataSource.driver.options.type === "oracle")
                , dataSource.driver.options.type === "oracle")
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option);

                await baseRepoQueryBuilder.getOne();
                await baseRepoQueryBuilder.getRawOne();
                await baseRepoQueryBuilder.getMany();
                await baseRepoQueryBuilder.getRawMany();

                const commonOptions = {
                    where: testCase.where.option(testCase.entity.entity),
                    select: testCase.select.selectOption(testCase.entity.entity),
                    order: testCase.order.optionForRepo(testCase.entity.entity),
                }

                await repo.findOne(commonOptions);

                await repo.find({
                    ...commonOptions,
                    skip: testCase.offset.option,
                    take: testCase.limit.option,
                })

                if (!(dataSource.driver instanceof AbstractSqliteDriver)) {
                    const stream = await baseRepoQueryBuilder.stream()
                    if (!(dataSource.driver.options.type === "spanner"))
                        await new Promise((ok) => stream.once("readable", ok))
                    const data: any[] = []
                    stream.on("data", (row) => data.push(row))
                    await new Promise((ok) => stream.once("end", ok))
                }

                const baseQueryBuilderFrom = testCase.order.applyOption(testCase.entity.entity,
                    testCase.select.applySelectToQB(testCase.entity.entity,
                        dataSource.createQueryBuilder()
                    , dataSource.driver.options.type === "oracle")
                , dataSource.driver.options.type === "oracle")
                .from(testCase.entity.entity, testCase.entity.nameAlias)
                .where(testCase.where.option(testCase.entity.entity))
                .limit(testCase.limit.option)
                .offset(testCase.offset.option)
                
                await baseQueryBuilderFrom.getOne();
                await baseQueryBuilderFrom.getRawOne()
                await baseQueryBuilderFrom.getMany()
                await baseQueryBuilderFrom.getRawMany()

                if (!(dataSource.driver instanceof AbstractSqliteDriver)) {
                    const stream = await baseQueryBuilderFrom.stream()
                    if (!(dataSource.driver.options.type === "spanner"))
                        await new Promise((ok) => stream.once("readable", ok))
                    const data: any[] = []
                    stream.on("data", (row) => data.push(row))
                    await new Promise((ok) => stream.once("end", ok))
                }
            }));
        })
    })
})
