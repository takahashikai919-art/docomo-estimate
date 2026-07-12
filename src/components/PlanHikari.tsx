type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function PlanHikari({ lines, setLines, activeTab }: Props) {
  return (
    <select
      value={lines[activeTab].selectedPlan.name}
      onChange={(e) => {
        const updated = [...lines];

        const priceMap: Record<string, number> = {
          "マンション(1G・A)": 4400,
          "戸建(1G・A)": 5720,
          "戸建・マンション(10G・A)": 6380,
          "マンション(1G・B)": 4620,
          "戸建(1G・B)": 5940,
          "戸建・マンション(10G・B)": 6600,
        };

        updated[activeTab].selectedPlan = {
          name: e.target.value,
          price: priceMap[e.target.value] ?? 5720,
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
      <option value="マンション(1G・A)">マンション(1G・A)</option>

      <option value="戸建(1G・A)">戸建(1G・A)</option>

      <option value="戸建・マンション(10G・A)">戸建・マンション(10G・A)</option>

      <option value="マンション(1G・B)">マンション(1G・B)</option>

      <option value="戸建(1G・B)">戸建(1G・B)</option>

      <option value="戸建・マンション(10G・B)">戸建・マンション(10G・B)</option>
    </select>
  );
}
