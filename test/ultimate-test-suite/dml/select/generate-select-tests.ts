import { FindOneOptions, ObjectLiteral, SelectQueryBuilder } from "../../../../src";
import { Album, Artist, Customer, Employee, Genre, Invoice, InvoiceLine, MediaType, Playlist, PlaylistTrack, Track } from "../../chinook_database/entity/Entities"
import { CartesianProduct } from "../../helpers/product";

interface SelectTestDescription {
    // We need three different options because we have three different interfaces
    selectOption: (entity: any) => FindOneOptions<ObjectLiteral>["select"],
    applySelectToQB: (entity: any, qb: SelectQueryBuilder<ObjectLiteral>) => SelectQueryBuilder<ObjectLiteral>
    sqlSelectCondition: (entity: any) => string,
}

const select: SelectTestDescription[] = [
    { 
        selectOption: () => undefined,
        sqlSelectCondition: () => "*",
        applySelectToQB: (entity, qb) => qb,
    },
    { 
        selectOption: (entity) => {
            if (entity.name === Album.name) {
                return {albumId: true} satisfies FindOneOptions<Album>["select"];
            } else if (entity.name === Artist.name) {
                return {artistId: true} satisfies FindOneOptions<Artist>["select"];
            } else if (entity.name === Customer.name) {
                return {customerId: true} satisfies FindOneOptions<Customer>["select"];
            } else if (entity.name === Employee.name) {
                return {employeeId: true} satisfies FindOneOptions<Employee>["select"];
            } else if (entity.name === Genre.name) {
                return {genreId: true} satisfies FindOneOptions<Genre>["select"];
            } else if (entity.name === Invoice.name) {
                return {invoiceId: true} satisfies FindOneOptions<Invoice>["select"];
            } else if (entity.name === InvoiceLine.name) {
                return {invoiceLineId: true} satisfies FindOneOptions<InvoiceLine>["select"];
            } else if (entity.name === MediaType.name) {
                return {mediaTypeId: true} satisfies FindOneOptions<MediaType>["select"];
            } else if (entity.name === Playlist.name) {
                return {playlistId: true} satisfies FindOneOptions<Playlist>["select"];
            } else if (entity.name === Track.name) {
                return {trackId: true} satisfies FindOneOptions<Track>["select"];
            } else if (entity.name === PlaylistTrack.name) {
                return {id: true} satisfies FindOneOptions<PlaylistTrack>["select"];
            }
            throw new Error("Unsupported entity");
        },
        sqlSelectCondition: (entity) => {
            if (entity.name === Album.name) {
                return "albumId"
            } else if (entity.name === Artist.name) {
                return "artistId"
            } else if (entity.name === Customer.name) {
                return "customerId"
            } else if (entity.name === Employee.name) {
                return "employeeId"
            } else if (entity.name === Genre.name) {
                return "genreId"
            } else if (entity.name === Invoice.name) {
                return "invoiceId"
            } else if (entity.name === InvoiceLine.name) {
                return "invoiceLineId"
            } else if (entity.name === MediaType.name) {
                return "mediaTypeId"
            } else if (entity.name === Playlist.name) {
                return "playlistId"
            } else if (entity.name === Track.name) {
                return "trackId"
            } else if (entity.name === PlaylistTrack.name) {
                return "id";
            }
            throw new Error("Unsupported entity");
        },
        applySelectToQB: (entity, qb) => {
            if (entity.name === Album.name) {
                return qb.select("albumId")
            } else if (entity.name === Artist.name) {
                return qb.select("artistId")
            } else if (entity.name === Customer.name) {
                return qb.select("customerId")
            } else if (entity.name === Employee.name) {
                return qb.select("employeeId")
            } else if (entity.name === Genre.name) {
                return qb.select("genreId")
            } else if (entity.name === Invoice.name) {
                return qb.select("invoiceId")
            } else if (entity.name === InvoiceLine.name) {
                return qb.select("invoiceLineId")
            } else if (entity.name === MediaType.name) {
                return qb.select("mediaTypeId")
            } else if (entity.name === Playlist.name) {
                return qb.select("playlistId")
            } else if (entity.name === Track.name) {
                return qb.select("trackId")
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select("id");
            }
            throw new Error("Unsupported entity");
        }
    },
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