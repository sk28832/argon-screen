"use client";

import { useEffect, useState } from "react";
import { ClinicalTrial } from "@/types";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { FilterPanel } from "@/components/filter-panel";
import { SearchBar } from "@/components/search-bar";
import { useTrials } from "@/lib/hooks/useTrials";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialTrials, setInitialTrials] = useState<ClinicalTrial[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const loadTrials = async () => {
      try {
        const response = await fetch("/api/trials");
        if (!response.ok) {
          throw new Error("Failed to fetch trials");
        }
        const data = await response.json();
        setInitialTrials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    loadTrials();
  }, []);

  const { trials, filters, updateFilters, clearFilters, stats } =
    useTrials(initialTrials);

  if (error) {
    return (
      <div className="p-4">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <p>{error}</p>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Filter Panel */}
        <FilterPanel
          filters={filters}
          updateFilters={updateFilters}
          clearFilters={clearFilters}
          stats={stats}
          className="hidden lg:block w-80 border-r h-screen sticky top-0 overflow-y-auto p-6"
        />

        {/* Main Content */}
        <div className="flex-1 w-full max-w-full overflow-hidden">
          <div className="p-4 lg:p-8">
            <div className="space-y-4 lg:space-y-8 max-w-[1200px]">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold tracking-tight">
                    Clinical Trials Explorer
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {trials.length} trials found
                  </p>
                </div>

                {/* Mobile Filter Button and Sheet */}
                <div className="lg:hidden">
                  <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                    <SheetTrigger asChild>
                      <span className="hidden" />
                    </SheetTrigger>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMobileFilterOpen(true)}
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                    <SheetContent side="left" className="w-full max-w-xs p-0">
                      <SheetHeader className="px-6 py-4">
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                          Filter clinical trials by status, type, and sponsor
                        </SheetDescription>
                      </SheetHeader>
                      <FilterPanel
                        filters={filters}
                        updateFilters={updateFilters}
                        clearFilters={clearFilters}
                        stats={stats}
                        className="px-6 py-4"
                        isMobile
                      />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <SearchBar
                value={filters.textSearch}
                terms={filters.searchTerms}
                defaultOperator={filters.defaultOperator}
                onSearch={(value) => updateFilters({ textSearch: value })}
                onTermsChange={(terms) => updateFilters({ searchTerms: terms })}
                onDefaultOperatorChange={(operator) =>
                  updateFilters({ defaultOperator: operator })
                }
                className="w-full max-w-2xl"
              />

              <div className="overflow-auto">
                <DataTable columns={columns} data={trials} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}