import {
  applyHome5GDefaults,
  applyHikariDefaults,
} from "../utils/applyDefaults";

type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function DeviceHome5G({ lines, setLines, activeTab }: Props) {
  return (
    <select
      value={lines[activeTab].contractType}
      onChange={(e) => {
        const updated = [...lines];

        updated[activeTab].contractType = e.target.value;

        if (e.target.value === "Home 5G") {
          applyHome5GDefaults(updated[activeTab]);
        } else {
          applyHikariDefaults(updated[activeTab]);
        }

        setLines(updated);
      }}
      className="
        w-full
        h-[40px]
        rounded-xl
        border
        px-3
        text-base
        bg-white
      "
    >
      <option value="Home 5G">Home 5G</option>
      <option value="ドコモ光">ドコモ光</option>
    </select>
  );
}
