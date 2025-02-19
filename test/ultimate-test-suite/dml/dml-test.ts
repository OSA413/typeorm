import {
    closeTestingConnections,
    createTestingConnections,
    reloadTestingDatabases,
} from "../../utils/test-utils"
import { DataSource } from "../../../src/data-source/DataSource"
import { expect } from "chai"
import { Album, Artist, Customer, Employee, Genre, Invoice, InvoiceLine, MediaType, Playlist, Track } from "../chinook_database/entity/Entities"
import { seedChinookDatabase } from "../chinook_database/seed"

describe("Ultimate Test Suite > DML", () => {
    let dataSources: DataSource[]
    before(async () => {
        dataSources = await createTestingConnections({
            schemaCreate: true,
            dropSchema: true,
            entities: [
                Album, Artist, Customer, Employee, Genre, Invoice, InvoiceLine, MediaType, Playlist, Track
            ],
        });

        await Promise.all(dataSources.map(seedChinookDatabase))
    })
    beforeEach(() => reloadTestingDatabases(dataSources))
    after(() => closeTestingConnections(dataSources))

    it("should work", () =>
        Promise.all(
            dataSources.map(async (dataSource) => {
                expect(1).to.equal(1)
            }),
        ))
})
