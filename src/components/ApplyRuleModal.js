"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Box, Button, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ApplyRule({ open, setOpen, handleApply = () => {} }) {
  //   const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState({ id: 0, name: "Daily" });
  const [ruleData, setRuleData] = useState({
    rule_name: "",
    exclusion_limit: 0,
    exclude_google: false,
    exclude_fb: false,
    repeats_on: [
      { day: "Sunday", isSelected: false },
      { day: "Monday", isSelected: false },
      { day: "Tuesday", isSelected: false },
      { day: "Wednesday", isSelected: false },
      { day: "Thursday", isSelected: false },
      { day: "Friday", isSelected: false },
      { day: "Saturday", isSelected: false },
    ],
  });

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1100,
          height: 700,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          py: 7,
          borderRadius: 1,
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          height: "auto",
          // width: "auto",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="flex w-full items-start justify-between gap-16">
          <div>
            <div>
              <label
                htmlFor="ruleName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Rule Name
              </label>
              <div className="mt-2">
                <input
                  id="ruleName"
                  name="ruleName"
                  type="text"
                  placeholder="abcd"
                  value={ruleData.rule_name}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setRuleData({ ...ruleData, rule_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-5 text-sm">
              Don't exclude if total exclusion is {">"}{" "}
              <input
                id="exclusionLimit"
                name="exclusionLimit"
                type="number"
                placeholder="10"
                value={ruleData.exclusion_limit}
                onChange={(e) =>
                  setRuleData({
                    ...ruleData,
                    exclusion_limit: e.target.value,
                  })
                }
                className="rounded-md text-center w-12 border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />{" "}
              % of products
            </div>
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="recommendations"
                    name="recommendations"
                    type="checkbox"
                    aria-describedby="recommendations-description"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="recommendations"
                    className="font-medium text-gray-900"
                  >
                    Don't apply Stop Loss, only give recommendations
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="facebook"
                    name="facebook"
                    type="checkbox"
                    aria-describedby="facebook-description"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value={ruleData.exclude_fb}
                    onChange={(e) =>
                      setRuleData({
                        ...ruleData,
                        exclude_fb: !ruleData.exclude_fb,
                      })
                    }
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor="facebook"
                    className="font-medium text-gray-900"
                  >
                    Exclude products on Facebook
                  </label>
                </div>
              </div>
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="google"
                    name="google"
                    type="checkbox"
                    aria-describedby="google-description"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    value={ruleData.exclude_google}
                    onChange={(e) =>
                      setRuleData({
                        ...ruleData,
                        exclude_google: !ruleData.exclude_google,
                      })
                    }
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="google" className="font-medium text-gray-900">
                    Exclude products on google
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100 rounded mt-5 p-4">
          <div className=" text-base font-semibold">
            Stop Loss Running Details
          </div>
          <div className="flex items-center justify-start gap-2">
            <div>Product Stop Loss running schedule will be </div>
            <div>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-2">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                    </span>
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute bottom-full z-10 mb-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                  >
                    {[
                      { id: 0, name: "Daily" },
                      { id: 1, name: "Weekly" },
                      { id: 2, name: "Monthly" },
                      { id: 3, name: "Yearly" },
                    ].map((person) => (
                      <ListboxOption
                        key={person.id}
                        value={person}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                      >
                        <span className="block truncate font-normal group-data-[selected]:font-semibold">
                          {person.name}
                        </span>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="flex items-center justify-normal gap-5 mt-5">
            <div>Repeat On</div>
            <div className="flex items-center justify-start gap-5">
              {ruleData.repeats_on.map((item, index) => (
                <button
                  onClick={() =>
                    setRuleData({
                      ...ruleData,
                      repeats_on: [
                        ...ruleData.repeats_on.map((day) => {
                          if (day.day === item.day) {
                            return { ...day, isSelected: !day.isSelected };
                          } else return day;
                        }),
                      ],
                    })
                  }
                  key={index}
                  type="button"
                  className={`rounded-full w-10 h-10 capitalize ${
                    item.isSelected ? "bg-indigo-600" : "bg-white"
                  } flex items-center justify-center ${
                    item.isSelected ? "text-white" : "text-black"
                  } shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  <div>{item.day.charAt(0)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end mt-5">
          <Button
            variant="contained"
            onClick={() => {
              handleApply(ruleData);
            }}
            sx={{
              // position: "absolute",
              // bottom: 16,
              // right: 16,
              width: "100px",
              height: "40px",
            }}
          >
            Apply
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
