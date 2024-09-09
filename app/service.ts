import { DateValue } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import { InvoiceData } from "./output";



export function convertDateToString(dt: DateValue) : string {
  const dtValue = new Date(Date.UTC(dt.year, dt.month, dt.day, 0, 0, 0));
  return Intl.DateTimeFormat('hu-HU', { dateStyle: 'short' }).format(dtValue);
}

export function convertDateToDays(range: RangeValue<DateValue>) : number {
  const endDate = new Date(Date.UTC(range.end.year, range.end.month, range.end.day, 0, 0, 0));
  const startDate = new Date(Date.UTC(range.start.year, range.start.month, range.start.day, 0, 0, 0));
  const diff = endDate.getTime() - startDate.getTime();

  return (Math.round(diff / (1000 * 3600 * 24))+1)
};



export function getDurationMetric(days: number) : string {
  return days > 1 ? "day" : "hour";
}

export function calculateFare(data: InvoiceData) : object {
  var costDistance = 0;
  var costTime = 0;
  var costFix = 0;

  costDistance = Number(data.rateKm) * Number(data.tripDistance);

  const durationType = getDurationMetric(data.tripDays);
  const durationBase = durationType == "day" ? data.tripDays : data.tripHours;
  const durationRate = durationType == "day" ? data.rateDaily : data.rateHourly;
  costTime = Number(durationBase) * Number(durationRate);
  
  costFix = Number(data.rateFix);

  const baseCost = Math.max(costDistance, costTime, costFix);
  const finalNet = baseCost + Number(data.rateBase) + Number(data.rateHighway);
  const finalVAT = finalNet * 0.27;
  const finalGross = finalNet + finalVAT;

  return {
    finalNet,
    finalVAT,
    finalGross,
  };
}
