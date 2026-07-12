type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function DiscountHikari({
  lines: _lines,
  setLines: _setLines,
  activeTab: _activeTab,
}: Props) {
  return (
    <>
      {_lines[_activeTab].customDiscounts.map(
        (discount: any, index: number) => (
          <div
            key={index}
            className="
      flex
      gap-2
      mb-2
    "
          >
            <input
              type="text"
              placeholder="割引名"
              value={discount.name}
              onChange={(e) => {
                const updated = [..._lines];

                updated[_activeTab].customDiscounts[index].name =
                  e.target.value;

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
                const updated = [..._lines];

                updated[_activeTab].customDiscounts[index].price =
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
                const updated = [..._lines];

                updated[_activeTab].customDiscounts = updated[
                  _activeTab
                ].customDiscounts.filter((_: any, i: number) => i !== index);

                _setLines(updated);
              }}
              className="
        w-[20px]
        h-[20px]
        rounded-xl
        border
        border-red-400
        text-red-500
        text-sm
        font-bold
        flex
        items-center
        justify-center
      "
            >
              ×
            </button>
          </div>
        ),
      )}

      <button
        onClick={() => {
          const updated = [..._lines];

          updated[_activeTab].customDiscounts.push({
            name: "",
            price: 0,
          });

          _setLines(updated);
        }}
        className="
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
    mt-2
  "
      >
        ＋ 項目を追加
      </button>
    </>
  );
}
