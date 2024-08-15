"use client";
import React, { useEffect, useState } from "react";
import AnalyticsTable from "@/components/Table";
import FilterComponent from "@/components/FilterComponent";
import Layout from "@/components/Layout";
import { parse } from "papaparse";
import { saveAs } from "file-saver";
import { Stack, Chip, Box, CircularProgress } from "@mui/material";
import {
  CheckCircleIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  PencilIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";
import AddStopLossRuleModal from "@/components/AddStopLossRuleModal";
import { useRouter } from "next/navigation";
import { getStopLossList } from "@/utils/api";

const ProductAnalyticsPage = () => {
  const [open, setOpen] = useState(false);
  const [stopLoss, setStopLoss] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getStopLossList(
      (data) => {
        setLoading(false);
        setStopLoss(data);
        console.log(data, "skfldsjlf");
      },
      (err) => {
        setLoading(false);
        console.log(err, "skfldsjlf");
      }
    );
  }, []);

  return (
    <div className="min-h-screen">
      <Layout>
        <div className="p-4">
          <div className="flex justify-between items-start w-full pb-10 pt-16">
            <h1 className="text-3xl font-semibold leading-16 text-gray-900 flex-1">
              Enable Product Stop Loss
            </h1>
            <div className="flex justify-end items-start gap-4">
              <div className="flex flex-col items-center justify-start gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <QuestionMarkCircleIcon
                    aria-hidden="true"
                    className="-ml-0.5 h-6 w-6"
                    fill="text-gray-900"
                    color="white"
                  />
                  Exclude Products
                </button>
                <div className="text-sm font-semibold text-gray-900">
                  0 product excluded
                </div>
              </div>
              <button
                // onClick={() => setOpen(true)}
                onClick={() => router.push("/stopLoss/addRule")}
                type="button"
                className="inline-flex items-center gap-x-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PlusIcon
                  aria-hidden="true"
                  className="-ml-0.5 h-6 w-6"
                  fill="text-gray-900"
                  //   color="white"
                />
                Add Rule
              </button>
            </div>
          </div>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="300px"
            >
              <CircularProgress />
            </Box>
          ) : (
            <div className=" mt-5">
              <div className="flex justify-between gap-5">
                <div className=" text-base font-bold basis-4/5">Case</div>
                <div className=" text-base font-bold basis-1/5 text-center">
                  Action
                </div>
              </div>
              <div className=" border border-b-0 w-full border-gray-900 mt-2"></div>
              {stopLoss.map((item) => (
                <div className="flex justify-between gap-5 items-stretch">
                  <div className=" text-base font-bold basis-4/5 py-4">
                    <div className="flex gap-4 text-lg font-medium">
                      {item.rule_name}
                      <span className="rounded-full bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white shadow-sm flex items-center justify-center">
                        Running Custom
                      </span>
                      (Last updated at Aug 1, 2024)
                    </div>
                    <div className=" bg-gray-100 p-8 mt-5">
                      <div className=" text-lg font-bold underline">
                        Exclusion Case
                      </div>
                      <div className=" pt-8 pl-4">
                        <div className=" text-lg font-bold">
                          Metrices Summary -
                        </div>
                        <div className="text-lg font-normal">
                          (Views Greater Than 700 AND Website Revenue Less Than
                          or Equal 0)
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" text-base font-bold basis-1/5 flex items-center justify-center flex-col gap-4">
                    <div className="flex items-center justify-center gap-4">
                      <PencilIcon
                        aria-hidden="true"
                        className="-ml-0.5 h-6 w-6"
                        fill="text-gray-900"
                        stroke={3}
                        color="white"
                      />
                      <ClockIcon
                        aria-hidden="true"
                        className="-ml-0.5 h-6 w-6"
                        fill="text-gray-700"
                        stroke={3}
                        color="white"
                      />
                    </div>
                    <Switch
                      //   checked={enabled}
                      onChange={() =>
                        setStopLoss((prev) => [
                          ...prev.map((stopLoss) => {
                            if (stopLoss.rule_name == item.rule_name) {
                              return {
                                ...stopLoss,
                                enabled: !stopLoss.enabled,
                              };
                            } else return stopLoss;
                          }),
                        ])
                      }
                      checked={item.enabled}
                      className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-gray-900"
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                      />
                    </Switch>
                  </div>
                </div>
              ))}
            </div>
          )}
          <AddStopLossRuleModal open={open} setOpen={setOpen} />
        </div>
      </Layout>
    </div>
  );
};

export default ProductAnalyticsPage;
