type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function FeeSection({ lines, setLines, activeTab }: Props) {
  return (
    <>
      {lines[activeTab].customFees.map((fee: any, index: number) => (
        <div
          key={index}
          className="
            flex
            gap-2
          "
        >
          <input
            type="text"
            placeholder="項目名"
            value={fee.name}
            onChange={(e) => {
              const updated = [...lines];

              updated[activeTab].customFees[index].name = e.target.value;

              setLines(updated);
            }}
            className="
              w-[120px]
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
            value={fee.price === 0 ? "" : fee.price}
            onChange={(e) => {
              const updated = [...lines];

              updated[activeTab].customFees[index].price =
                e.target.value === "" ? 0 : Number(e.target.value);

              setLines(updated);
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

              updated[activeTab].customFees = updated[
                activeTab
              ].customFees.filter((_: any, i: number) => i !== index);

              setLines(updated);
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
      ))}

      <button
        onClick={() => {
          const updated = [...lines];

          updated[activeTab].customFees.push({
            name: "",
            price: 0,
          });

          setLines(updated);
        }}
        className="
          w-full
          h-[44px]
          rounded-xl
          border
          border-gray-500
          text-gray-700
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
