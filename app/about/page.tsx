'use client'

import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Select, SelectItem } from "@nextui-org/select";

import { animals } from "./data";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>Ajánlat generátor béta!</h1>

      <div className="w-full flex-wrap md:flex-nowrap grid grid-cols-2 gap-4">
        <Input type="email" label="Ügyfél e-mail" />
        <Input label="Ügyfél neve" />
        <DateRangePicker label="Utazás ideje" className="max-w-xs"/>
        <Input label="Útvonal" />
        <Input label="Utazás idotartama" />
        <Input label="Távolság" />
        <Input label="Utasok száma" />
        <Input label="Indulási hely" />
        <Input label="Egyedi nettó ár" />
        <Select
        label="Árazás"
        placeholder="Select an animal"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      </div>
    </div>
  );
}
