export function getDurationMetric(duration: number) {
    return (duration > 23) ? "nap" : "óra";
}

export function calculateFare(rateKm: number, rateHour: number, rateDay: number, rateBase: number, distance: number, duration: number) {
    const totalDistance = getTotalDistance(rateKm, distance);
    const totalDuration = getTotalDuration(rateHour, rateDay, duration);
    const totalDurationMetric = getDurationMetric(duration);
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


function getFinal(rateBase: number, totalDistance: number, totalDuration: number) {
    return rateBase + Math.max(totalDistance, totalDuration);
}
