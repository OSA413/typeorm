import { FindOneOptions, FindOptionsOrder, ILike, MoreThan, ObjectLiteral, SelectQueryBuilder } from "../../../../src";
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
}

const select: SelectTestDescription[] = [
    { 
        title: "all columns implicitly",
        selectOption: () => undefined,
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
            throw new Error(`Unsupported entity ${entity.name}`);
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
            throw new Error(`Unsupported entity ${entity.name}`);
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
            throw new Error(`Unsupported entity ${entity.name}`);
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
            throw new Error(`Unsupported entity ${entity.name}`);
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
            throw new Error(`Unsupported entity ${entity.name}`);
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
            throw new Error(`Unsupported entity ${entity.name}`);
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
            throw new Error(`Unsupported entity ${entity.name}`);
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
            throw new Error(`Unsupported entity ${entity.name}`);
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

interface WhereTestDescription {
    title: string,
    // We need three different options because we have three different interfaces
    option: (entity: any) => ObjectLiteral[],
}

const wheres: WhereTestDescription[] = [
    {
        title: "no where condition",
        option: (entity: any) => ({}) as any,
    },
    {
        title: "1 where condition",
        option: (entity) => {
            if (entity.name === Album.name) {
                return [{title: ILike("%a%")}] as Record<keyof Album, unknown>[]
            } else if (entity.name === Artist.name) {
                return [{name: ILike("%a%")}] as Record<keyof Artist, unknown>[]
            } else if (entity.name === Customer.name) {
                return [{country: ILike("%a%")}] as Record<keyof Customer, unknown>[]
            } else if (entity.name === Employee.name) {
                return [{email: ILike("%a%")}] as Record<keyof Employee, unknown>[]
            } else if (entity.name === Genre.name) {
                return [{name: ILike("%a%")}] as Record<keyof Genre, unknown>[]
            } else if (entity.name === Invoice.name) {
                return [{billingAddress: ILike("%a%")}] as Record<keyof Invoice, unknown>[]
            } else if (entity.name === InvoiceLine.name) {
                return [{unitPrice: MoreThan(0.5)}] as Record<keyof InvoiceLine, unknown>[]
            } else if (entity.name === MediaType.name) {
                return [{name: ILike("%a%")}] as Record<keyof MediaType, unknown>[]
            } else if (entity.name === Playlist.name) {
                return [{name: ILike("%a%")}] as Record<keyof Playlist, unknown>[]
            } else if (entity.name === Track.name) {
                return [{name: ILike("%a%")}] as Record<keyof Track, unknown>[]
            } else if (entity.name === PlaylistTrack.name) {
                return [{id: MoreThan(5000)}] as Record<keyof PlaylistTrack, unknown>[]
            }
            throw new Error(`Unsupported entity ${entity.name}`);
        }
    }
]

interface OrderTestDescription {
    title: string,
    // We need three different options because we have three different interfaces
    applyOption: (entity: any, qb: SelectQueryBuilder<ObjectLiteral>) => SelectQueryBuilder<ObjectLiteral>,
    optionForRepo: (entity: any) => FindOneOptions<ObjectLiteral>["order"],
}

const orders: OrderTestDescription[] = [
    {
        title: "no order condition",
        applyOption: (entity, qb) => qb,
        optionForRepo: () => undefined,
    },
    {
        title: "1 order condition",
        applyOption: (entity, qb) => {
            if (entity.name === Album.name) {
                return qb.orderBy("title", "ASC")
            } else if (entity.name === Artist.name) {
                return qb.orderBy("name", "ASC")
            } else if (entity.name === Customer.name) {
                return qb.orderBy("country", "ASC")
            } else if (entity.name === Employee.name) {
                return qb.orderBy("email", "ASC")
            } else if (entity.name === Genre.name) {
                return qb.orderBy("name", "ASC")
            } else if (entity.name === Invoice.name) {
                return qb.orderBy("billingAddress", "ASC")
            } else if (entity.name === InvoiceLine.name) {
                return qb.orderBy("unitPrice", "ASC")
            } else if (entity.name === MediaType.name) {
                return qb.orderBy("name", "ASC")
            } else if (entity.name === Playlist.name) {
                return qb.orderBy("name", "ASC")
            } else if (entity.name === Track.name) {
                return qb.orderBy("name", "ASC")
            } else if (entity.name === PlaylistTrack.name) {
                return qb.orderBy("id", "ASC")
            }
            throw new Error(`Unsupported entity ${entity.name}`);
        },
        optionForRepo: (entity) => {
            if (entity.name === Album.name) {
                return {title: "ASC"} as FindOptionsOrder<Album>;
            } else if (entity.name === Artist.name) {
                return {name: "ASC"} as FindOptionsOrder<Artist>
            } else if (entity.name === Customer.name) {
                return {country: "ASC"} as FindOptionsOrder<Customer>
            } else if (entity.name === Employee.name) {
                return {email: "ASC"} as FindOptionsOrder<Employee>
            } else if (entity.name === Genre.name) {
                return {name: "ASC"} as FindOptionsOrder<Genre>
            } else if (entity.name === Invoice.name) {
                return {billingAddress: "ASC"} as FindOptionsOrder<Invoice>
            } else if (entity.name === InvoiceLine.name) {
                return {unitPrice: "ASC"} as FindOptionsOrder<InvoiceLine>
            } else if (entity.name === MediaType.name) {
                return {name: "ASC"} as FindOptionsOrder<MediaType>
            } else if (entity.name === Playlist.name) {
                return {name: "ASC"} as FindOptionsOrder<Playlist>
            } else if (entity.name === Track.name) {
                return {name: "ASC"} as FindOptionsOrder<Track>
            } else if (entity.name === PlaylistTrack.name) {
                return {id: "ASC"} as FindOptionsOrder<PlaylistTrack>
            }
            throw new Error(`Unsupported entity ${entity.name}`);
        }
    }
]

interface LimitTestDescription {
    title: string,
    // We need three different options because we have three different interfaces
    option: number,
}

const limits: LimitTestDescription[] = [
    {
        title: "no limit",
        option: undefined as never as number,
    },
    {
        title: "limit 1",
        option: 1,
    },
    {
        title: "limit 10",
        option: 10,
    },
    {
        title: "limit 100",
        option: 100,
    }
]

interface OffsetTestDescription {
    title: string,
    // We need three different options because we have three different interfaces
    option: number,
}

const offsets: OffsetTestDescription[] = [
    {
        title: "no offset",
        option: undefined as never as number,
    },
    {
        title: "offset 1",
        option: 1,
    },
    {
        title: "offset 10",
        option: 10,
    },
    {
        title: "offset 100",
        option: 100,
    }
]

export const generateTests = () => CartesianProduct.product(select, entities, wheres, orders, limits, offsets)
    .map(testCase => ({
        select: testCase[0],
        entity: testCase[1],
        where: testCase[2],
        order: testCase[3],
        limit: testCase[4],
        offset: testCase[5],
    }));
export const getTestName = (testCase: ReturnType<typeof generateTests>[number]) =>
    `SELECT ${testCase.entity.entity.name} ${testCase.select.title} ${testCase.where.title} ${testCase.order.title} ${testCase.limit.title} ${testCase.offset.title}`