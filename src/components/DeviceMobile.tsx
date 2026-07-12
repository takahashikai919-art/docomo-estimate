type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function DeviceMobile({ lines, setLines, activeTab }: Props) {
  return (
    <input
      type="text"
      value={lines[activeTab].deviceName}
      onChange={(e) => {
        const updated = [...lines];

        updated[activeTab].deviceName = e.target.value;

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
    />
  );
}
