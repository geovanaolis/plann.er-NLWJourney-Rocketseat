import { api } from "./api";


export type TripDetails = {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}

type TripCreate = Omit<TripDetails, "id" | "is_confirmed"> & {
    emais_to_invite: string[]
}

async function getById(id: string){
    try {
        const { data } = await api.get<{ trip: TripDetails }>(`/trips/${id}`)
        return data.trip
    } catch (error) {
        throw error
    }
}

async function create({ 
        destination, 
        starts_at, 
        ends_at, 
        emais_to_invite
    }: TripCreate) {
    try {
        const { data } = await api.post<{ tripId: string }>(`/trips`, {
            destination,
            starts_at,
            ends_at,
            emais_to_invite,
            owner_name: "Geovana Oliveira",
            owner_email: "geovana.oliveira@gmail.com"
        })
        return data
    } catch (error) {
        throw error
    }
}

export const tripServer = { getById, create }