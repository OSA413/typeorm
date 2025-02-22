import { Album, Artist, Customer, Employee, Genre, Invoice, InvoiceLine, MediaType, Playlist, PlaylistTrack, Track } from "../../chinook_database/entity/Entities"
import { CartesianProduct } from "../../helpers/product";

interface SelectTestDescription {
}

const select: SelectTestDescription[] = [
    { }
]

interface EntityTestDescription {
    entity: any;
    nameAlias: string,
    tableName: string,
}

const entities: EntityTestDescription[] = [
    { entity: Album, tableName: "album", nameAlias: "album" },
    { entity: Artist, tableName: "artist", nameAlias: "artist" },
    { entity: Customer, tableName: "customer", nameAlias: "customer" },
    { entity: Employee, tableName: "employee", nameAlias: "employee" },
    { entity: Genre, tableName: "genre", nameAlias: "genre" },
    { entity: Invoice, tableName: "invoice", nameAlias: "invoice" },
    { entity: InvoiceLine, tableName: "invoice_line", nameAlias: "invoice_line" },
    { entity: MediaType, tableName: "media_type", nameAlias: "media_type" },
    { entity: Playlist, tableName: "playlist", nameAlias: "playlist" },
    { entity: Track, tableName: "track", nameAlias: "track" },
    { entity: PlaylistTrack, tableName: "playlist_track", nameAlias: "playlist_track" },
]

const wheres = [
    ""
]

const orders = [
    ""
]

const limits = [
    ""
]

const offsets = [
    ""
]

export const generateTests = () => CartesianProduct.product(select, entities, wheres, orders, limits, offsets);
export const getTestName = (select: SelectTestDescription, entity: EntityTestDescription, where: string, order: string, limit: string, offset: string) =>
    `SELECT: ${entity.entity.name}`