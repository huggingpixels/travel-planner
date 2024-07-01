export interface PricingData {
    id: number,
    name: string,
    capacity: number,
    rateKm: number,
    rateHour: number,
    rateDay: number,
    rateBase: number,
}

export const pricingData: PricingData[] = [
    {
        id: 0,
        name: "1-9 személy",
        capacity: 9,
        rateKm: 390,
        rateHour: 10000,
        rateDay: 80000,
        rateBase: 8000,
    },
    {
        id: 1,
        name: "9-20 személy",
        capacity: 20,
        rateKm: 460,
        rateHour: 12000,
        rateDay: 100000,
        rateBase: 10000,
    },
    {
        id: 2,
        name: "Reptér 9-20 személy",
        capacity: 20,
        rateKm: 0,
        rateHour: 0,
        rateDay: 43000,
        rateBase: 0,
    },
];
