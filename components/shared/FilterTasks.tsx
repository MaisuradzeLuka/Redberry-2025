"use client";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from "@/components/ui/menubar";
import { fetchData } from "@/lib/actions";
import {
  DepartmentsType,
  EmployeesType,
  FilterTasksType,
  PrioritiesType,
} from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import Button from "./Button";
import { trimDepartments } from "@/lib/utils";
import { RxCross1 } from "react-icons/rx";
import { LiaAngleDownSolid } from "react-icons/lia";
import Image from "next/image";

const FilterTasks = ({
  selectedDepartments,
  selectedEmployees,
  selectedPriorities,
}: FilterTasksType) => {
  const isFirstRender = useRef(true);
  const [filteredTaskTags, setFilteredTaskTags] = useState<
    { id: number; name: string; filterName: string }[]
  >([]);

  const [searchUrl, setSearchUrl] = useState("");
  const searchParams = new URLSearchParams(window.location.search);

  const [options, setOptions] = useState<{
    departments?: DepartmentsType[];
    priorities?: PrioritiesType[];
    employees?: EmployeesType[];
  }>({});

  const [selectedFilters, setSelectedFilters] = useState<{
    departments: string[];
    priorities: string[];
    employees: string[];
  }>({
    departments: selectedDepartments || [],
    priorities: selectedPriorities || [],
    employees: selectedEmployees || [],
  });
  const router = useRouter();

  useEffect(() => {
    const fetchOptions = async () => {
      const [priorities, departments, employees] = await Promise.all([
        fetchData("priorities"),
        fetchData("departments"),
        fetchData("employees"),
      ]);

      setOptions({
        priorities: priorities || [],
        departments: departments || [],
        employees: employees || [],
      });
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const filterBySelected = (
      items: { id: number; name: string }[] | undefined,
      selected: string[],
      filterName: string
    ) =>
      items
        ?.filter((item) => selected.includes(String(item.id)))
        .map((item) => ({ ...item, filterName })) || [];

    setFilteredTaskTags([
      ...filterBySelected(options.priorities, selectedPriorities, "priorities"),
      ...filterBySelected(options.employees, selectedEmployees, "employees"),
      ...filterBySelected(
        options.departments,
        selectedDepartments,
        "departments"
      ),
    ]);
  }, [options, selectedPriorities, selectedEmployees, selectedDepartments]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    router.push(`${window.location.pathname}?${searchUrl}`, {
      scroll: false,
    });
  }, [searchUrl]);

  const handleCheckboxChange = (
    name: keyof typeof selectedFilters,
    id: number,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const updatedArray = checked
        ? [...prev[name], String(id)]
        : prev[name].filter((param) => param !== String(id));

      return {
        ...prev,
        [name]: updatedArray,
      };
    });
  };

  const applyFilters = () => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(selectedFilters).forEach(([key, value]) => {
      value.length ? searchParams.set(key, value.toString()) : "";
    });

    const newPath = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPath, { scroll: false });
  };

  const onClick = (clearPath: boolean, id?: number) => {
    if (clearPath) {
      setFilteredTaskTags([]);
      setSelectedFilters({ departments: [], priorities: [], employees: [] });
      router.push(window.location.pathname, { scroll: false });
    }
  };

  const removeParamValue = (paramName: string, valueToRemove: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    const values = searchParams.get(paramName)?.split(",") || [];

    const updatedValues = values.filter((value) => value !== valueToRemove);

    searchParams.delete(paramName);

    if (updatedValues.length) {
      searchParams.append(paramName, updatedValues.toString());
    }
    const newPath = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPath, { scroll: false });
  };

  return (
    <>
      <Menubar
        className={` w-[600px] flex justify-between gap-11 border border-[#DEE2E6] rounded-[10px] px-5 py-4 mt-13 ${
          filteredTaskTags.length ? "" : "mb-20"
        }`}
      >
        <MenubarMenu>
          <MenubarTrigger className="text-[16px] font-normal data-[state=open]:text-[#8338EC] data-[state=open]:[&>*:last-child]:rotate-180">
            <span>დეპარტამენტი</span>
            <LiaAngleDownSolid className="ml-2 text-sm " />
          </MenubarTrigger>

          <MenubarContent
            alignOffset={-20}
            className="flex flex-col gap-5 w-[600px] max-h-[300px] overflow-y-scroll px-8 py-10 bg-white border-primaryPurple !top-10"
          >
            {options.departments?.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Checkbox
                  className="w-[22px] h-[22px] rounded-md text-[#212529] border-[#212529]"
                  id={String(item.id)}
                  checked={selectedFilters.departments.includes(
                    String(item.id)
                  )}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "departments",
                      item.id,
                      checked as boolean
                    )
                  }
                />
                <label
                  htmlFor={String(item.id)}
                  className="text-sm font-normal"
                >
                  {item.name}
                </label>
              </div>
            ))}
            <Button
              onClick={applyFilters}
              classname="bg-primaryPurple text-white !rounded-full w-max self-end"
            >
              არჩევა
            </Button>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-[16px] font-normal data-[state=open]:text-[#8338EC] data-[state=open]:[&>*:last-child]:rotate-180">
            <span>პრიორიტეტი</span>
            <LiaAngleDownSolid className="ml-2 text-sm " />
          </MenubarTrigger>

          <MenubarContent
            alignOffset={-225}
            className="flex flex-col gap-5 w-[600px] max-h-[300px] overflow-y-scroll px-8 py-10 bg-white border-primaryPurple !top-10"
          >
            {options.priorities?.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Checkbox
                  className="w-[22px] h-[22px] rounded-md text-[#212529] border-[#212529]"
                  id={String(item.id)}
                  checked={selectedFilters.priorities.includes(String(item.id))}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "priorities",
                      item.id,
                      checked as boolean
                    )
                  }
                />
                <label
                  htmlFor={String(item.id)}
                  className="text-sm font-normal"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.icon}
                      alt="priority icon"
                      width={28}
                      height={28}
                      className=" w-7 h-7"
                    />
                    <span>{item.name}</span>
                  </div>
                </label>
              </div>
            ))}
            <Button
              onClick={applyFilters}
              classname="bg-primaryPurple text-white !rounded-full w-max self-end"
            >
              არჩევა
            </Button>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-[16px] font-normal data-[state=open]:text-[#8338EC] data-[state=open]:[&>*:last-child]:rotate-180">
            <span>თანამშრომელი</span>
            <LiaAngleDownSolid className="ml-2 text-sm " />
          </MenubarTrigger>

          <MenubarContent
            alignOffset={-415}
            className="flex flex-col gap-5 w-[600px] max-h-[300px] overflow-y-scroll px-8 py-10 bg-white border-primaryPurple !top-10"
          >
            {options.employees?.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <Checkbox
                  className="w-[22px] h-[22px] rounded-md text-[#212529] border-[#212529]"
                  id={String(item.id)}
                  checked={selectedFilters.employees.includes(String(item.id))}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "employees",
                      item.id,
                      checked as boolean
                    )
                  }
                />

                <label
                  htmlFor={String(item.id)}
                  className="text-sm font-normal"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.avatar}
                      alt="employee avatar"
                      width={28}
                      height={28}
                      className="rounded-full w-7 h-7"
                    />
                    <span>{item.name}</span>
                  </div>
                </label>
              </div>
            ))}
            <Button
              onClick={applyFilters}
              classname="bg-primaryPurple text-white !rounded-full w-max self-end"
            >
              არჩევა
            </Button>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {filteredTaskTags.length ? (
        <ul className=" flex items-center gap-2 text-[#343A40] my-6">
          {filteredTaskTags.map((tag, index) => (
            <li
              key={index}
              className="w-max flex items-center gap-2 border border-[#CED4DA] text-sm px-3 py-1 rounded-full"
            >
              {trimDepartments(tag.name)}
              <button
                className="cursor-pointer"
                onClick={() => removeParamValue(tag.filterName, String(tag.id))}
              >
                <RxCross1 />
              </button>
            </li>
          ))}

          <button className="cursor-pointer ml-4" onClick={() => onClick(true)}>
            გასუფთავება
          </button>
        </ul>
      ) : (
        ""
      )}
    </>
  );
};

export default FilterTasks;
