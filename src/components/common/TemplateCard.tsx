import React from 'react';
import Paragraph from '../ui/Paragraph';
import Link from 'next/link';
import { ITemplate } from '@/server/models/Template';

const TemplateCard = ({ data }: { data: ITemplate }) => {
  return (
    <div className=" mb-4 overflow-hidden group relative">
      <div className="h-[400px] overflow-hidden relative  rounded-lg">
        <img
          src={data?.thumbnail_url} // A tall image (full page screenshot)
          alt={data?.title}
          className="w-full transition-transform duration-[4000ms] ease-linear group-hover:-translate-y-[60%]"
        />
      </div>

      <div className="flex justify-between gap-5 items-center my-2 text-white">
        <Paragraph className="text-paragraphTextColor line-clamp-1">
          {data?.short_description}
        </Paragraph>
        <p>${data?.price}</p>
      </div>
      <Link
        prefetch={false}
        href={`/services/template-details/${data?.customURL}`}
      >
        <h3 className="text-xl font-semibold text-white">{data?.title}</h3>
      </Link>
    </div>
  );
};

export default TemplateCard;
