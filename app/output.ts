export interface InvoiceData {
  email: string;
  name: string;
  route: string;
  duration: number;
  durationMetric: string;
  distance: number;
  numberOfPassangers: number;
  startLocation: string;
  finalPrice: number;
  finalVat: number;
  finalTotal: number;
  sentToClientDate?: unknown;
  travelDateStart: unknown;
  travelDateStop: unknown;
}
