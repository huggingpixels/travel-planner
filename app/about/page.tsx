import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import {DateRangePicker} from "@nextui-org/date-picker";
import {Select, SelectSection, SelectItem} from "@nextui-org/select";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>

      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
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
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {[{label: "cat", key: ""}].map((animal) => (
          <SelectItem key={animal.key}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      </div>
    </div>
  );
}
