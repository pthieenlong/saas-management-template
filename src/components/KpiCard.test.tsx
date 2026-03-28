import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { LucideIcon } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { renderWithChakra } from "@/test/render";

const MockIcon = (() => <svg data-testid="kpi-icon" />) as unknown as LucideIcon;

describe("KpiCard", () => {
  const defaultProps = {
    label: "Total Revenue",
    value: "$12,400",
    icon: MockIcon,
    color: "primary",
  };

  it("renders label and value", () => {
    renderWithChakra(<KpiCard {...defaultProps} />);
    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("$12,400")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    renderWithChakra(<KpiCard {...defaultProps} />);
    expect(screen.getByTestId("kpi-icon")).toBeInTheDocument();
  });

  it("renders sub text when prop is provided", () => {
    renderWithChakra(<KpiCard {...defaultProps} sub="+8% so với tháng trước" />);
    expect(screen.getByText("+8% so với tháng trước")).toBeInTheDocument();
  });

  it("does not render sub text when prop is omitted", () => {
    renderWithChakra(<KpiCard {...defaultProps} />);
    expect(screen.queryByText(/so với/i)).not.toBeInTheDocument();
  });
});
