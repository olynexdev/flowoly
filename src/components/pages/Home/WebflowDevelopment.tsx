"use client";
import TemplateCard from "@/components/common/TemplateCard";
import Container from "@/components/global/Container";
import CategoryDropdown from "@/components/ui/CategoryDropdown";
import { useGetCategoriesQuery, useGetTemplatesQuery } from "@/redux/api";
import { setCategory, setSearchQuery } from "@/redux/slices/templateSlice";
import { RootState } from "@/redux/store";
import { ITemplate } from "@/server/models/Template";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const WebflowDevelopment = () => {
  const dispatch = useDispatch();
  const { selectedCategory, searchQuery } = useSelector(
    (state: RootState) => state.templates
  );
  const {
    data: templates = [],
    isLoading: templateLoading,
    isFetching,
  } = useGetTemplatesQuery({ category: selectedCategory, search: searchQuery });

  const { data: categories = [], isLoading: categoryLoading } =
    useGetCategoriesQuery(undefined);

  return (
    <div className="bg-[#000101] py-sectionPadding min-h-screen">
      <Container>
        <div className="mb-[60px] flex gap-3 items-center w-full bg-[#0f1720] p-4 rounded-xl">
          <div className="flex flex-wrap gap-3">
            {categoryLoading ? (
              <div className="flex flex-wrap gap-3">
                {/* Skeleton for Category Buttons */}
                <div className="py-2 h-12 lg:py-4 px-6 rounded-lg bg-gray-300 animate-pulse w-[250px]"></div>
              </div>
            ) : (
              <div>
                <CategoryDropdown
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onApply={(selected) => {
                    // keep compatibility with your existing setCategory (single value)
                    // if nothing selected -> 'all', if 1 selected -> that category,
                    // if >1 selected -> join them with commas (adjust to your backend needs)
                    if (!selected || selected.length === 0) {
                      dispatch(setCategory("all"));
                    } else if (selected.length === 1) {
                      dispatch(setCategory(selected[0]));
                    } else {
                      // example: join, or you can dispatch a different action for multi-select
                      dispatch(setCategory(selected.join(",")));
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div className="relative w-full bg-[#000101] rounded-lg">
            <input
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              type="text"
              name="search"
              placeholder="Search here"
              className="py-[14px] px-[24px] bg-transparent rounded-lg border border-[#b3bcb580] text-white w-full"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M13.166 13.1667L17.3327 17.3334M15.2493 7.95835C15.2493 11.9854 11.9848 15.25 7.95768 15.25C3.93061 15.25 0.666016 11.9854 0.666016 7.95835C0.666016 3.93128 3.93061 0.666687 7.95768 0.666687C11.9848 0.666687 15.2493 3.93128 15.2493 7.95835Z"
                  stroke="#D2D2D2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Search Icon */}
          </div>
        </div>
        {templateLoading || isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="py-2 md:py-3 lg:py-4 px-6 rounded-lg bg-gray-300 animate-pulse w-full h-[300px]"
              ></div>
            ))}
          </div>
        ) : (
          <>
            {templates?.length === 0 ? (
              <p className="text-center mt-20 text-white">No templates found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates?.map((template: ITemplate, index: number) => (
                  <div key={index} className="">
                    <TemplateCard data={template} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default WebflowDevelopment;
