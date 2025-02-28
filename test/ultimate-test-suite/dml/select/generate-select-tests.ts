import { FindOneOptions, FindOptionsOrder, ILike, MoreThan, ObjectLiteral, SelectQueryBuilder } from "../../../../src";
import { ChinookDataset } from "../../chinook_database/dataset";
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
    applySelectToQB: (entity: any, qb: SelectQueryBuilder<ObjectLiteral>, oracleFix: boolean) => SelectQueryBuilder<ObjectLiteral>
}

const fixOracle = (x: string, doINeedToFixIt: boolean) => doINeedToFixIt ? `"${x}"` : x;

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
        applySelectToQB: (entity, qb, oracleFix) => {
            if (entity.name === Album.name) {
                return qb.select(fixOracle("album_id", oracleFix))
            } else if (entity.name === Artist.name) {
                return qb.select(fixOracle("artist_id", oracleFix))
            } else if (entity.name === Customer.name) {
                return qb.select(fixOracle("customer_id", oracleFix))
            } else if (entity.name === Employee.name) {
                return qb.select(fixOracle("employee_id", oracleFix))
            } else if (entity.name === Genre.name) {
                return qb.select(fixOracle("genre_id", oracleFix))
            } else if (entity.name === Invoice.name) {
                return qb.select(fixOracle("invoice_id", oracleFix))
            } else if (entity.name === InvoiceLine.name) {
                return qb.select(fixOracle("invoice_line_id", oracleFix))
            } else if (entity.name === MediaType.name) {
                return qb.select(fixOracle("media_type_id", oracleFix))
            } else if (entity.name === Playlist.name) {
                return qb.select(fixOracle("playlist_id", oracleFix))
            } else if (entity.name === Track.name) {
                return qb.select(fixOracle("track_id", oracleFix))
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select(fixOracle("id", oracleFix));
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
        applySelectToQB: (entity, qb, oracleFix) => {
            if (entity.name === Album.name) {
                return qb.select(["album_id", "title"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Artist.name) {
                return qb.select(["artist_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Customer.name) {
                return qb.select(["customer_id", "address"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Employee.name) {
                return qb.select(["employee_id", "phone"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Genre.name) {
                return qb.select(["genre_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Invoice.name) {
                return qb.select(["invoice_id", "invoice_date"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === InvoiceLine.name) {
                return qb.select(["invoice_line_id", "quantity"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === MediaType.name) {
                return qb.select(["media_type_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Playlist.name) {
                return qb.select(["playlist_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Track.name) {
                return qb.select(["track_id", "milliseconds"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select(["id"].map(x => fixOracle(x, oracleFix)));
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
                return {invoiceId: true, invoiceDate: true, billingCountry: true, billingState: true} satisfies FindOneOptions<Invoice>["select"];
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
        applySelectToQB: (entity, qb, oracleFix) => {
            if (entity.name === Album.name) {
                return qb.select(["album_id", "title"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Artist.name) {
                return qb.select(["artist_id", "name"])
            } else if (entity.name === Customer.name) {
                return qb.select(["customer_id", "address", "city", "first_name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Employee.name) {
                return qb.select(["employee_id", "phone", "address", "postal_code"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Genre.name) {
                return qb.select(["genre_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Invoice.name) {
                return qb.select(["invoice_id", "invoice_date", "billing_country", "billing_state"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === InvoiceLine.name) {
                return qb.select(["invoice_line_id", "quantity", "unit_price"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === MediaType.name) {
                return qb.select(["media_type_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Playlist.name) {
                return qb.select(["playlist_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Track.name) {
                return qb.select(["track_id", "milliseconds", "composer", "bytes"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select(["id"].map(x => fixOracle(x, oracleFix)));
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
                return {employeeId: true, phone: true, address: true, postalCode: true, birthDate: true, city: true, country: true, email: true, fax: true, firstName: true, hireDate: true, lastName: true, state: true, title: true} satisfies FindOneOptions<Employee>["select"];
            } else if (entity.name === Genre.name) {
                return {genreId: true, name: true} satisfies FindOneOptions<Genre>["select"];
            } else if (entity.name === Invoice.name) {
                return {invoiceId: true, invoiceDate: true, billingCountry: true, billingState: true, billingAddress: true, billingCity: true, billingPostalCode: true, total: true} satisfies FindOneOptions<Invoice>["select"];
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
        applySelectToQB: (entity, qb, oracleFix) => {
            if (entity.name === Album.name) {
                return qb.select(["album_id", "title"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Artist.name) {
                return qb.select(["artist_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Customer.name) {
                return qb.select(["customer_id", "address", "city", "first_name", "company", "country", "email", "fax", "last_name", "phone", "postal_code", "state"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Employee.name) {
                return qb.select(["employee_id", "phone", "address", "postal_code", "birth_date", "city", "country", "email", "fax", "first_name", "hire_date", "last_name", "state", "title"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Genre.name) {
                return qb.select(["genre_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Invoice.name) {
                return qb.select(["invoice_id", "invoice_date", "billing_country", "billing_state", "billing_address", "billing_city", "billing_postal_code", "total"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === InvoiceLine.name) {
                return qb.select(["invoice_line_id", "quantity", "unit_price"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === MediaType.name) {
                return qb.select(["media_type_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Playlist.name) {
                return qb.select(["playlist_id", "name"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === Track.name) {
                return qb.select(["track_id", "milliseconds", "composer", "bytes", "name", "unit_price"].map(x => fixOracle(x, oracleFix)))
            } else if (entity.name === PlaylistTrack.name) {
                return qb.select(["id"].map(x => fixOracle(x, oracleFix)));
            }
            throw new Error(`Unsupported entity ${entity.name}`);
        }
    },
]

interface EntityTestDescription {
    entity: any;
    nameAlias: string,
    tableName: string,
    rawMapper: (x: any) => any,
    rawFromMapper: (x: any) => any,
    datasetMapper: (x: any) => any,
    dataset: any[],
}

const entities: EntityTestDescription[] = [
    { entity: Album, tableName: "album", nameAlias: "album",
        rawMapper: (x) => ({albumId: x.Album_album_id, title: x.Album_title}),
        rawFromMapper: (x) => ({albumId: x.album_id, title: x.title}),
        datasetMapper: (x: typeof ChinookDataset.Albums[number]) => ({albumId: x.albumId, title: x.title}),
        dataset: ChinookDataset.Albums },
    { entity: Artist, tableName: "artist", nameAlias: "artist" ,
        rawMapper: (x) => ({artistId: x.Artist_artist_id, name: x.Artist_name}),
        rawFromMapper: (x) => ({artistId: x.artist_id, name: x.name}),
        datasetMapper: (x: typeof ChinookDataset.Artists[number]) => x,
        dataset: ChinookDataset.Artists  },
    { entity: Customer, tableName: "customer", nameAlias: "customer",
        rawMapper: (x) => ({address: x.Customer_address, city: x.Customer_city, company: x.Customer_company, country: x.Customer_country, customerId: x.Customer_customer_id, email: x.Customer_email, fax: x.Customer_fax, firstName: x.Customer_first_name, lastName: x.Customer_last_name, phone: x.Customer_phone, postalCode: x.Customer_postal_code, state: x.Customer_state}),
        rawFromMapper: (x) => ({address: x.address, city: x.city, company: x.company, country: x.country, customerId: x.customer_id, email: x.email, fax: x.fax, firstName: x.first_name, lastName: x.last_name, phone: x.phone, postalCode: x.postal_code, state: x.state}),
        datasetMapper: (x: typeof ChinookDataset.Customers[number]) => {const res = {...x}; delete (res as any).supportRep; return res;},
        dataset: ChinookDataset.Customers   },
    { entity: Employee, tableName: "employee", nameAlias: "employee",
        rawMapper: (x) => ({address: x.Employee_address, birthDate: new Date(x.Employee_birth_date), city: x.Employee_city, country: x.Employee_country, email: x.Employee_email, employeeId: x.Employee_employee_id, fax: x.Employee_fax, firstName: x.Employee_first_name, hireDate: new Date(x.Employee_hire_date), lastName: x.Employee_last_name, phone: x.Employee_phone, postalCode: x.Employee_postal_code, state: x.Employee_state, title: x.Employee_title}),
        rawFromMapper: (x) => ({address: x.address, birthDate: new Date(x.birth_date), city: x.city, country: x.country, email: x.email, employeeId: x.employee_id, fax: x.fax, firstName: x.first_name, hireDate: new Date(x.hire_date), lastName: x.last_name, phone: x.phone, postalCode: x.postal_code, state: x.state, title: x.title}),
        datasetMapper: (x) => (x: typeof ChinookDataset.Customers[number]) => {const res = {...x}; delete (res as any).reportsTo; return res;},
        dataset: ChinookDataset.Employees   },
    { entity: Genre, tableName: "genre", nameAlias: "genre",
        rawMapper: (x) => (x),
        rawFromMapper: (x) => x,
        datasetMapper: (x) => x,
        dataset: ChinookDataset.Genres   },
    { entity: Invoice, tableName: "invoice", nameAlias: "invoice",
        rawMapper: (x) => (x),
        rawFromMapper: (x) => x,
        datasetMapper: (x) => x,
        dataset: ChinookDataset.Invoices   },
    { entity: InvoiceLine, tableName: "invoice_line", nameAlias: "invoice_line",
        rawMapper: (x) => (x),
        rawFromMapper: (x) => x,
        datasetMapper: (x) => x,
        dataset: ChinookDataset.InvoiceLines },
    { entity: MediaType, tableName: "media_type", nameAlias: "media_type",
        rawMapper: (x) => (x),
        rawFromMapper: (x) => x,
        datasetMapper: (x) => x,
        dataset: ChinookDataset.MediaTypes},
    { entity: Playlist, tableName: "playlist", nameAlias: "playlist",
        rawMapper: (x) => (x),
        rawFromMapper: (x) => x,
        datasetMapper: (x) => x,
        dataset: ChinookDataset.Playlists},
    { entity: Track, tableName: "track", nameAlias: "track",
        rawMapper: (x) => (x),
        rawFromMapper: (x) => x,
        datasetMapper: (x) => x,
        dataset: ChinookDataset.Tracks },
    { entity: PlaylistTrack, tableName: "playlist_track", nameAlias: "playlist_track",
        rawMapper: (x) => (x),
        rawFromMapper: (x) => x,
        datasetMapper: (x) => x,
        dataset: ChinookDataset.PLaylistTracks },
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
    applyOption: (entity: any, qb: SelectQueryBuilder<ObjectLiteral>, oracleFix: boolean) => SelectQueryBuilder<ObjectLiteral>,
    optionForRepo: (entity: any) => FindOneOptions<ObjectLiteral>["order"],
    orderDataset: (entity: any) => (x: any[]) => any[];
}

const orders: OrderTestDescription[] = [
    {
        title: "no order condition",
        applyOption: (entity, qb) => qb,
        optionForRepo: () => undefined,
        orderDataset: () => (x) => x,
    },
    {
        title: "1 order condition",
        applyOption: (entity, qb, oracleFix) => {
            if (entity.name === Album.name) {
                return qb.orderBy(fixOracle("title", oracleFix), "ASC")
            } else if (entity.name === Artist.name) {
                return qb.orderBy(fixOracle("name", oracleFix), "ASC")
            } else if (entity.name === Customer.name) {
                return qb.orderBy(fixOracle("country", oracleFix), "ASC")
            } else if (entity.name === Employee.name) {
                return qb.orderBy(fixOracle("email", oracleFix), "ASC")
            } else if (entity.name === Genre.name) {
                return qb.orderBy(fixOracle("name", oracleFix), "ASC")
            } else if (entity.name === Invoice.name) {
                return qb.orderBy(fixOracle("billing_address", oracleFix), "ASC")
            } else if (entity.name === InvoiceLine.name) {
                return qb.orderBy(fixOracle("unit_price", oracleFix), "ASC")
            } else if (entity.name === MediaType.name) {
                return qb.orderBy(fixOracle("name", oracleFix), "ASC")
            } else if (entity.name === Playlist.name) {
                return qb.orderBy(fixOracle("name", oracleFix), "ASC")
            } else if (entity.name === Track.name) {
                return qb.orderBy(fixOracle("name", oracleFix), "ASC")
            } else if (entity.name === PlaylistTrack.name) {
                return qb.orderBy(fixOracle("id", oracleFix), "ASC")
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
        },
        orderDataset: (entity) => {
            if (entity.name === Album.name) {
                return (dataset) => dataset.slice().sort((a: Album, b: Album) => a.title.localeCompare(b.title))
            } else if (entity.name === Artist.name) {
                return (dataset) => dataset.slice().sort((a: Artist, b: Artist) => a.name.localeCompare(b.name))
            } else if (entity.name === Customer.name) {
                return (dataset) => dataset.slice().sort((a: Customer, b: Customer) => a.country.localeCompare(b.country))
            } else if (entity.name === Employee.name) {
                return (dataset) => dataset.slice().sort((a: Employee, b: Employee) => a.email.localeCompare(b.email))
            } else if (entity.name === Genre.name) {
                return (dataset) => dataset.slice().sort((a: Genre, b: Genre) => a.name.localeCompare(b.name))
            } else if (entity.name === Invoice.name) {
                return (dataset) => dataset.slice().sort((a: Invoice, b: Invoice) => a.billingAddress.localeCompare(b.billingAddress))
            } else if (entity.name === InvoiceLine.name) {
                return (dataset) => dataset.slice().sort((a: InvoiceLine, b: InvoiceLine) => a.unitPrice - b.unitPrice)
            } else if (entity.name === MediaType.name) {
                return (dataset) => dataset.slice().sort((a: MediaType, b: MediaType) => a.name.localeCompare(b.name))
            } else if (entity.name === Playlist.name) {
                return (dataset) => dataset.slice().sort((a: Playlist, b: Playlist) => a.name.localeCompare(b.name))
            } else if (entity.name === Track.name) {
                return (dataset) => dataset.slice().sort((a: Track, b: Track) => a.name.localeCompare(b.name))
            } else if (entity.name === PlaylistTrack.name) {
                return (dataset) => dataset.slice().sort((a: PlaylistTrack, b: PlaylistTrack) => a.id - b.id)
            }
            throw new Error(`Unsupported entity ${entity.name}`);
        },
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

const optimizeTests = (testCases: ReturnType<typeof _generateTests>) => {
    const testMap = new Map<string, typeof testCases[number]>()
    for (const testCase of testCases) {
        const entity = testCase.entity.entity;
        const select = JSON.stringify(testCase.select.selectOption(entity)) ?? "empty";
        const where = JSON.stringify(testCase.where.option(entity));
        const order = JSON.stringify(testCase.order.optionForRepo(entity));
        const limit = testCase.limit.option;
        const offset = testCase.offset.option;
        const stringRepresentationOfTest = `ENTITY: ${entity.name}, SELECT: ${select}, WHERE: ${where}, ORDER: ${order}, LIMIT: ${limit}, OFFSET: ${offset}`;
        if (!testMap.has(stringRepresentationOfTest))
            testMap.set(stringRepresentationOfTest, testCase);
    }

    return Array.from(testMap.values());
}

export const _generateTests = () => {
    return CartesianProduct.product(select, entities, wheres, orders, limits, offsets)
    .map(testCase => ({
        select: testCase[0],
        entity: testCase[1],
        where: testCase[2],
        order: testCase[3],
        limit: testCase[4],
        offset: testCase[5],
    }));
}

export const generateTests = () => {
    console.log("Generating tests...")
    const allTests = _generateTests()
    console.log(`Generated ${allTests.length} tests, optimizing...`)
    const optimizedTests = optimizeTests(allTests);
    console.log(`Optimization complete, reduced to ${optimizedTests.length} tests (${Math.floor(100-(optimizedTests.length / allTests.length * 100))}% reduction)`)
    return optimizedTests;
}

export const getTestName = (testCase: ReturnType<typeof generateTests>[number]) =>
    `SELECT ${testCase.entity.entity.name}, ${testCase.select.title}, ${testCase.where.title}, ${testCase.order.title}, ${testCase.limit.title}, ${testCase.offset.title}`