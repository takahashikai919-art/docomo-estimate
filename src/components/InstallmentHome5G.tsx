type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function InstallmentHome5G({
  lines,
  setLines,
  activeTab,
}: Props) {
  return (
    <>
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
        <option value={1}>一括</option>

        <option value={12}>12回</option>

        <option value={24}>24回</option>

        <option value={36}>36回</option>

        <option value={48}>48回</option>
      </select>

      {lines[activeTab].installment === 48 && (
        <div className="mt-1 text-xs text-red-600">
          初回のみ1,538円のお支払いとなります
        </div>
      )}

      {lines[activeTab].installment === 24 && (
        <div className="mt-1 text-xs text-red-600">
          初回のみ3,064円のお支払いとなります
        </div>
      )}
    </>
  );
}
