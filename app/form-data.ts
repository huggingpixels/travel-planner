export interface CustomerFormData {
    email: string,
    name: string,
    route: string,
    distance: number,
    duration: number,
    numberOfPassangers: number,
    startLocation: string,
    finalPrice: number | null,
    travelDateStart: Date,
    travelDateEnd: Date,
    sentToClientDate?: Date,
}

export const formData: CustomerFormData[] = [
    {
        email: "test@gmail.com",
        name: "bip kft.",
        route: "Budapestrol to Paris",
        distance: 500,
        duration: 5,
        numberOfPassangers: 2,
        startLocation: "Budapest",
        sentToClientDate: new Date(),
        finalPrice: null,
        travelDateStart: new Date(),
        travelDateEnd: new Date(),
    }
]
