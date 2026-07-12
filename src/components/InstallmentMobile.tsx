type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function InstallmentMobile({
  lines,
  setLines,
  activeTab,
}: Props) {
  return (
    <select
      value={lines[activeTab].installment}
      onChange={(e) => {
        const updated = [...lines];

        updated[activeTab].installment = Number(e.target.value);

        setLines(updated);
      }}
      className="
        w-full
        h-[44px]
        rounded-xl
        border
        px-4
        text-base
        bg-white
      "
    >
      <option value={0}>プラン変更</option>

      <option value={-1}>SIM契約</option>

      <option value={1}>一括購入</option>

      <option value={12}>12回</option>

      <option value={24}>24回</option>

      <option value={36}>36回</option>

      <option value={23}>カエドキ分割(48回)</option>
    </select>
  );
}
