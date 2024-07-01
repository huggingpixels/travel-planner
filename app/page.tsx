'use client'

import React, { useState } from "react";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import { Button, ButtonGroup } from "@nextui-org/button";
import { parseDate } from "@internationalized/date";

import { pricingData, PricingData } from "./pricing";
import { InvoiceData } from "./output";

export default function Home() {
  const [capacity, setCapacity] = useState(0);
  const [rateKm, setRateKm] = useState(0);
  const [rateHour, setRateHour] = useState(0);
  const [rateDay, setRateDay] = useState(0);
  const [rateBase, setRateBase] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [startEndDate, setStartEndDate] = useState({
    start: {},
    end: {},
  });
  const [route, setRoute] = useState("");
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [numberOfPassangers, setNumberOfPassangers] = useState(0);
  const [startLocation, setStartLocation] = useState("");

  const loadPricing = (event: { target: { value: string; }; }) => {
    const pricing = pricingData.find(pricingItem => pricingItem.id === Number(event.target.value));
    if (pricing) {
      setCapacity(pricing.capacity);
      setRateKm(pricing.rateKm);
      setRateHour(pricing.rateHour);
      setRateDay(pricing.rateDay);
      setRateBase(pricing.rateBase);
    }
  }

  const onFormSubmission = () => {
    const data: InvoiceData = {
      email,
      name,
      route,
      duration,
      durationMetric: "",
      distance,
      numberOfPassangers,
      startLocation,
      finalPrice: 0,
      finalVat: 0,
      finalTotal: 0,
      travelDateStart: startEndDate.start,
      travelDateStop: startEndDate.end
    };
    console.log(data);
  }

  return (
    <div >
      <h1 className={title()}>Ajánlat generátor béta!</h1>
      <div className="w-full flex-wrap md:flex-nowrap grid grid-cols-1 gap-4 py-10">
        <div className="w-full flex-wrap md:flex-nowrap grid grid-cols-2 gap-4">
          <Input type="email" onValueChange={setEmail} label="Ügyfél e-mail" />
          <Input label="Ügyfél neve" onValueChange={setName} isClearable />
          <DateRangePicker label="Utazás ideje" className="max-w-xs" onChange={(value) => setStartEndDate(value)} />
          <Input label="Útvonal" onValueChange={setRoute} isClearable />
          <Input label="Utazás idotartama" onValueChange={(value) => setDuration(Number(value))} />
          <Input label="Távolság" onValueChange={(value) => setDistance(Number(value))} />
          <Input label="Utasok száma" onValueChange={(value) => setNumberOfPassangers(Number(value))} />
          <Input label="Indulási hely" onValueChange={setStartLocation} isClearable />
        </div>

        <div className="w-full flex-wrap md:flex-nowrap grid grid-cols-1 gap-4 py-10">
          <Select
            label="Árazás"
            placeholder="Select an animal"
            onChange={loadPricing}
          >
            {pricingData.map((pricing) => (
              <SelectItem key={pricing.id}>
                {pricing.name}
              </SelectItem>
            ))}
          </Select>
          <Input label="Kilométer díj"
            type="number"
            value={rateKm.toString()}
            onValueChange={(value) => setRateKm(Number(value))}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Óra díj"
            type="number"
            value={rateHour.toString()}
            onValueChange={(value) => setRateHour(Number(value))}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Napi díj"
            type="number"
            value={rateDay.toString()}
            onValueChange={(value) => setRateDay(Number(value))}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Alapdíj"
            type="number"
            value={rateBase.toString()}
            onValueChange={(value) => setRateBase(Number(value))}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Autópálya díj"
            type="number"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Nettó ár"
            type="number"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Bruttó ár" color="success"
            type="number"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />

          <Button color="primary" onPress={onFormSubmission}>
            Ajánlatküldés
          </Button>
        </div>
      </div>
    </div>
  );
}
