"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

import { pricingData } from "./pricing";
import { InvoiceData } from "./output";
import { calculateFare, convertDateToDays, convertDateToString } from "./service";
import { validateEmail, validateName } from "./validators";

import { title } from "@/components/primitives";
import { DateValue } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";

export default function Home() {
  const [formData, setFormData] = useState(
    {
      customerEmail: "",
      customerName: "",
      tripDateRangeStart: "",
      tripDateRangeEnd: "",
      tripDays: 0,
      tripHours: 0,
      tripStartLocation: "",
      tripRoute: "",
      tripDistance: 0,
      tripPassengers: 0,
      rateKm: 0,
      rateHourly: 0,
      rateDaily: 0,
      rateBase: 0,
      rateHighway: 0,
      rateFix: 0,
      finalNet: 0,
      finalGross: 0,
    } as InvoiceData
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const changedFormData = {
        ...prevFormData,
        [name]: value,
      };
      return {
        ...changedFormData,
        ...calculateFare(changedFormData),
      }
    });
  };

  const handleRangePicker = (value: RangeValue<DateValue>) => {
    setFormData((prevFormData) => {
      const changedFormData = {
        ...prevFormData,
        tripDateRangeStart: convertDateToString(value.start),
        tripDateRangeEnd: convertDateToString(value.end),
        tripDays: convertDateToDays(value),
      };
      return {
        ...changedFormData,
        ...calculateFare(changedFormData),
      }
    });
  };

  const loadPricing = (event: { target: { value: string } }) => {
    const pricing = pricingData.find(
      (pricingItem) => pricingItem.id === Number(event.target.value),
    );

    if (pricing) {
      setFormData((prevFormData) => {
        const changeFormData = {
          ...prevFormData,
          rateKm: pricing.rateKm,
          rateHourly: pricing.rateHour,
          rateDaily: pricing.rateDay,
          rateBase: pricing.rateBase,
        };
        return {
          ...changeFormData,
          ...calculateFare(changeFormData),
        };
      });

    };

  };

  const onFormSubmission = () => {
    console.log(formData);
  };

  const isEmailInvalid = React.useMemo(() => {
    if (formData.customerEmail === "") return true;

    return validateEmail(formData.customerEmail) ? false : true;
  }, [formData.customerEmail]);

  const isNameInvalid = React.useMemo(() => {
    if (formData.customerName === "") return true;

    return validateName(formData.customerName) ? false : true;
  }, [formData.customerName]);

  return (
    <div>
      <h1 className={title()}>Ajánlat generátor béta!</h1>
      <div className="w-full flex-wrap md:flex-nowrap grid grid-cols-1 gap-4 py-10">
        <h2>Ügyfél adatai</h2>
        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-2 gap-4">
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            isInvalid={isEmailInvalid}
            label="E-mail"
            name="customerEmail"
            type="email"
            onChange={handleInputChange}
          />
          <Input
            isClearable
            isRequired
            errorMessage="Please enter a valid name"
            isInvalid={isNameInvalid}
            label="Név"
            name="customerName"
            onChange={handleInputChange}
          />
        </div>

        <h2>Utazás adatai</h2>
        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-2 gap-4">
          <DateRangePicker
            isRequired
            label="Utazás ideje"
            onChange={(value) => handleRangePicker(value)}
          />
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">Óra</span>
              </div>
            }
            label="Utazás idotartama"
            name="tripHours"
            type="number"
            onChange={handleInputChange}
          />
          <Input
            isClearable
            label="Indulási hely"
            name="tripStartLocation"
            onChange={handleInputChange}
          />
          <Input
            isClearable
            label="Útvonal"
            name="tripRoute"
            onChange={handleInputChange}
          />
          <Input
            label="Távolság Kilométerben"
            name="tripDistance"
            type="number"
            onChange={handleInputChange}
          />
          <Input
            label="Utasok száma"
            name="tripPassengers"
            type="number"
            onChange={handleInputChange}
          />
        </div>

        <h2>Árazás</h2>
        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-4 gap-4">
          <Select
            className="md:col-span-2"
            label="Árazás"
            name="customerName"
            placeholder="Elmentett árazások"
            onChange={loadPricing}
          >
            {pricingData.map((pricing) => (
              <SelectItem key={pricing.id}>{pricing.name}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-2 gap-4 py-1">
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Kilométer díj"
            name="rateKm"
            type="number"
            value={formData.rateKm.toString()}
            onChange={handleInputChange}
          />
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Óra díj"
            name="rateHourly"
            type="number"
            value={formData.rateHourly.toString()}
            onChange={handleInputChange}
          />
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Napi díj"
            name="rateDaily"
            type="number"
            value={formData.rateDaily.toString()}
            onChange={handleInputChange}
          />
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Alapdíj"
            name="rateBase"
            type="number"
            value={formData.rateBase.toString()}
            onChange={handleInputChange}
          />
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Autópálya díj"
            name="rateHighway"
            type="number"
            value={formData.rateHighway.toString()}
            onChange={handleInputChange}
          />
          <Input
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Fix díj"
            name="rateFix"
            type="number"
            value={formData.rateFix.toString()}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full flex-wrap md:flex-nowrap grid md:grid-cols-4 gap-4 py-10">
          <Input
            color="success"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Nettó ár"
            name="finalNet"
            type="number"
            value={formData.finalNet.toString()}
            readOnly
          />
          <Input
            color="primary"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Bruttó ár"
            name="finalGross"
            type="number"
            value={formData.finalGross.toString()}
            readOnly
          />
          <Button
            className="md:col-span-2 md:col-start-1"
            color="primary"
            onPress={onFormSubmission}
          >
            Ajánlatküldés
          </Button>
        </div>
      </div>
    </div>
  );
}
