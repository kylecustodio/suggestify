import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, FC, Fragment } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

interface DurationDropdownProps {
  selected: any;
  onChange: Dispatch<any>;
  options: any[];
}

const DurationDropdown: FC<DurationDropdownProps> = ({
  selected,
  onChange,
  options,
}) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-full bg-white border rounded-lg shadow-md text-slate-900 text-left flex justify-between items-center py-2 px-4">
          <div className="truncate">{selected.display}</div>
          <div>
            <SelectorIcon className="w-5 h-5 text-slate-500 flex items-center"></SelectorIcon>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* I'm not sure why I have to set the z-index, the images are being drawn on top for some reason*/}
          <Listbox.Options className="absolute mt-1 w-full border bg-white overflow-auto rounded-md bg-white py-1 shadow-lg z-50">
            {options.map((option: any) => (
              <Listbox.Option
                key={option.value}
                value={option}
                className={({ active, selected }) =>
                  `relative py-2 px-4 
                  ${
                    active
                      ? "bg-emerald-100 text-emerald-900"
                      : "text-slate-900"
                  }
                  ${selected ? "bg-emerald-100 text-emerald-900" : null}
                  `
                }
              >
                <div className="block truncate">{option.display}</div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default DurationDropdown;
