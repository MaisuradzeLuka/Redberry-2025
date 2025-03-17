"use client";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from "@/components/ui/menubar";
import { fetchData } from "@/lib/actions";
import {
  departmentsType,
  employeesType,
  FilterTasksType,
  priorities,
} from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import Button from "./Button";
import { trimDepartments } from "@/lib/utils";
import { RxCross1 } from "react-icons/rx";
import { LiaAngleDownSolid } from "react-icons/lia";

const FilterTasks = ({
  selectedDepartments,
  selectedEmployees,
  selectedPriorities,
}: FilterTasksType) => {
  const [filteredTaskTags, setFilteredTaskTags] = useState<
    { id: number; name: string }[]
  >([]);

  const [options, setOptions] = useState<{
    departments?: departmentsType[];
    priorities?: priorities[];
    employees?: employeesType[];
  }>({});

  const [filters, setFilters] = useState({
    departments: new Set<string>(),
    priorities: new Set<string>(),
    employees: new Set<string>(),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

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
      selected: string[]
    ) => items?.filter((item) => selected.includes(String(item.id))) || [];

    setFilteredTaskTags([
      ...filterBySelected(options.priorities, selectedPriorities),
      ...filterBySelected(options.employees, selectedEmployees),
      ...filterBySelected(options.departments, selectedDepartments),
    ]);
  }, [options, selectedPriorities, selectedEmployees, selectedDepartments]);

  const handleCheckboxChange = (
    type: keyof typeof filters,
    id: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const updated = new Set(prev[type]);
      checked ? updated.add(id) : updated.delete(id);
      return { ...prev, [type]: updated };
    });
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      value.size
        ? params.set(key, Array.from(value).join(","))
        : params.delete(key);
    });

    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const onClick = (clearPath: boolean, id?: number) => {
    if (clearPath) {
      setFilteredTaskTags([]);
      router.push(window.location.pathname, { scroll: false });
    } else {
      console.log(searchParams.entries);
    }
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
                  id={String(item.id)}
                  checked={filters.departments.has(String(item.id))}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "departments",
                      String(item.id),
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
                  id={String(item.id)}
                  checked={filters.priorities.has(String(item.id))}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "priorities",
                      String(item.id),
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
            <span>თანამშრომელი</span>
            <LiaAngleDownSolid className="ml-2 text-sm " />
          </MenubarTrigger>

          <MenubarContent
            alignOffset={-415}
            className="flex flex-col gap-5 w-[600px] max-h-[300px] overflow-y-scroll px-8 py-10 bg-white border-primaryPurple !top-10"
          >
            {options.employees?.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Checkbox
                  id={String(item.id)}
                  checked={filters.employees.has(String(item.id))}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "employees",
                      String(item.id),
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
                onClick={() => onClick(false, tag.id)}
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
