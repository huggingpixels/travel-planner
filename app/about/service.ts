import { CustomerFormData } from "./form-data";
import { PricingData } from "./pricing";

export function calculateFare(pricingData: PricingData, formData: CustomerFormData) {
    const rateBase = pricingData.rateBase;
    const totalDistance = getTotalDistance(pricingData.rateKm, formData.distance);
    const totalDuration = getTotalDuration(pricingData.rateHour, pricingData.rateDay, formData.duration);
    const totalDurationMetric = getDurationMetric(formData.duration);
    const final = getFinal(rateBase, totalDistance, totalDuration);
    const finalVat = final * 0.27;
    const finalTotal = final + finalVat;

    return {
        final,
        finalVat,
        finalTotal,
        totalDurationMetric
    };

}

function getTotalDistance(rateKm: number, distance: number) {
    return rateKm * distance || 0;
}

function getTotalDuration(rateHours: number, rateDaily: number, duration: number) {
    if (duration > 23) {
        return Math.round(duration / 24) * rateDaily || 0;
    } else {
        return duration * rateHours || 0;
    }
}

function getDurationMetric(duration: number) {
    return (duration > 23) ? "nap" : "óra";
}

function getFinal(rateBase: number, totalDistance: number, totalDuration: number) {
    return rateBase + Math.max(totalDistance, totalDuration);
}
