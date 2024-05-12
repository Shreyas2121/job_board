import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  text: string;
  data: any[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Options = ({ text, data, setValue, value }: Props) => {
  return (
    <Select onValueChange={(value) => setValue(value)} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder={text} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {data.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.name.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Options;
