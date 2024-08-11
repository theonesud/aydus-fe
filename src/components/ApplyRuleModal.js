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

export default function ApplyRule({ open, setOpen }) {
  //   const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState({ id: 0, name: "Daily" });

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10 bg-black">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-start p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative ml-auto mr-10 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[70%] sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
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
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="mt-5 text-sm">
                  Don't exclude if total exclusion is {">"}{" "}
                  <input
                    id="email"
                    name="email"
                    type="number"
                    placeholder="10"
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
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor="google"
                        className="font-medium text-gray-900"
                      >
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
                              <CheckIcon
                                aria-hidden="true"
                                className="h-5 w-5"
                              />
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
                  {["s", "m", "t", "w", "t", "f", "s"].map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      className="rounded-full w-10 h-10 capitalize bg-indigo-600 flex items-center justify-center text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <div>{item}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
