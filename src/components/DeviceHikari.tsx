type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function DeviceHikari({ lines, setLines, activeTab }: Props) {
  return (
    <select
      value={lines[activeTab].contractType}
      onChange={(e) => {
        const updated = [...lines];

        updated[activeTab].contractType = e.target.value;

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
      <option value="ドコモ光">ドコモ光</option>
    </select>
  );
}
