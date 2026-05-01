import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";

const PhanTrang = ({ next, pre, change, page, total }) => {
  const generPage = () => {
    const pages = [];
    if (total < 4) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (page < 2) {
        pages.push(1, 2, 3, "...", total);
      } else if (page >= total - 1) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", page, "...", total);
      }
    }
    return pages;
  };
  const pageShow = generPage();
  return (
    <Pagination>
      <PaginationContent>
        {/* trc */}
        <PaginationItem>
          <PaginationPrevious
            onClick={page === 1 ? undefined : pre}
            className={cn(
              "cursor-pointer, rounded-2xl",
              page === 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
        {/*soos*/}
        {pageShow.map((p, index) => (
          <PaginationItem key={index}>
            {p === "..." ? (
              <PaginationEllipsis className={"rounded-2xl"} />
            ) : (
              <PaginationLink
                onClick={() => {
                  if (p !== page) change(p);
                }}
                isActive={p === page}
                className={"rounded-2xl"}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={page === total ? undefined : next}
            className={cn(
              "cursor-pointer rounded-2xl",
              page === total && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PhanTrang;
