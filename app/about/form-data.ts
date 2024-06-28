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
    travelDateStop: Date,
    sentToClientDate?: Date,
}

export const formData: CustomerFormData[] = [
    {
        email: "eszter1914@gmail.com",
        name: "nudli kft.",
        route: "Budapestrol Debrecenbe mert abban nincsenek ékezetek",
        distance: 500,
        duration: 5,
        numberOfPassangers: 2,
        startLocation: "Budapest",
        sentToClientDate: new Date(),
        finalPrice: null,
        travelDateStart: new Date(),
        travelDateStop: new Date(),
    }
]
