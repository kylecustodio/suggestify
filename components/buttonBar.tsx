import { RadioGroup } from "@headlessui/react";
import { Dispatch } from "react";

type ButtonBarProps = {
  value: any;
  setValue: Dispatch<any>;
  options: any[];
};

const ButtonBar: React.FC<ButtonBarProps> = ({ value, setValue, options }) => {
  return (
    <RadioGroup value={value} onChange={setValue}>
      {/* <RadioGroup.Label>test</RadioGroup.Label> */}
      <div className="flex space-x-2">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option}
            className={({ checked }) =>
              `
              ${checked ? "bg-emerald-500 text-white" : "bg-white"}
              rounded-md py-2 px-4 font-semibold hover:cursor-pointer hover:bg-emerald-500 hover:text-white`
            }
          >
            <div>{option.display}</div>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ButtonBar;
