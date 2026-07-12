type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function PlanHome5G({ lines, setLines, activeTab }: Props) {
  return (
    <select
      value={lines[activeTab].selectedPlan.name}
      onChange={(e) => {
        const updated = [...lines];

        const priceMap: Record<string, number> = {
          "Home 5G": 5280,
        };

        updated[activeTab].selectedPlan = {
          name: e.target.value,
          price: priceMap[e.target.value] ?? 5280,
        };

        setLines(updated);
      }}
      className="
    w-full
    h-[44px]
    rounded-xl
    border
    px-4
    bg-white
  "
    >
      <option value="Home 5G">Home 5G</option>
    </select>
  );
}
