import { FindOneOptions, ObjectLiteral, SelectQueryBuilder } from "../../../../src";
import { Album, Artist, Customer, Employee, Genre, Invoice, InvoiceLine, MediaType, Playlist, PlaylistTrack, Track } from "../../chinook_database/entity/Entities"
import { CartesianProduct } from "../../helpers/product";

/**
 * TODOs:
 * Make shuffle of columns in select
 */

interface SelectTestDescription {
    title: string,
    // We need three different options because we have three different interfaces
    selectOption: (entity: any) => FindOneOptions<ObjectLiteral>["select"],
    applySelectToQB: (entity: any, qb: SelectQueryBuilder<ObjectLiteral>) => SelectQueryBuilder<ObjectLiteral>
    sqlSelectCondition: (entity: any) => string,
}

const select: SelectTestDescription[] = [
    { 
        title: "all columns implicitly",
        selectOption: () => undefined,
        sqlSelectCondition: () => "*",
        applySelectToQB: (entity, qb) => qb,
    },
    {
        title: "1 column",
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
                return "album_id"
            } else if (entity.name === Artist.name) {
                return "artist_id"
            } else if (entity.name === Customer.name) {
                return "customer_id"
            } else if (entity.name === Employee.name) {
                return "employee_id"
            } else if (entity.name === Genre.name) {
                return "genre_id"
            } else if (entity.name === Invoice.name) {
                return "invoice_id"
            } else if (entity.name === InvoiceLine.name) {
                return "invoice_line_id"
            } else if (entity.name === MediaType.name) {
                return "media_type_id"
            } else if (entity.name === Playlist.name) {
                return "playlist_id"
            } else if (entity.name === Track.name) {
                return "track_id"
            } else if (entity.name === PlaylistTrack.name) {
                return "id";
            }
            throw new Error("Unsupported entity");
        },
        applySelectToQB: (entity, qb) => {
            if (entity.name === Album.name) {
                return qb.select("album_id")
            } else if (entity.name === Artist.name) {
                return qb.select("artist_id")
            } else if (entity.name === Customer.name) {
                return qb.select("customer_id")
            } else if (entity.name === Employee.name) {
                return qb.select("employee_id")
            } else if (entity.name === Genre.name) {
                return qb.select("genre_id")
            } else if (entity.name === Invoice.name) {
                return qb.select("invoice_id")
            } else if (entity.name === InvoiceLine.name) {
                return qb.select("invoice_line_id")
            } else if (entity.name === MediaType.name) {
                return qb.select("media_type_id")
            } else if (entity.name === Playlist.name) {
                return qb.select("playlist_id")
            } else if (entity.name === Track.name) {
                return qb.select("track_id")
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select("id");
            }
            throw new Error("Unsupported entity");
        }
    },
    {
        title: "2 columns",
        selectOption: (entity) => {
            if (entity.name === Album.name) {
                return {albumId: true, title: true} satisfies FindOneOptions<Album>["select"];
            } else if (entity.name === Artist.name) {
                return {artistId: true, name: true} satisfies FindOneOptions<Artist>["select"];
            } else if (entity.name === Customer.name) {
                return {customerId: true, address: true} satisfies FindOneOptions<Customer>["select"];
            } else if (entity.name === Employee.name) {
                return {employeeId: true, phone: true} satisfies FindOneOptions<Employee>["select"];
            } else if (entity.name === Genre.name) {
                return {genreId: true, name: true} satisfies FindOneOptions<Genre>["select"];
            } else if (entity.name === Invoice.name) {
                return {invoiceId: true, invoiceDate: true} satisfies FindOneOptions<Invoice>["select"];
            } else if (entity.name === InvoiceLine.name) {
                return {invoiceLineId: true, quantity: true} satisfies FindOneOptions<InvoiceLine>["select"];
            } else if (entity.name === MediaType.name) {
                return {mediaTypeId: true, name: true} satisfies FindOneOptions<MediaType>["select"];
            } else if (entity.name === Playlist.name) {
                return {playlistId: true, name: true} satisfies FindOneOptions<Playlist>["select"];
            } else if (entity.name === Track.name) {
                return {trackId: true, milliseconds: true} satisfies FindOneOptions<Track>["select"];
            } else if (entity.name === PlaylistTrack.name) {
                return {id: true, playlist: {playlistId: true}} satisfies FindOneOptions<PlaylistTrack>["select"];
            }
            throw new Error("Unsupported entity");
        },
        sqlSelectCondition: (entity) => {
            if (entity.name === Album.name) {
                return "album_id, title"
            } else if (entity.name === Artist.name) {
                return "artist_id, name"
            } else if (entity.name === Customer.name) {
                return "customer_id, address"
            } else if (entity.name === Employee.name) {
                return "employee_id, phone"
            } else if (entity.name === Genre.name) {
                return "genre_id, name"
            } else if (entity.name === Invoice.name) {
                return "invoice_id, invoice_date"
            } else if (entity.name === InvoiceLine.name) {
                return "invoice_line_id, quantity"
            } else if (entity.name === MediaType.name) {
                return "media_type_id, name"
            } else if (entity.name === Playlist.name) {
                return "playlist_id, name"
            } else if (entity.name === Track.name) {
                return "track_id, milliseconds"
            } else if (entity.name === PlaylistTrack.name) {
                return "id";
            }
            throw new Error("Unsupported entity");
        },
        applySelectToQB: (entity, qb) => {
            if (entity.name === Album.name) {
                return qb.select(["album_id", "title"])
            } else if (entity.name === Artist.name) {
                return qb.select(["artist_id", "name"])
            } else if (entity.name === Customer.name) {
                return qb.select(["customer_id", "address"])
            } else if (entity.name === Employee.name) {
                return qb.select(["employee_id", "phone"])
            } else if (entity.name === Genre.name) {
                return qb.select(["genre_id", "name"])
            } else if (entity.name === Invoice.name) {
                return qb.select(["invoice_id", "invoice_date"])
            } else if (entity.name === InvoiceLine.name) {
                return qb.select(["invoice_line_id", "quantity"])
            } else if (entity.name === MediaType.name) {
                return qb.select(["media_type_id", "name"])
            } else if (entity.name === Playlist.name) {
                return qb.select(["playlist_id", "name"])
            } else if (entity.name === Track.name) {
                return qb.select(["track_id", "milliseconds"])
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select(["id"]);
            }
            throw new Error("Unsupported entity");
        }
    },
    {
        title: "4 columns",
        selectOption: (entity) => {
            if (entity.name === Album.name) {
                return {albumId: true, title: true} satisfies FindOneOptions<Album>["select"];
            } else if (entity.name === Artist.name) {
                return {artistId: true, name: true} satisfies FindOneOptions<Artist>["select"];
            } else if (entity.name === Customer.name) {
                return {customerId: true, address: true, city: true, firstName: true} satisfies FindOneOptions<Customer>["select"];
            } else if (entity.name === Employee.name) {
                return {employeeId: true, phone: true, address: true, postalCode: true} satisfies FindOneOptions<Employee>["select"];
            } else if (entity.name === Genre.name) {
                return {genreId: true, name: true} satisfies FindOneOptions<Genre>["select"];
            } else if (entity.name === Invoice.name) {
                return {invoiceId: true, invoiceDate: true, billingCoutry: true, billingState: true} satisfies FindOneOptions<Invoice>["select"];
            } else if (entity.name === InvoiceLine.name) {
                return {invoiceLineId: true, quantity: true, unitPrice: true} satisfies FindOneOptions<InvoiceLine>["select"];
            } else if (entity.name === MediaType.name) {
                return {mediaTypeId: true, name: true} satisfies FindOneOptions<MediaType>["select"];
            } else if (entity.name === Playlist.name) {
                return {playlistId: true, name: true, tracks: true} satisfies FindOneOptions<Playlist>["select"];
            } else if (entity.name === Track.name) {
                return {trackId: true, milliseconds: true, composer: true, bytes: true} satisfies FindOneOptions<Track>["select"];
            } else if (entity.name === PlaylistTrack.name) {
                return {id: true} satisfies FindOneOptions<PlaylistTrack>["select"];
            }
            throw new Error("Unsupported entity");
        },
        sqlSelectCondition: (entity) => {
            if (entity.name === Album.name) {
                return "album_id, title"
            } else if (entity.name === Artist.name) {
                return "artist_id, name"
            } else if (entity.name === Customer.name) {
                return "customer_id, address, city, first_name"
            } else if (entity.name === Employee.name) {
                return "employee_id, phone, address, postal_code"
            } else if (entity.name === Genre.name) {
                return "genre_id, name"
            } else if (entity.name === Invoice.name) {
                return "invoice_id, invoice_date, billing_country, billing_state"
            } else if (entity.name === InvoiceLine.name) {
                return "invoice_line_id, quantity, unit_price"
            } else if (entity.name === MediaType.name) {
                return "media_type_id, name"
            } else if (entity.name === Playlist.name) {
                return "playlist_id, name"
            } else if (entity.name === Track.name) {
                return "track_id, milliseconds, composer, bytes"
            } else if (entity.name === PlaylistTrack.name) {
                return "id";
            }
            throw new Error("Unsupported entity");
        },
        applySelectToQB: (entity, qb) => {
            if (entity.name === Album.name) {
                return qb.select(["album_id", "title"])
            } else if (entity.name === Artist.name) {
                return qb.select(["artist_id", "name"])
            } else if (entity.name === Customer.name) {
                return qb.select(["customer_id", "address", "city", "first_name"])
            } else if (entity.name === Employee.name) {
                return qb.select(["employee_id", "phone", "address", "postal_code"])
            } else if (entity.name === Genre.name) {
                return qb.select(["genre_id", "name"])
            } else if (entity.name === Invoice.name) {
                return qb.select(["invoice_id", "invoice_date", "billing_country", "billing_state"])
            } else if (entity.name === InvoiceLine.name) {
                return qb.select(["invoice_line_id", "quantity", "unit_price"])
            } else if (entity.name === MediaType.name) {
                return qb.select(["media_type_id", "name"])
            } else if (entity.name === Playlist.name) {
                return qb.select(["playlist_id", "name"])
            } else if (entity.name === Track.name) {
                return qb.select(["track_id", "milliseconds", "composer", "bytes"])
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select(["id"]);
            }
            throw new Error("Unsupported entity");
        }
    },
    {
        title: "all columns explicitly",
        selectOption: (entity) => {
            if (entity.name === Album.name) {
                return {albumId: true, title: true} satisfies FindOneOptions<Album>["select"];
            } else if (entity.name === Artist.name) {
                return {artistId: true, name: true} satisfies FindOneOptions<Artist>["select"];
            } else if (entity.name === Customer.name) {
                return {customerId: true, address: true, city: true, firstName: true, company: true, country: true, email: true, fax: true, lastName: true, phone: true, postalCode: true, state: true} satisfies FindOneOptions<Customer>["select"];
            } else if (entity.name === Employee.name) {
                return {employeeId: true, phone: true, address: true, postalCode: true, birthDate: true, city: true, coutry: true, email: true, fax: true, firstName: true, hireDate: true, lastName: true, state: true, title: true} satisfies FindOneOptions<Employee>["select"];
            } else if (entity.name === Genre.name) {
                return {genreId: true, name: true} satisfies FindOneOptions<Genre>["select"];
            } else if (entity.name === Invoice.name) {
                return {invoiceId: true, invoiceDate: true, billingCoutry: true, billingState: true, billingAddress: true, billingCity: true, billingPostalCode: true, total: true} satisfies FindOneOptions<Invoice>["select"];
            } else if (entity.name === InvoiceLine.name) {
                return {invoiceLineId: true, quantity: true, unitPrice: true} satisfies FindOneOptions<InvoiceLine>["select"];
            } else if (entity.name === MediaType.name) {
                return {mediaTypeId: true, name: true} satisfies FindOneOptions<MediaType>["select"];
            } else if (entity.name === Playlist.name) {
                return {playlistId: true, name: true} satisfies FindOneOptions<Playlist>["select"];
            } else if (entity.name === Track.name) {
                return {trackId: true, milliseconds: true, composer: true, bytes: true, name: true, unitPrice: true} satisfies FindOneOptions<Track>["select"];
            } else if (entity.name === PlaylistTrack.name) {
                return {id: true} satisfies FindOneOptions<PlaylistTrack>["select"];
            }
            throw new Error("Unsupported entity");
        },
        sqlSelectCondition: (entity) => {
            if (entity.name === Album.name) {
                return "album_id, title"
            } else if (entity.name === Artist.name) {
                return "artist_id, name"
            } else if (entity.name === Customer.name) {
                return "customer_id, address, city, first_name, company, country, email, fax, last_name, phone, postal_code, state"
            } else if (entity.name === Employee.name) {
                return "employee_id, phone, address, postal_code, birth_date, city, coutry, email, fax, first_name, hire_date, last_name, state, title"
            } else if (entity.name === Genre.name) {
                return "genre_id, name"
            } else if (entity.name === Invoice.name) {
                return "invoice_id, invoice_date, billing_country, billing_state, billing_address, billing_city, billing_postal_code, total"
            } else if (entity.name === InvoiceLine.name) {
                return "invoice_line_id, quantity, unit_price"
            } else if (entity.name === MediaType.name) {
                return "media_type_id, name"
            } else if (entity.name === Playlist.name) {
                return "playlist_id, name"
            } else if (entity.name === Track.name) {
                return "track_id, milliseconds, composer, bytes, name, unit_price"
            } else if (entity.name === PlaylistTrack.name) {
                return "id";
            }
            throw new Error("Unsupported entity");
        },
        applySelectToQB: (entity, qb) => {
            if (entity.name === Album.name) {
                return qb.select(["album_id", "title"])
            } else if (entity.name === Artist.name) {
                return qb.select(["artist_id", "name"])
            } else if (entity.name === Customer.name) {
                return qb.select(["customer_id", "address", "city", "first_name", "company", "country", "email", "fax", "last_name", "phone", "postal_code", "state"])
            } else if (entity.name === Employee.name) {
                return qb.select(["employee_id", "phone", "address", "postal_code", "birth_date", "city", "coutry", "email", "fax", "first_name", "hire_date", "last_name", "state", "title"])
            } else if (entity.name === Genre.name) {
                return qb.select(["genre_id", "name"])
            } else if (entity.name === Invoice.name) {
                return qb.select(["invoice_id", "invoice_date", "billing_country", "billing_state", "billing_address", "billing_city", "billing_postal_code", "total"])
            } else if (entity.name === InvoiceLine.name) {
                return qb.select(["invoice_line_id", "quantity", "unit_price"])
            } else if (entity.name === MediaType.name) {
                return qb.select(["media_type_id", "name"])
            } else if (entity.name === Playlist.name) {
                return qb.select(["playlist_id", "name"])
            } else if (entity.name === Track.name) {
                return qb.select(["track_id", "milliseconds", "composer", "bytes", "name", "unit_price"])
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select(["id"]);
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
    `SELECT ${entity.entity.name} ${select.title}`