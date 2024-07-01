'use client'

import React, { useState } from "react";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

import { pricingData } from "./pricing";
import { InvoiceData } from "./output";
import { calculateFare, getDurationMetric } from "./service";
import { validateEmail, validateName } from "./validators";

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
  const [finalPrice, setFinalPrice] = useState(0);
  const [total, setTotal] = useState(0);

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
    const total = calculateFare(
      rateKm,
      rateHour,
      rateDay,
      rateBase,
      distance,
      duration,
    );
    const durationMetric = getDurationMetric(duration);
    const data: InvoiceData = {
      email,
      name,
      route,
      duration,
      durationMetric,
      distance,
      numberOfPassangers,
      startLocation,
      finalPrice: total.final,
      finalVat: total.finalVat,
      finalTotal: total.finalTotal,
      travelDateStart: startEndDate.start,
      travelDateStop: startEndDate.end
    };
    console.log(data);
  }

  const isEmailInvalid = React.useMemo(() => {
    if (email === "") return true;

    return validateEmail(email) ? false : true;
  }, [email]);

  const isNameInvalid = React.useMemo(() => {
    if (name === "") return true;

    return validateName(name) ? false : true;
  }, [name]);

  return (
    <div >
      <h1 className={title()}>Ajánlat generátor béta!</h1>
      <div className="w-full flex-wrap md:flex-nowrap grid grid-cols-1 gap-4 py-10">
        <h2>Ügyfél adatai</h2>
        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-2 gap-4">
          <Input type="email" isRequired onValueChange={setEmail} label="E-mail" isInvalid={isEmailInvalid}
            errorMessage="Please enter a valid email" />
          <Input label="Név" isRequired onValueChange={setName} isClearable isInvalid={isNameInvalid}
            errorMessage="Please enter a valid name" />
        </div>

        <h2>Utazás adatai</h2>
        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-2 gap-4">
          <DateRangePicker label="Utazás ideje" isRequired onChange={(value) => setStartEndDate(value)} />
          <Input label="Utazás idotartama" type="number" onValueChange={(value) => setDuration(Number(value))} endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">Óra</span>
            </div>
          } />
          <Input label="Indulási hely" onValueChange={setStartLocation} isClearable />
          <Input label="Útvonal" onValueChange={setRoute} isClearable />
          <Input label="Távolság Kilométerben" type="number" onValueChange={(value) => setDistance(Number(value))} />
          <Input label="Utasok száma" type="number" onValueChange={(value) => setNumberOfPassangers(Number(value))} />
        </div>

        <h2>Árazás</h2>
        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-4 gap-4">
          <Select
            label="Árazás"
            placeholder="Elmentett árazások"
            className="md:col-span-2"
            onChange={loadPricing}
          >
            {pricingData.map((pricing) => (
              <SelectItem key={pricing.id}>
                {pricing.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-2 gap-4 py-1">
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

        </div>
        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-4 gap-4 py-10">
          <Input label="Nettó ár"
            type="number"
            onValueChange={(value) => setFinalPrice(Number(value))}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Bruttó ár" color="success"
            type="number"
            onValueChange={(value) => setTotal(Number(value))}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Button className="md:col-span-2 md:col-start-1" color="primary" onPress={onFormSubmission}>
            Ajánlatküldés
          </Button>
        </div>
      </div>
    </div>
  );
}
