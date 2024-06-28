'use client'

import React, { useState } from "react";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";

import { pricingData, PricingData } from "./pricing";

export default function AboutPage() {
  const [pricing, setPricing] = useState<PricingData>(pricingData[0]);
  const loadPricing = (event: { target: { value: string; }; }) => {
    const pricing = pricingData.find(pricingItem => pricingItem.id === Number(event.target.value));
    if (pricing) {
      setPricing(pricing);
    }
  }

  return (
    <div >
      <h1 className={title()}>Ajánlat generátor béta!</h1>
      <div className="w-full flex-wrap md:flex-nowrap grid grid-cols-1 gap-4 py-10">
        <div className="w-full flex-wrap md:flex-nowrap grid grid-cols-2 gap-4">
          <Input type="email" label="Ügyfél e-mail" />
          <Input label="Ügyfél neve" isClearable />
          <DateRangePicker label="Utazás ideje" className="max-w-xs" />
          <Input label="Útvonal" isClearable />
          <Input label="Utazás idotartama" />
          <Input label="Távolság" />
          <Input label="Utasok száma" />
          <Input label="Indulási hely" isClearable />
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
          <p className="text-small text-default-500">Selected: {pricing.id}</p>
          <Input label="Kilométer díj"
            defaultValue={pricing.rateKm.toString()}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Óra díj"
            type="number"
            defaultValue={pricing.rateHour.toString()}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Napi díj"
            type="number"
            defaultValue={pricing.rateDay.toString()}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            } />
          <Input label="Alapdíj"
            type="number"
            defaultValue={pricing.rateBase.toString()}
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
        </div>
      </div>
    </div>
  );
}
