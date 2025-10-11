"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type ImportStats = {
  startDate: string;
  importCount: number;
};

const ImportCounter = () => {
  const [stats, setStats] = useState<ImportStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching import stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!stats) {
    return null;
  }

  return (
    <Card className="mt-8 bg-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-4xl font-bold text-primary mb-2">
            {stats.importCount.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {stats.importCount === 1
              ? "person has imported their calendar since October 11th, 2025"
              : "people have imported their calendars since October 11th, 2025"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportCounter;
