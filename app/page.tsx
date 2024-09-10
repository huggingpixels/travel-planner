"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { DateValue } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { pricingData } from "./pricing";
import { OrderData } from "./output";
import {
  convertDateToDays,
  convertDateToString,
  displayForint,
  generateOrder,
  OrderInput,
  TotalItem,
  TripData,
} from "./service";
import { validateEmail, validateName } from "./validators";
import { PDFDownloadLink, Order } from "./order";

import { title } from "@/components/primitives";

export default function Home() {
  const [formData, setFormData] = useState({
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
  } as OrderData);

  const [orderTable, setOrderTable] = useState({
    customerEmail: "",
    customerName: "",
    tripDate: "",
    tripStartLocation: "",
    tripRoute: "",
    tripPassengers: 0,
    tripDuration: {} as TripData,
    orderItems: [],
    total: [] as TotalItem[],
  } as OrderInput);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const changedFormData = {
        ...prevFormData,
        [name]: value,
      };

      setOrderTable(() => generateOrder(changedFormData));

      return changedFormData;
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

      setOrderTable(() => generateOrder(changedFormData));

      return changedFormData;
    });
  };

  const loadPricing = (event: { target: { value: string } }) => {
    const pricing = pricingData.find(
      (pricingItem) => pricingItem.id === Number(event.target.value),
    );

    if (pricing) {
      setFormData((prevFormData) => {
        const changedFormData = {
          ...prevFormData,
          rateKm: pricing.rateKm,
          rateHourly: pricing.rateHour,
          rateDaily: pricing.rateDay,
          rateBase: pricing.rateBase,
        };

        setOrderTable(() => generateOrder(changedFormData));

        return changedFormData;
      });
    }
  };

  const isEmailInvalid = React.useMemo(() => {
    if (formData.customerEmail === "") return true;

    return validateEmail(formData.customerEmail) ? false : true;
  }, [formData.customerEmail]);

  const isNameInvalid = React.useMemo(() => {
    if (formData.customerName === "") return true;

    return validateName(formData.customerName) ? false : true;
  }, [formData.customerName]);

  const netTotalAmount = orderTable.total?.find((elem) => elem.id == "net");
  const grossTotalAmount = orderTable.total?.find((elem) => elem.id == "gross");

  const filename = orderTable.tripStartLocation && orderTable.tripStartLocation !== '' && orderTable.tripDate && orderTable.tripDate !== '' 
  ? `arajanlat-${orderTable.tripStartLocation}-${orderTable.tripDate}`.replaceAll(' ', '').replaceAll('.','')
  : `arajanlat-${new Date().toISOString()}`;

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
            readOnly
            color="success"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Nettó ár"
            name="finalNet"
            type="number"
            value={netTotalAmount ? netTotalAmount.amount.toString() : ""}
          />
          <Input
            readOnly
            color="primary"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">HUF</span>
              </div>
            }
            label="Bruttó ár"
            name="finalGross"
            type="number"
            value={grossTotalAmount ? grossTotalAmount.amount.toString() : ""}
          />

          <div className="md:col-span-2 md:col-start-1">
            <PDFDownloadLink
              document={<Order order={generateOrder(formData)} />}
              fileName={`${filename}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <Button isDisabled={true}>Generalás...</Button>
                ) : (
                  <Button color="primary">Ajánlat letöltése</Button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
        <div>
          <Table
            aria-label="Summary table"
            className="md:col-span-2 md:col-start-1"
          >
            <TableHeader>
              <TableColumn>Díjtétel</TableColumn>
              <TableColumn>Egységár</TableColumn>
              <TableColumn>Mennyiség</TableColumn>
              <TableColumn>Összeg</TableColumn>
            </TableHeader>
            <TableBody>
              {orderTable.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{displayForint(item.price)}</TableCell>
                  <TableCell>
                    {item.quantity > 1 ? item.quantity : ""}
                  </TableCell>
                  <TableCell>
                    {displayForint(item.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
