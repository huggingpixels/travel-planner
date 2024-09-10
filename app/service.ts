import { DateValue } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";

import { OrderData } from "./output";

export interface OrderItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface TotalItem {
  id: string;
  description: string;
  amount: number;
}

export interface TripData {
  value: number;
  metric: string;
  displayMetric: string;
  itemName: string;
  price: number;
}

export interface OrderInput {
  customerEmail: string;
  customerName: string;
  tripDate: string;
  tripStartLocation: string;
  tripRoute: string;
  tripDuration: TripData;
  tripPassengers: number;
  orderItems: OrderItem[];
  total: TotalItem[];
}

export function convertDateToString(dt: DateValue): string {
  const dtValue = new Date(Date.UTC(dt.year, dt.month, dt.day, 0, 0, 0));

  return Intl.DateTimeFormat("hu-HU", { dateStyle: "short" }).format(dtValue);
}

export function convertDateToDays(range: RangeValue<DateValue>): number {
  const endDate = new Date(
    Date.UTC(range.end.year, range.end.month, range.end.day, 0, 0, 0),
  );
  const startDate = new Date(
    Date.UTC(range.start.year, range.start.month, range.start.day, 0, 0, 0),
  );
  const diff = endDate.getTime() - startDate.getTime();

  return Math.round(diff / (1000 * 3600 * 24)) + 1;
}

function getTripDuration(input: OrderData) {
  const tripDuration =
    input.tripDays > 1
      ? {
          value: input.tripDays,
          metric: "day",
          displayMetric: "nap",
          itemName: "Napidíj",
          price: input.rateDaily,
        }
      : {
          value: input.tripHours,
          metric: "hour",
          displayMetric: "óra",
          itemName: "Óradíj",
          price: input.rateHourly,
        };

  return tripDuration;
}

function getOrderItems(input: OrderData): OrderItem[] {
  const tripDuration = getTripDuration(input);

  const baseItems: OrderItem[] = [
    {
      id: "1",
      description: "Kilométer díj",
      quantity: input.tripDistance,
      price: input.rateKm,
    },
    {
      id: "2",
      description: tripDuration.itemName,
      quantity: tripDuration.value,
      price: tripDuration.price,
    },
    {
      id: "3",
      description: "Fix ár",
      quantity: 1,
      price: Number(input.rateFix),
    },
  ];

  const baseResult = baseItems.reduce(
    (acc, current) => {
      return current.quantity * current.price > acc.quantity * acc.price
        ? current
        : acc;
    },
    {
      id: "0",
      description: "Hiányzó árazás",
      quantity: 0,
      price: 0,
    } as OrderItem,
  );

  const orderItems: OrderItem[] = [baseResult];

  if (input.rateBase > 0) {
    orderItems.push({
      id: "4",
      description: "Alapdíj",
      quantity: 1,
      price: Number(input.rateBase),
    });
  }

  if (input.rateHighway > 0) {
    orderItems.push({
      id: "5",
      description: "Autópálya díj",
      quantity: 1,
      price: Number(input.rateHighway),
    });
  }

  return orderItems;
}

function getTotal(items: OrderItem[]): TotalItem[] {
  const sumTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total: TotalItem[] = [
    {
      id: "net",
      description: "Összesen (nettó)",
      amount: sumTotal,
    },
    {
      id: "vat",
      description: "ÁFA (27%)",
      amount: sumTotal * 0.27,
    },
    {
      id: "gross",
      description: "Összesen (bruttó)",
      amount: sumTotal * 1.27,
    },
  ];

  return total;
}

export function generateOrder(input: OrderData): OrderInput {
  const tripDateRange =
    input.tripDays > 1
      ? `${input.tripDateRangeStart}-${input.tripDateRangeEnd}`
      : input.tripDateRangeStart;
  const tripDuration = getTripDuration(input);

  const orderItems = getOrderItems(input);

  return {
    customerEmail: input.customerEmail,
    customerName: input.customerName,
    tripDate: tripDateRange,
    tripStartLocation: input.tripStartLocation,
    tripRoute: input.tripRoute,
    tripDuration: tripDuration,
    tripPassengers: input.tripPassengers,
    orderItems: orderItems,
    total: getTotal(orderItems),
  };
}

export function displayForint(value: number): string {
  return value.toLocaleString("hu-HU", {
    maximumFractionDigits: 0,
    useGrouping: true,
    style: "currency",
    currency: "HUF",
  });
}
