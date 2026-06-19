import { useState, useEffect } from "react";

import { Smartphone, Database, Tag, Wallet, Menu, X } from "lucide-react";

import PrintEstimate from "./components/PrintEstimate";

export default function App() {
  const plans = [
    {
      name: "ドコモMAX（～1GB）",
      price: 5698,
    },

    {
      name: "ドコモMAX（～3GB）",
      price: 6798,
    },

    {
      name: "ドコモMAX（無制限）",
      price: 8448,
    },

    {
      name: "ドコモポイ活MAX",
      price: 11748,
    },

    {
      name: "ドコモmini 4GB",
      price: 2750,
    },

    {
      name: "ドコモmini 10GB",
      price: 3850,
    },

    {
      name: "旧プラン・自由入力",
      price: 0,
    },
  ];

  const discountsByPlan: Record<
    string,
    {
      name: string;
      price: number;
    }[]
  > = {
    "ドコモMAX（～1GB）": [
      {
        name: "みんなドコモ割",
        price: 1210,
      },

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
        name: "みんなドコモ割",
        price: 1210,
      },

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
        name: "みんなドコモ割",
        price: 1210,
      },

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
        name: "みんなドコモ割",
        price: 1210,
      },

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [storeName, setStoreName] = useState("");

  const [staffName, setStaffName] = useState("");

  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const [lines, setLines] = useState([
    {
      deviceName: "",
      devicePrice: 0,
      installment: 24,
      selectedPlan: plans[0],

      selectedDiscounts: [] as string[],

      dcardDiscount: "",
      longTermDiscount: "",

      downPayment: 16500,

      firstPayment: 0,
      residualPrice: 0,
      secondPayment: 0,
      mailCarry: false,

      customPlanName: "",
      customPlanPrice: 0,

      customOptions: [] as {
        name: string;
        price: number;
      }[],
      customDiscounts: [] as {
        name: string;
        price: number;
      }[],
      customFees: [] as {
        name: string;
        price: number;
      }[],
    },

    {
      deviceName: "",
      devicePrice: 0,
      installment: 24,
      selectedPlan: plans[0],

      selectedDiscounts: [] as string[],

      dcardDiscount: "",
      longTermDiscount: "",

      downPayment: 16500,

      firstPayment: 0,
      residualPrice: 0,
      secondPayment: 0,
      mailCarry: false,

      customPlanName: "",
      customPlanPrice: 0,

      customOptions: [] as {
        name: string;
        price: number;
      }[],
      customDiscounts: [] as {
        name: string;
        price: number;
      }[],
      customFees: [] as {
        name: string;
        price: number;
      }[],
    },

    {
      deviceName: "",
      devicePrice: 0,
      installment: 24,
      selectedPlan: plans[0],

      selectedDiscounts: [] as string[],

      dcardDiscount: "",
      longTermDiscount: "",

      downPayment: 16500,

      firstPayment: 0,
      residualPrice: 0,
      secondPayment: 0,
      mailCarry: false,

      customPlanName: "",
      customPlanPrice: 0,

      customOptions: [] as {
        name: string;
        price: number;
      }[],
      customDiscounts: [] as {
        name: string;
        price: number;
      }[],
      customFees: [] as {
        name: string;
        price: number;
      }[],
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("docomo-estimate");

    if (!saved) return;

    const data = JSON.parse(saved);

    if (data.storeName) setStoreName(data.storeName);
    if (data.staffName) setStaffName(data.staffName);
    if (data.lines) {
      const fixedLines = data.lines.map((line: any) => ({
        ...line,

        mailCarry: line.mailCarry ?? false,

        customPlanName: line.customPlanName ?? "",

        customPlanPrice: line.customPlanPrice ?? 0,

        installment: line.installment ?? 24,
      }));

      setLines(fixedLines);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "docomo-estimate",
      JSON.stringify({
        storeName,
        staffName,
        lines,
      }),
    );
  }, [storeName, staffName, lines]);

  const isMiniPlan =
    lines[activeTab].selectedPlan.name === "ドコモmini 4GB" ||
    lines[activeTab].selectedPlan.name === "ドコモmini 10GB";

  const isCustomPlan =
    lines[activeTab].selectedPlan.name === "旧プラン・自由入力";

  const planPrice = isCustomPlan
    ? lines[activeTab].customPlanPrice
    : lines[activeTab].selectedPlan.price;

  const optionTotal =
    lines[activeTab].customOptions.reduce(
      (sum, option) => sum + option.price,
      0,
    ) + (!isCustomPlan && lines[activeTab].mailCarry ? 330 : 0);

  const discountTotal =
    (discountsByPlan[lines[activeTab].selectedPlan.name] || []).reduce(
      (sum, discount) => {
        if (lines[activeTab].selectedDiscounts.includes(discount.name)) {
          return sum + discount.price;
        }

        return sum;
      },

      0,
    ) +
    Number(lines[activeTab].dcardDiscount) +
    Number(lines[activeTab].longTermDiscount) +
    lines[activeTab].customDiscounts.reduce(
      (sum, discount) => sum + discount.price,
      0,
    );

  const estimateDiscounts = [
    ...(discountsByPlan[lines[activeTab].selectedPlan.name] || []).filter(
      (discount) => lines[activeTab].selectedDiscounts.includes(discount.name),
    ),

    ...(Number(lines[activeTab].dcardDiscount) > 0
      ? [
          {
            name: "dカード支払割",
            price: Number(lines[activeTab].dcardDiscount),
          },
        ]
      : []),

    ...(Number(lines[activeTab].longTermDiscount) > 0
      ? [
          {
            name: "長期利用割",
            price: Number(lines[activeTab].longTermDiscount),
          },
        ]
      : []),

    ...lines[activeTab].customDiscounts,
  ];

  const isNoDevice = lines[activeTab].installment === 0;
  const isLumpSum = lines[activeTab].installment === 1;
  const isKaedoki = lines[activeTab].installment === 23;

  const installmentPrice =
    isNoDevice || isLumpSum
      ? 0
      : isKaedoki
        ? lines[activeTab].firstPayment
        : Math.max(
            0,
            Math.trunc(
              (lines[activeTab].devicePrice - lines[activeTab].downPayment) /
                lines[activeTab].installment,
            ),
          );

  const grandTotal = Math.max(
    0,

    installmentPrice + planPrice + optionTotal - discountTotal,
  );

  const grandTotalSecond = Math.max(
    0,
    lines[activeTab].secondPayment + planPrice + optionTotal - discountTotal,
  );

  if (showPrintPreview) {
    return (
      <PrintEstimate
        storeName={storeName}
        staffName={staffName}
        deviceName={lines[activeTab].deviceName}
        planName={
          isCustomPlan
            ? lines[activeTab].customPlanName
            : lines[activeTab].selectedPlan.name
        }
        devicePrice={lines[activeTab].devicePrice}
        options={lines[activeTab].customOptions}
        mailCarry={lines[activeTab].mailCarry}
        discounts={estimateDiscounts}
        optionTotal={optionTotal}
        installmentPrice={installmentPrice}
        discountTotal={discountTotal}
        grandTotal={grandTotal}
        grandTotalSecond={grandTotalSecond}
        onClose={() => setShowPrintPreview(false)}
        isKaedoki={isKaedoki}
        firstPayment={lines[activeTab].firstPayment}
        residualPrice={lines[activeTab].residualPrice}
        secondPayment={lines[activeTab].secondPayment}
        installment={lines[activeTab].installment}
        fees={lines[activeTab].customFees}
      />
    );
  }
  console.log(localStorage.getItem("docomo-lines"));
  return (
    <div
      id="app-root"
      className="
      min-h-screen
      bg-slate-100
      p-4
    "
    >
      <div
        className="
    mb-4
    rounded-xl
    bg-white
    p-4
    shadow
  "
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="mb-1 text-sm font-bold">店舗名</div>

            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="例：札幌○○店"
              className="
          w-full
          h-[40px]
          rounded-xl
          border
          px-3
        "
            />
          </div>

          <div>
            <div className="mb-1 text-sm font-bold">担当者</div>

            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              placeholder="例：山田"
              className="
          w-full
          h-[40px]
          rounded-xl
          border
          px-3
        "
            />
          </div>
        </div>
      </div>

      {/* 上部タブ */}

      <div
        className="
        flex
        items-center
        justify-between
        mb-6
      "
      >
        <div className="flex gap-2 items-center flex-1">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
    h-[44px]
    w-[44px]
    rounded-xl
    border
    bg-white
    flex
    items-center
    justify-center
  "
          >
            <Menu size={20} />
          </button>
          {lines.map((_, index) => (
            <div key={index} className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab(index)}
                className={`
    h-[44px]
    px-3
    rounded-xl
    border
    font-bold
    whitespace-nowrap

    ${activeTab === index ? "bg-blue-600 text-white" : "bg-white"}
  `}
              >
                {index + 1}. {lines[index].deviceName || "未入力"}
              </button>

              <button
                onClick={() => {
                  const copied = structuredClone(lines[index]);

                  setLines([...lines, copied]);
                }}
                className="
    w-[24px]
    h-[24px]
    text-blue-600
    font-bold
  "
              >
                📋
              </button>

              {lines.length > 1 && (
                <button
                  onClick={() => {
                    const updated = lines.filter((_, i) => i !== index);

                    if (activeTab > index) {
                      setActiveTab(activeTab - 1);
                    } else if (activeTab === index) {
                      setActiveTab(Math.max(0, activeTab - 1));
                    }

                    setLines(updated);
                  }}
                  className="
            w-[24px]
            h-[24px]
            text-red-600
            font-bold
          "
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              setLines([
                ...lines,

                {
                  deviceName: "",
                  devicePrice: 0,
                  installment: 24,
                  selectedPlan: plans[0],

                  selectedDiscounts: [],

                  dcardDiscount: "",
                  longTermDiscount: "",

                  downPayment: 16500,

                  firstPayment: 0,
                  residualPrice: 0,
                  secondPayment: 0,

                  mailCarry: false,

                  customPlanName: "",
                  customPlanPrice: 0,

                  customOptions: [],
                  customDiscounts: [],
                  customFees: [],
                },
              ]);
            }}
            className="
       h-[44px]
    px-3
    rounded-xl
    border
    border-dashed
    bg-white
    font-bold
    whitespace-nowrap
  "
          >
            ＋
          </button>

          <button
            onClick={() => {
              if (!confirm("見積内容をすべて削除しますか？")) return;

              localStorage.removeItem("docomo-estimate");

              window.location.reload();
            }}
            className="
    ml-auto
    h-[44px]
    px-4
    rounded-xl
    border
    border-red-400
    text-red-600
    font-bold
    bg-white
  "
          >
            🗑 リセット
          </button>

          <div
            className={`
    fixed
    top-0
    left-0
    h-full
    w-[280px]
    bg-white
    shadow-xl
    z-50
    transition-transform
    duration-300

    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
  `}
          >
            <div
              className="
      h-16
      px-4
      flex
      items-center
      justify-between
      border-b
    "
            >
              <div className="font-bold">メニュー</div>

              <button onClick={() => setIsMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowPrintPreview(true);
                  setIsMenuOpen(false);
                }}
                className="text-left"
              >
                印刷
              </button>

              <button
                onClick={() =>
                  window.open(
                    "https://www.docomo.ne.jp/service/smart_anshin_hoshou/charge.html",
                    "_blank",
                  )
                }
                className="
    text-left
    py-2
  "
              >
                ケータイ補償料金検索
              </button>

              <button
                onClick={() =>
                  window.open(
                    "https://www.docomo.ne.jp/charge/hearty/about.html?icid=CRP_CHA_hearty_to_CRP_CHA_hearty_about&dynaviid=case0004.dynavi",
                    "_blank",
                  )
                }
                className="
    text-left
    py-2
  "
              >
                ハーティ割引内容
              </button>

              <button
                onClick={() =>
                  window.open(
                    "https://www.docomo.ne.jp/campaign_event/5g-welcome_wari/",
                    "_blank",
                  )
                }
                className="
    text-left
    py-2
  "
              >
                5GWELCOME割対象機種一覧
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://www.docomo.ne.jp/campaign_event/",
                    "_blank",
                  )
                }
                className="
    text-left
    py-2
  "
              >
                ドコモキャンペーン一覧
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://docomo-simulator.vercel.app/?utm_source=chatgpt.com",
                    "_blank",
                  )
                }
                className="
    text-left
    py-2
  "
              >
                dカード比較アプリ
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://electric-app-eight.vercel.app/",
                    "_blank",
                  )
                }
                className="
    text-left
    py-2
  "
              >
                電力会社比較アプリ
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div
              className="
      fixed
      inset-0
      bg-black/30
      z-40
    "
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>

      {/* メイン */}

      <div
        className="
        grid
        grid-cols-4
        rounded-2xl
        overflow-hidden
        border
        border-slate-300
        bg-white
      "
      >
        {/* 端末 */}
        <div
          className="
  flex
  flex-col
  justify-between
  border-r
  min-h-[720px]
  "
        >
          <div>
            <div
              className="
      h-[74px]
      px-6
      flex
      items-center
      gap-3
      bg-red-50
      border-b
    "
            >
              <Smartphone className="text-red-600" size={28} />

              <div
                className="
        text-xl
        font-bold
        text-red-700
      "
              >
                端末
              </div>
            </div>

            <div
              className="
  p-4
  space-y-4
"
            >
              {lines[activeTab].installment !== 0 && (
                <>
                  <div>
                    <div
                      className="
          mb-1
          text-base
          font-bold
        "
                    >
                      機種名
                    </div>

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
                  </div>

                  <div>
                    <div
                      className="
          mb-1
          text-base
          font-bold
        "
                    >
                      端末価格（頭金込み）
                    </div>

                    <input
                      type="number"
                      value={
                        lines[activeTab].devicePrice === 0
                          ? ""
                          : lines[activeTab].devicePrice
                      }
                      onChange={(e) => {
                        const updated = [...lines];

                        updated[activeTab].devicePrice =
                          e.target.value === "" ? 0 : Number(e.target.value);

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
                    />
                  </div>
                </>
              )}
              {lines[activeTab].installment !== 0 &&
                lines[activeTab].installment !== 1 && (
                  <div>
                    <div
                      className="
    mb-1
    text-base
    font-bold
  "
                    >
                      頭金
                    </div>

                    <input
                      type="number"
                      value={
                        lines[activeTab].downPayment === 0
                          ? ""
                          : lines[activeTab].downPayment
                      }
                      onChange={(e) => {
                        const updated = [...lines];

                        updated[activeTab].downPayment =
                          e.target.value === "" ? 0 : Number(e.target.value);

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
                    />
                  </div>
                )}
              <div>
                <div
                  className="
          mb-1
          text-base
          font-bold
        "
                >
                  分割回数
                </div>

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
                  <option value={0}>機種購入なし</option>

                  <option value={1}>一括購入</option>

                  <option value={12}>12回</option>

                  <option value={24}>24回</option>

                  <option value={36}>36回</option>

                  <option value={23}>カエドキ分割(48回)</option>
                </select>

                {isKaedoki && (
                  <div
                    className="
  space-y-1
"
                  >
                    {/* 1〜23回 */}

                    <div>
                      <div
                        className="
        mb-1
        text-sm
        font-bold
      "
                      >
                        分割支払い （1〜23か月）
                      </div>

                      <input
                        type="number"
                        value={
                          lines[activeTab].firstPayment === 0
                            ? ""
                            : lines[activeTab].firstPayment
                        }
                        onChange={(e) => {
                          const updated = [...lines];

                          updated[activeTab].firstPayment =
                            e.target.value === "" ? 0 : Number(e.target.value);

                          setLines(updated);
                        }}
                        className="
          w-full
          h-[44px]
          rounded-xl
          border
          px-4
          text-sm
          bg-white
        "
                      />
                    </div>

                    {/* 残価 */}

                    <div>
                      <div
                        className="
        mb-1
        text-sm
        font-bold
      "
                      >
                        残価
                      </div>

                      <input
                        type="number"
                        value={
                          lines[activeTab].residualPrice === 0
                            ? ""
                            : lines[activeTab].residualPrice
                        }
                        onChange={(e) => {
                          const updated = [...lines];

                          updated[activeTab].residualPrice =
                            e.target.value === "" ? 0 : Number(e.target.value);

                          setLines(updated);
                        }}
                        className="
          w-full
          h-[44px]
          rounded-xl
          border
          px-4
          text-sm
          bg-white
        "
                      />
                    </div>

                    {/* 24〜48回 */}

                    <div>
                      <div
                        className="
        mb-1
        text-sm
        font-bold
      "
                      >
                        再分割支払い （24〜48か月）
                      </div>

                      <input
                        type="number"
                        value={
                          lines[activeTab].secondPayment === 0
                            ? ""
                            : lines[activeTab].secondPayment
                        }
                        onChange={(e) => {
                          const updated = [...lines];

                          updated[activeTab].secondPayment =
                            e.target.value === "" ? 0 : Number(e.target.value);

                          setLines(updated);
                        }}
                        className="
          w-full
          h-[44px]
          rounded-xl
          border
          px-4
          text-sm
          bg-white
        "
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="
    h-[100px]
    px-6
    border-t
    bg-red-50
    flex
    items-center
    justify-between
  "
          >
            {isKaedoki ? (
              <div
                className="
  flex
  flex-col
  items-center
  text-center
  leading-tight
"
              >
                <div
                  className="
  text-xl
  font-black
  text-red-600
  whitespace-nowrap
"
                >
                  ¥{lines[activeTab].firstPayment.toLocaleString()}
                  /月 （1〜23か月）
                </div>

                <div
                  className="
      text-xl
      font-black
      text-red-400
      mt-2
    "
                >
                  ¥{lines[activeTab].secondPayment.toLocaleString()}
                  /月 （24〜48か月）
                </div>
              </div>
            ) : (
              <div
                className="
    text-4xl
    font-black
    text-red-600
    whitespace-nowrap
  "
              >
                ¥{Math.max(0, installmentPrice).toLocaleString()}
                /月
              </div>
            )}
          </div>
        </div>
        {/* プラン */}
        <div
          className="
          flex
          flex-col
          justify-between
          border-r
        "
        >
          <div>
            <div
              className="
              h-[74px]
              px-6
              flex
              items-center
              gap-3
              bg-blue-50
              border-b
            "
            >
              <Database className="text-blue-600" size={28} />

              <div
                className="
                text-2xl
                font-bold
                text-blue-700
              "
              >
                プラン / オプション
              </div>
            </div>

            <div
              className="
              p-4
              space-y-6
            "
            >
              <div>
                <div
                  className="
                  mb-1
                  text-base
                  font-bold
                "
                >
                  料金プラン
                </div>

                <select
                  value={lines[activeTab].selectedPlan.name}
                  onChange={(e) => {
                    const found = plans.find(
                      (plan) => plan.name === e.target.value,
                    );

                    if (!found) return;

                    const updated = [...lines];

                    const currentPlan = updated[activeTab].selectedPlan.name;

                    const wasCustom = currentPlan === "旧プラン・自由入力";

                    const willBeCustom = found.name === "旧プラン・自由入力";

                    updated[activeTab].selectedPlan = found;

                    if (!found.name.includes("ドコモmini")) {
                      updated[activeTab].mailCarry = false;
                    }

                    if (found.name.includes("ドコモmini")) {
                      updated[activeTab].longTermDiscount = "";
                      updated[activeTab].selectedDiscounts = [];
                    }

                    if (wasCustom !== willBeCustom) {
                      updated[activeTab].mailCarry = false;

                      updated[activeTab].selectedDiscounts = [];

                      updated[activeTab].dcardDiscount = "";

                      updated[activeTab].longTermDiscount = "";

                      updated[activeTab].customOptions = [];

                      updated[activeTab].customDiscounts = [];
                    }

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
                  {plans.map((plan) => (
                    <option key={plan.name} value={plan.name}>
                      {plan.name}
                    </option>
                  ))}
                </select>
                {isCustomPlan && (
                  <div className="mt-3 space-y-2">
                    <input
                      type="text"
                      placeholder="プラン名"
                      value={lines[activeTab].customPlanName}
                      onChange={(e) => {
                        const updated = [...lines];
                        updated[activeTab].customPlanName = e.target.value;
                        setLines(updated);
                      }}
                      className="
        w-full
        h-[44px]
        rounded-xl
        border
        px-4
      "
                    />

                    <input
                      type="number"
                      placeholder="基本料金"
                      value={
                        lines[activeTab].customPlanPrice === 0
                          ? ""
                          : lines[activeTab].customPlanPrice
                      }
                      onChange={(e) => {
                        const updated = [...lines];
                        updated[activeTab].customPlanPrice =
                          e.target.value === "" ? 0 : Number(e.target.value);

                        setLines(updated);
                      }}
                      className="
        w-full
        h-[44px]
        rounded-xl
        border
        px-4
      "
                    />
                  </div>
                )}
              </div>

              <div
                className="
                flex
                justify-between
                text-xl
                border-b
                pb-5
              "
              >
                <div className="font-medium">基本料</div>

                <div className="font-bold">
                  ¥{Math.max(0, planPrice).toLocaleString()}
                </div>
              </div>

              <div
                className="
                text-base
                font-bold
              "
              >
                オプション
              </div>

              {isMiniPlan && !isCustomPlan && (
                <div
                  className="
      flex
      items-center
      justify-between
    "
                >
                  <label
                    className="
        flex
        items-center
        gap-3
        cursor-pointer
      "
                  >
                    <input
                      type="checkbox"
                      checked={lines[activeTab].mailCarry}
                      onChange={(e) => {
                        const updated = [...lines];

                        updated[activeTab].mailCarry = e.target.checked;

                        setLines(updated);
                      }}
                      className="
          w-5
          h-5
        "
                    />

                    <span
                      className="
          text-base
        "
                    >
                      ドコモメール持ち運び
                    </span>
                  </label>

                  <span
                    className="
        font-bold
        text-xl
      "
                  >
                    ¥330
                  </span>
                </div>
              )}
              <div
                className="
                flex
                flex-col
                gap-5
              "
              >
                <div
                  className="
  flex
  flex-col
  gap-3
"
                >
                  {lines[activeTab].customOptions.map((option, index) => (
                    <div
                      key={index}
                      className="
                      flex
                      items-center
                      gap-2
                    "
                    >
                      {/* 名前 */}

                      <input
                        type="text"
                        placeholder="オプション名"
                        value={option.name}
                        onChange={(e) => {
                          const updated = [...lines];

                          updated[activeTab].customOptions[index].name =
                            e.target.value;

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

                      {/* 金額 */}

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
                          ].customOptions.filter((_, i) => i !== index);

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

                  {/* 追加ボタン */}

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
                </div>
              </div>
            </div>
          </div>

          <div
            className="
            h-[100px]
            px-6
            border-t
            bg-blue-50
            flex
            items-center
            justify-between
          "
          >
            <div
              className="
              text-4xl
              font-black
              text-blue-600
            "
            >
              ¥{Math.max(0, planPrice + optionTotal).toLocaleString()}
            </div>
          </div>
        </div>
        {/* 割引 */}
        <div
          className="
    flex
    flex-col
    justify-between
    border-r
  "
        >
          <div>
            <div
              className="
        h-[74px]
        px-6
        flex
        items-center
        gap-3
        bg-green-50
        border-b
      "
            >
              <Tag className="text-green-600" size={28} />

              <div
                className="
          text-2xl
          font-bold
          text-green-700
        "
              >
                割引
              </div>
            </div>

            <div
              className="
        p-4
        flex
        flex-col
        gap-4
      "
            >
              {!isCustomPlan && (
                <>
                  {/* dカード割 */}
                  <div>
                    <div
                      className="
            mb-1
            text-sm
            font-bold
          "
                    >
                      dカード支払割
                    </div>

                    <select
                      value={lines[activeTab].dcardDiscount}
                      onChange={(e) => {
                        const updated = [...lines];

                        updated[activeTab].dcardDiscount = e.target.value;

                        setLines(updated);
                      }}
                      className="
            w-full
            h-[38px]
            rounded-xl
            border
            px-3
            text-sm
          "
                    >
                      <option value="">選択なし</option>

                      <option value="220">dカード（220円）</option>

                      <option value="550">GOLD / PLATINUM（550円）</option>
                    </select>
                  </div>
                  {/* 長期利用割 */}

                  {!lines[activeTab].selectedPlan.name.includes(
                    "ドコモmini",
                  ) && (
                    <div>
                      <div
                        className="
        mb-1
        text-sm
        font-bold
      "
                      >
                        長期利用割
                      </div>

                      <select
                        value={lines[activeTab].longTermDiscount}
                        onChange={(e) => {
                          const updated = [...lines];

                          updated[activeTab].longTermDiscount = e.target.value;

                          setLines(updated);
                        }}
                        className="
        w-full
        h-[38px]
        rounded-xl
        border
        px-3
        text-sm
      "
                      >
                        <option value="">選択なし</option>

                        <option value="110">10年以上（110円）</option>

                        <option value="220">20年以上（220円）</option>
                      </select>
                    </div>
                  )}
                  {/* 固定割引 */}
                  {(
                    discountsByPlan[lines[activeTab].selectedPlan.name] || []
                  ).map((discount: { name: string; price: number }) => (
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
                          className="
                  w-5
                  h-5
                "
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
                                (name) => name !== discount.name,
                              );
                            }

                            setLines(updated);
                          }}
                        />

                        <div className="text-sm">{discount.name}</div>
                      </div>

                      <div
                        className="
                text-xl
                font-bold
                text-green-700
              "
                      >
                        -¥
                        {discount.price.toLocaleString()}
                      </div>
                    </label>
                  ))}
                </>
              )}
              {/* カスタム割引 */}
              {lines[activeTab].customDiscounts.map((discount, index) => (
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

                      updated[activeTab].customDiscounts[index].name =
                        e.target.value;

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
                      ].customDiscounts.filter((_, i) => i !== index);

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
            </div>
          </div>

          <div
            className="
      h-[100px]
      px-6
      border-t
      bg-green-50
      flex
      items-center
      justify-between
    "
          >
            <div
              className="
        text-4xl
        font-black
        text-green-600
      "
            >
              -¥
              {discountTotal.toLocaleString()}
            </div>
          </div>
        </div>
        {/* 手数料・付属品 */}
        <div
          className="
          flex
          flex-col
          justify-between
        "
        >
          <div>
            <div
              className="
              h-[74px]
              px-6
              flex
              items-center
              gap-3
              bg-gray-100
              border-b
            "
            >
              <Wallet className="text-gray-600" size={28} />

              <div
                className="
                text-2xl
                font-bold
                text-gray-600
              "
              >
                手数料・付属品
              </div>
            </div>

            <div
              className="
              p-4
              flex
              flex-col
              gap-8
            "
            >
              {lines[activeTab].customFees.map((fee, index) => (
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

                      updated[activeTab].customFees[index].name =
                        e.target.value;

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
                      ].customFees.filter((_, i) => i !== index);

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
            </div>
          </div>

          <div
            className="
            h-[100px]
            px-6
            border-t
            bg-purple-50
            flex
            items-center
            justify-between
          "
          >
            <div
              className="
              text-xl
              font-bold
              text-purple-700
            "
            >
              合計
            </div>

            {isKaedoki ? (
              <div className="flex flex-col items-end">
                <div className="w-[260px] text-left text-2xl font-black text-purple-700">
                  ¥{grandTotal.toLocaleString()}
                  <span className="ml-2 text-xs font-bold">（1〜23回）</span>
                </div>

                <div className="w-[260px] text-left text-2xl font-black text-purple-700">
                  ¥{grandTotalSecond.toLocaleString()}
                  <span className="ml-2 text-xs font-bold">（24〜48回）</span>
                </div>
              </div>
            ) : (
              <div
                className="
      text-4xl
      font-black
      text-purple-700
    "
              >
                ¥{grandTotal.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
