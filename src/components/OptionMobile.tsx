type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

export default function OptionMobile({ lines, setLines, activeTab }: Props) {
  return (
    <>
      {lines[activeTab].customOptions.map((option: any, index: number) => (
        <div
          key={index}
          className="
            flex
            items-center
            gap-2
          "
        >
          <input
            type="text"
            placeholder="オプション名"
            value={option.name}
            onChange={(e) => {
              const updated = [...lines];

              updated[activeTab].customOptions[index].name = e.target.value;

              setLines(updated);
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
            value={option.price === 0 ? "" : option.price}
            onChange={(e) => {
              const updated = [...lines];

              updated[activeTab].customOptions[index].price =
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

              updated[activeTab].customOptions = updated[
                activeTab
              ].customOptions.filter((_: any, i: number) => i !== index);

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
              shrink-0
            "
          >
            ×
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          const updated = [...lines];

          updated[activeTab].customOptions.push({
            name: "",
            price: 0,
          });

          setLines(updated);
        }}
        className="
          h-[38px]
          rounded-xl
          border
          border-blue-500
          text-blue-600
          text-sm
          font-bold
        "
      >
        ＋ 項目を追加
      </button>
    </>
  );
}
