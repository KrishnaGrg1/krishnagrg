import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface PillProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export const Pill = ({ className, variant = "outline", ...props }: PillProps) => (
  <Badge variant={variant} className={cn("rounded-full", className)} {...props} />
);
