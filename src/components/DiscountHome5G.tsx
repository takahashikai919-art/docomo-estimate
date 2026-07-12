type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function DiscountHome5G({
  lines,
  setLines: _setLines,
  activeTab,
}: Props) {
  return (
    <>
      <div
        className="
        flex
        items-center
        justify-between
      "
      >
        <div>
          <div className="text-sm font-bold">月々サポート</div>

          <div className="mt-1 text-xs text-red-600">※初月は1,585円割引</div>
        </div>

        <div
          className="
    flex
    items-center
    gap-2
  "
        >
          <div
            className="
      text-xl
      font-bold
      text-green-700
    "
          >
            -¥1,525
          </div>

          <div
            className="
      text-xs
      text-gray-500
    "
          ></div>
        </div>
      </div>

      {lines[activeTab].customDiscounts.map((discount: any, index: number) => (
        <div
          key={index}
          className="
      flex
      gap-2
      mt-4
    "
        >
          <input
            type="text"
            placeholder="割引名"
            value={discount.name}
            onChange={(e) => {
              const updated = [...lines];

              updated[activeTab].customDiscounts[index].name = e.target.value;

              _setLines(updated);
            }}
            className="
        w-[130px]
        h-[38px]
        rounded-xl
        border
        px-3
        text-sm
      "
          />

          <input
            type="number"
            placeholder="金額"
            value={discount.price === 0 ? "" : discount.price}
            onChange={(e) => {
              const updated = [...lines];

              updated[activeTab].customDiscounts[index].price =
                e.target.value === "" ? 0 : Number(e.target.value);

              _setLines(updated);
            }}
            className="
        w-[80px]
        h-[38px]
        rounded-xl
        border
        px-3
        text-sm
      "
          />

          <button
            onClick={() => {
              const updated = [...lines];

              updated[activeTab].customDiscounts = updated[
                activeTab
              ].customDiscounts.filter((_: any, i: number) => i !== index);

              _setLines(updated);
            }}
            className="
        ml-1
        w-[20px]
        h-[20px]
        rounded-xl
        border
        border-red-400
        text-red-500
        text-sm
        font-bold
        shrink-0
        flex
        items-center
        justify-center
      "
          >
            ×
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          const updated = [...lines];

          updated[activeTab].customDiscounts.push({
            name: "",
            price: 0,
          });

          _setLines(updated);
        }}
        className="
    mt-4
    w-full
    h-[44px]
    rounded-xl
    border
    border-green-600
    text-green-700
    text-base
    font-bold
    flex
    items-center
    justify-center
  "
      >
        ＋ 項目を追加
      </button>
    </>
  );
}
