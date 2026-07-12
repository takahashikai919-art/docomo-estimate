type Props = {
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: number;
};

const discountsByPlan: Record<
  string,
  {
    name: string;
    price: number;
  }[]
> = {
  "ドコモMAX（～1GB）": [
    {
      name: "ドコモ光セット割",
      price: 1210,
    },
    {
      name: "でんきセット割",
      price: 110,
    },
  ],
  "ドコモMAX（～3GB）": [
    {
      name: "ドコモ光セット割",
      price: 1210,
    },
    {
      name: "でんきセット割",
      price: 110,
    },
  ],
  "ドコモMAX（無制限）": [
    {
      name: "ドコモ光セット割",
      price: 1210,
    },
    {
      name: "でんきセット割",
      price: 110,
    },
  ],
  ドコモポイ活MAX: [
    {
      name: "ドコモ光セット割",
      price: 1210,
    },
    {
      name: "でんきセット割",
      price: 110,
    },
  ],
  "ドコモmini 4GB": [
    {
      name: "ドコモ光セット割",
      price: 1210,
    },
    {
      name: "でんきセット割",
      price: 110,
    },
  ],
  "ドコモmini 10GB": [
    {
      name: "ドコモ光セット割",
      price: 1210,
    },
    {
      name: "でんきセット割",
      price: 110,
    },
  ],
};

export default function DiscountMobile({ lines, setLines, activeTab }: Props) {
  const selectedPlanName = lines[activeTab].selectedPlan.name;
  const fixedDiscounts = discountsByPlan[selectedPlanName] || [];
  const isMiniPlan =
    selectedPlanName === "ドコモmini 4GB" ||
    selectedPlanName === "ドコモmini 10GB";

  const isCustomPlan = selectedPlanName === "旧プラン・自由入力";

  return (
    <>
      {!isCustomPlan && (
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">dカード支払割</div>

          <select
            value={lines[activeTab].dcardDiscount}
            onChange={(e) => {
              const updated = [...lines];
              updated[activeTab].dcardDiscount = e.target.value;
              setLines(updated);
            }}
            className="
            w-[140px]
            h-[38px]
            rounded-xl
            border
            px-3
            text-sm
            bg-white
          "
          >
            <option value="">選択なし</option>
            <option value="220">dカード（220円）</option>
            <option value="550">GOLD / PLATINUM（550円）</option>
          </select>
        </div>
      )}

      {!isMiniPlan && !isCustomPlan && (
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">長期利用割</div>

          <select
            value={lines[activeTab].longTermDiscount}
            onChange={(e) => {
              const updated = [...lines];
              updated[activeTab].longTermDiscount = e.target.value;
              setLines(updated);
            }}
            className="
              w-[140px]
              h-[38px]
              rounded-xl
              border
              px-3
              text-sm
              bg-white
            "
          >
            <option value="">選択なし</option>
            <option value="110">10年以上（110円）</option>
            <option value="220">20年以上（220円）</option>
          </select>
        </div>
      )}

      {!isMiniPlan && !isCustomPlan && (
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">みんなドコモ割</div>

          <select
            value={lines[activeTab].familyDiscount}
            onChange={(e) => {
              const updated = [...lines];
              updated[activeTab].familyDiscount = e.target.value;
              setLines(updated);
            }}
            className="
              w-[140px]
              h-[38px]
              rounded-xl
              border
              px-3
              text-sm
              bg-white
            "
          >
            <option value="">選択なし</option>
            <option value="550">2回線（550円）</option>
            <option value="1210">3回線以上（1,210円）</option>
          </select>
        </div>
      )}

      {!isCustomPlan && (
        <div className="flex flex-col gap-4">
          {fixedDiscounts.map((discount: { name: string; price: number }) => (
            <label
              key={discount.name}
              className="
          flex
          items-center
          justify-between
        "
            >
              <div
                className="
            flex
            items-center
            gap-4
          "
              >
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={lines[activeTab].selectedDiscounts.includes(
                    discount.name,
                  )}
                  onChange={(e) => {
                    const updated = [...lines];

                    if (e.target.checked) {
                      updated[activeTab].selectedDiscounts = [
                        ...updated[activeTab].selectedDiscounts,
                        discount.name,
                      ];
                    } else {
                      updated[activeTab].selectedDiscounts = updated[
                        activeTab
                      ].selectedDiscounts.filter(
                        (name: string) => name !== discount.name,
                      );
                    }

                    setLines(updated);
                  }}
                />

                <div className="text-sm">{discount.name}</div>
              </div>

              <div className="text-xl font-bold text-green-700">
                -¥{discount.price.toLocaleString()}
              </div>
            </label>
          ))}
        </div>
      )}

      {lines[activeTab].customDiscounts.map((discount: any, index: number) => (
        <div
          key={index}
          className="
                flex
                gap-2
              "
        >
          <input
            type="text"
            placeholder="割引名"
            value={discount.name}
            onChange={(e) => {
              const updated = [...lines];
              updated[activeTab].customDiscounts[index].name = e.target.value;
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
            value={discount.price === 0 ? "" : discount.price}
            onChange={(e) => {
              const updated = [...lines];
              updated[activeTab].customDiscounts[index].price =
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
              updated[activeTab].customDiscounts = updated[
                activeTab
              ].customDiscounts.filter((_: any, i: number) => i !== index);
              setLines(updated);
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
          setLines(updated);
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
          "
      >
        ＋ 項目を追加
      </button>
    </>
  );
}
