export interface OrderData {
  customerEmail: string;
  customerName: string;
  tripDateRangeStart: string;
  tripDateRangeEnd: string;
  tripDays: number;
  tripHours: number;
  tripStartLocation: string;
  tripRoute: string;
  tripDuration: number;
  tripDurationMetric: string;
  tripDistance: number;
  tripPassengers: number;
  rateKm: number;
  rateHourly: number;
  rateDaily: number;
  rateBase: number;
  rateHighway: number;
  rateFix: number;
  finalNet: number;
  finalVAT: number;
  finalGross: number;
  sentToClientDate?: unknown;
}
