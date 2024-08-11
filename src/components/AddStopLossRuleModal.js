"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ArrowRightIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function AddStopLossRuleModal({ open, setOpen }) {
  //   const [open, setOpen] = useState(true);

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
            <div className="flex justify-between items-center w-full">
              <h1 className="text-xl font-semibold leading-16 text-gray-900 flex-1">
                Create Stop Loss
              </h1>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Product Stoploss Rule
              </button>
            </div>
            <div className=" bg-gray-100 rounded mt-5">
              <div className=" text-base font-semibold p-4">
                Exclusion details
              </div>
              <div className=" border border-white"></div>
              <div className="p-4">
                <div className="flex justify-start items-stretch gap-5">
                  <div className=" basis-[25%] bg-white border border-gray-900 rounded-xl">
                    <div className="w-full bg-blue-50 p-2 rounded-t-xl text-base font-medium">
                      Filters
                    </div>
                    <div className="py-5 px-2 w-full flex justify-start items-stretch flex-col gap-5">
                      <button
                        type="button"
                        className="inline-flex items-center justify-between gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Metrics
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="-mr-0.5 h-5 w-5"
                        />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-between gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Attributes
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="-mr-0.5 h-5 w-5"
                        />
                      </button>
                    </div>
                  </div>
                  <div className=" basis-[75%] p-4 bg-white rounded-md shadow-sm ring-1 ring-gray-900/5">
                    <div className="text-lg font-bold">
                      Select your product metrics
                    </div>
                    <div className=" text-sm font-normal mt-4">
                      Customize your stoploss with a variety of advanced metrics
                    </div>
                    <button
                      type="button"
                      className="inline-flex mt-4 items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <PlusIcon
                        aria-hidden="true"
                        className="-ml-0.5 h-6 w-6"
                        fill="text-gray-900"
                        //   color="white"
                      />
                      Add Metrics Filter
                    </button>
                  </div>
                </div>
                <div className="w-full flex items-center justify-end mt-5">
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
