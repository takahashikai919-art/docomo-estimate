import {
  applyHome5GDefaults,
  applyHikariDefaults,
  applyMobileDefaults,
} from "./utils/applyDefaults";

import { useState, useEffect } from "react";

import { Smartphone, Database, Tag, Wallet, Menu, X } from "lucide-react";

import FeeSection from "./components/FeeSection";

import GrandTotal from "./components/GrandTotal";

import PrintEstimate from "./components/PrintEstimate";

import DeviceMobile from "./components/DeviceMobile";

import OptionMobile from "./components/OptionMobile";

import DiscountMobile from "./components/DiscountMobile";

import DiscountHome5G from "./components/DiscountHome5G";

import OptionHome5G from "./components/OptionHome5G";

import PlanHome5G from "./components/PlanHome5G";

import PlanHikari from "./components/PlanHikari";

import DeviceHome5G from "./components/DeviceHome5G";

import DiscountHikari from "./components/DiscountHikari";

import OptionHikari from "./components/OptionHikari";

import InstallmentMobile from "./components/InstallmentMobile";

import InstallmentHome5G from "./components/InstallmentHome5G";

import InstallmentHikari from "./components/InstallmentHikari";

export default function App() {
  const mobilePlans = [
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

  const plans = mobilePlans;

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [storeName, setStoreName] = useState("");

  const [staffName, setStaffName] = useState("");

  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const [printAllLines, setPrintAllLines] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const [lines, setLines] = useState([
    {
      deviceName: "",
      contractType: "Home 5G",
      devicePrice: 0,
      installment: 24,

      constructionFee: 0,
      constructionInstallment: 1,

      selectedPlan: plans[0],

      selectedDiscounts: [] as string[],

      dcardDiscount: "",
      familyDiscount: "",
      longTermDiscount: "",

      downPayment: 16500,

      firstPayment: 0,
      residualPrice: 0,
      secondPayment: 0,
      mailCarry: false,

      serviceType: "MB",

      selected: false,

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

  const planPrice =
    lines[activeTab].serviceType === "BB"
      ? lines[activeTab].selectedPlan.price
      : isCustomPlan
        ? lines[activeTab].customPlanPrice
        : lines[activeTab].selectedPlan.price;

  const calculateLine = (line: any) => {
    const isCustom = line.selectedPlan.name === "旧プラン・自由入力";

    const planPrice = isCustom ? line.customPlanPrice : line.selectedPlan.price;

    const optionTotal =
      line.customOptions.reduce(
        (sum: number, option: any) => sum + option.price,
        0,
      ) + (!isCustom && line.mailCarry ? 330 : 0);

    const discountTotal =
      (discountsByPlan[line.selectedPlan.name] || []).reduce(
        (sum: number, discount: any) => {
          if (line.selectedDiscounts.includes(discount.name)) {
            return sum + discount.price;
          }

          return sum;
        },
        0,
      ) +
      Number(line.dcardDiscount) +
      Number(line.familyDiscount) +
      Number(line.longTermDiscount) +
      line.customDiscounts.reduce(
        (sum: number, discount: any) => sum + discount.price,
        0,
      ) +
      (line.serviceType === "BB" && line.contractType === "Home 5G" ? 1525 : 0);

    const estimateDiscounts = [
      ...(discountsByPlan[line.selectedPlan.name] || []).filter(
        (discount: any) => line.selectedDiscounts.includes(discount.name),
      ),

      ...(Number(line.dcardDiscount) > 0
        ? [
            {
              name: "dカード支払割",
              price: Number(line.dcardDiscount),
            },
          ]
        : []),

      ...(Number(line.familyDiscount) > 0
        ? [
            {
              name: "みんなドコモ割",
              price: Number(line.familyDiscount),
            },
          ]
        : []),

      ...(Number(line.longTermDiscount) > 0
        ? [
            {
              name: "長期利用割",
              price: Number(line.longTermDiscount),
            },
          ]
        : []),

      ...line.customDiscounts,
      ...(line.serviceType === "BB" && line.contractType === "Home 5G"
        ? [
            {
              name: "月々サポート",
              price: 1525,
            },
          ]
        : []),
    ];

    const isNoDevice = line.installment === 0 || line.installment === -1;
    const isLumpSum = line.installment === 1;
    const isKaedoki = line.installment === 23;

    const constructionMonthly =
      line.constructionInstallment === 1
        ? 0
        : Math.trunc(line.constructionFee / line.constructionInstallment);

    const installmentPrice =
      line.contractType === "ドコモ光"
        ? constructionMonthly
        : isNoDevice || isLumpSum
          ? 0
          : isKaedoki
            ? line.firstPayment
            : Math.max(
                0,
                Math.trunc(
                  (line.devicePrice - line.downPayment) / line.installment,
                ),
              );

    const grandTotal = Math.max(
      0,
      installmentPrice + planPrice + optionTotal - discountTotal,
    );

    const grandTotalSecond = Math.max(
      0,
      line.secondPayment + planPrice + optionTotal - discountTotal,
    );

    return {
      planPrice,
      optionTotal,
      discountTotal,
      estimateDiscounts,
      isKaedoki,
      installmentPrice,
      grandTotal,
      grandTotalSecond,
    };
  };

  const selectedLines = lines.filter((line) => line.selected);

  const selectedTotal = selectedLines.reduce((sum, line) => {
    const calc = calculateLine(line);
    return sum + calc.grandTotal;
  }, 0);

  const circledNumbers = ["", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

  const selectedNames = selectedLines
    .map((line) => circledNumbers[lines.indexOf(line) + 1])
    .join("＋");

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
    Number(lines[activeTab].familyDiscount) +
    Number(lines[activeTab].longTermDiscount) +
    (lines[activeTab].serviceType === "BB" &&
    lines[activeTab].contractType === "Home 5G"
      ? 1525
      : 0) +
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

    ...(Number(lines[activeTab].familyDiscount) > 0
      ? [
          {
            name: "みんなドコモ割",
            price: Number(lines[activeTab].familyDiscount),
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

    ...(lines[activeTab].serviceType === "BB" &&
    lines[activeTab].contractType === "Home 5G"
      ? [
          {
            name: "月々サポート",
            price: 1525,
          },
        ]
      : []),

    ...lines[activeTab].customDiscounts,
  ];

  const isNoDevice =
    lines[activeTab].installment === 0 || lines[activeTab].installment === -1;
  const isLumpSum = lines[activeTab].installment === 1;
  const isKaedoki = lines[activeTab].installment === 23;

  const constructionMonthly =
    lines[activeTab].constructionInstallment === 1
      ? 0
      : Math.trunc(
          lines[activeTab].constructionFee /
            lines[activeTab].constructionInstallment,
        );

  const installmentPrice =
    lines[activeTab].contractType === "ドコモ光"
      ? constructionMonthly
      : isNoDevice || isLumpSum
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

  if (showPrintPreview && !printAllLines) {
    return (
      <PrintEstimate
        storeName={storeName}
        staffName={staffName}
        deviceName={
          lines[activeTab].serviceType === "MB"
            ? lines[activeTab].deviceName
            : lines[activeTab].contractType
        }
        planName={
          isCustomPlan
            ? lines[activeTab].customPlanName
            : lines[activeTab].selectedPlan.name
        }
        devicePrice={
          lines[activeTab].contractType === "ドコモ光"
            ? lines[activeTab].constructionFee
            : lines[activeTab].devicePrice
        }
        options={lines[activeTab].customOptions}
        mailCarry={lines[activeTab].mailCarry}
        serviceType={lines[activeTab].serviceType}
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
        installment={
          lines[activeTab].contractType === "ドコモ光"
            ? lines[activeTab].constructionInstallment
            : lines[activeTab].installment
        }
        fees={lines[activeTab].customFees}
      />
    );
  }
  if (showPrintPreview && printAllLines) {
    return (
      <div className="bg-white p-4">
        <div className="mb-6 no-print flex gap-4">
          <button
            onClick={() => window.print()}
            className="
            rounded-lg
            bg-blue-600
            px-6
            py-3
            text-white
            font-bold
          "
          >
            印刷
          </button>

          <button
            onClick={() => {
              setPrintAllLines(false);
              setShowPrintPreview(false);
            }}
            className="
            rounded-lg
            border
            px-6
            py-3
            font-bold
          "
          >
            閉じる
          </button>
        </div>

        {lines.map((line, index) => {
          const calc = calculateLine(line);

          return (
            <div
              key={index}
              style={{
                pageBreakAfter: index === lines.length - 1 ? "auto" : "always",
              }}
            >
              <PrintEstimate
                storeName={storeName}
                staffName={staffName}
                deviceName={
                  line.serviceType === "MB"
                    ? line.deviceName
                    : line.contractType
                }
                planName={
                  line.selectedPlan.name === "旧プラン・自由入力"
                    ? line.customPlanName
                    : line.selectedPlan.name
                }
                devicePrice={
                  line.contractType === "ドコモ光"
                    ? line.constructionFee
                    : line.devicePrice
                }
                options={line.customOptions}
                mailCarry={line.mailCarry}
                serviceType={line.serviceType}
                discounts={calc.estimateDiscounts}
                optionTotal={calc.optionTotal}
                installmentPrice={calc.installmentPrice}
                discountTotal={calc.discountTotal}
                grandTotal={calc.grandTotal}
                grandTotalSecond={calc.grandTotalSecond}
                isKaedoki={calc.isKaedoki}
                onClose={() => {}}
                firstPayment={line.firstPayment}
                residualPrice={line.residualPrice}
                secondPayment={line.secondPayment}
                installment={
                  line.contractType === "ドコモ光"
                    ? line.constructionInstallment
                    : line.installment
                }
                fees={line.customFees}
                showButtons={false}
              />
            </div>
          );
        })}
      </div>
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
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={lines[index].selected}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const updated = [...lines];
                      updated[index].selected = e.target.checked;
                      setLines(updated);
                    }}
                    className="w-4 h-4"
                  />

                  <span>
                    {index + 1}.{" "}
                    {lines[index].serviceType === "BB"
                      ? lines[index].contractType
                      : lines[index].installment === 0
                        ? "プラン変更"
                        : lines[index].installment === -1
                          ? "SIM契約"
                          : lines[index].deviceName || "未入力"}
                  </span>
                </div>
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
                  contractType: "Home 5G",
                  devicePrice: 0,
                  installment: 24,

                  constructionFee: 0,
                  constructionInstallment: 1,

                  selectedPlan: plans[0],

                  selectedDiscounts: [],

                  dcardDiscount: "",
                  familyDiscount: "",
                  longTermDiscount: "",

                  downPayment: 16500,

                  firstPayment: 0,
                  residualPrice: 0,
                  secondPayment: 0,

                  mailCarry: false,

                  serviceType: "MB",

                  selected: false,

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
                onClick={() => {
                  setPrintAllLines(true);
                  setShowPrintPreview(true);
                  setIsMenuOpen(false);
                }}
                className="text-left"
              >
                全回線印刷
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

              <div className="flex items-center justify-between w-full">
                <div
                  className="
      text-xl
      font-bold
      text-red-700
    "
                >
                  {lines[activeTab].serviceType === "MB" ? "端末" : "契約種別"}
                </div>

                <button
                  onClick={() => {
                    const updated = [...lines];

                    updated[activeTab].serviceType =
                      updated[activeTab].serviceType === "MB" ? "BB" : "MB";

                    if (updated[activeTab].serviceType === "BB") {
                      if (updated[activeTab].contractType === "Home 5G") {
                        applyHome5GDefaults(updated[activeTab]);
                      } else {
                        applyHikariDefaults(updated[activeTab]);
                      }
                    } else {
                      applyMobileDefaults(updated[activeTab]);
                    }

                    setLines(updated);
                  }}
                  className="
      flex
      items-center
      gap-2
      rounded-full
      bg-gray-200
      px-2
      py-1
      text-sm
      font-bold
    "
                >
                  <span
                    className={
                      lines[activeTab].serviceType === "MB"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }
                  >
                    MB
                  </span>

                  <div
                    className={`
        w-10
        h-5
        rounded-full
        relative
        transition
        ${
          lines[activeTab].serviceType === "MB" ? "bg-blue-500" : "bg-green-500"
        }
      `}
                  >
                    <div
                      className={`
          absolute
          top-[2px]
          w-4
          h-4
          rounded-full
          bg-white
          transition-all
          ${
            lines[activeTab].serviceType === "MB" ? "left-[2px]" : "left-[22px]"
          }
        `}
                    />
                  </div>

                  <span
                    className={
                      lines[activeTab].serviceType === "BB"
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    BB
                  </span>
                </button>
              </div>
            </div>

            <div
              className="
  p-4
  space-y-4
"
            >
              {lines[activeTab].installment !== 0 &&
                lines[activeTab].installment !== -1 && (
                  <>
                    <div>
                      <div
                        className="
          mb-1
          text-base
          font-bold
        "
                      >
                        {lines[activeTab].serviceType === "MB"
                          ? "機種名"
                          : "契約種別"}
                      </div>

                      {lines[activeTab].serviceType === "MB" && (
                        <DeviceMobile
                          lines={lines}
                          setLines={setLines}
                          activeTab={activeTab}
                        />
                      )}

                      {lines[activeTab].serviceType === "BB" && (
                        <DeviceHome5G
                          lines={lines}
                          setLines={setLines}
                          activeTab={activeTab}
                        />
                      )}
                    </div>

                    {!(
                      lines[activeTab].serviceType === "BB" &&
                      lines[activeTab].contractType === "ドコモ光"
                    ) && (
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
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value);

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
                  </>
                )}
              {lines[activeTab].serviceType === "BB" &&
                lines[activeTab].contractType === "ドコモ光" && (
                  <>
                    <div className="mt-4">
                      <div
                        className="
            mb-1
            text-base
            font-bold
          "
                      >
                        工事費用
                      </div>

                      <input
                        type="number"
                        value={
                          lines[activeTab].constructionFee === 0
                            ? ""
                            : lines[activeTab].constructionFee
                        }
                        onChange={(e) => {
                          const updated = [...lines];

                          updated[activeTab].constructionFee =
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

                    <div className="mt-4">
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
                        value={lines[activeTab].constructionInstallment}
                        onChange={(e) => {
                          const updated = [...lines];

                          updated[activeTab].constructionInstallment = Number(
                            e.target.value,
                          );

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
                      </select>
                    </div>
                  </>
                )}
              {lines[activeTab].installment !== 0 &&
                lines[activeTab].installment !== -1 &&
                lines[activeTab].installment !== 1 &&
                !(
                  lines[activeTab].serviceType === "BB" &&
                  lines[activeTab].contractType === "ドコモ光"
                ) && (
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
              {!(
                lines[activeTab].serviceType === "BB" &&
                lines[activeTab].contractType === "ドコモ光"
              ) && (
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

                  {lines[activeTab].serviceType === "MB" ? (
                    <InstallmentMobile
                      lines={lines}
                      setLines={setLines}
                      activeTab={activeTab}
                    />
                  ) : lines[activeTab].contractType === "Home 5G" ? (
                    <InstallmentHome5G
                      lines={lines}
                      setLines={setLines}
                      activeTab={activeTab}
                    />
                  ) : (
                    <InstallmentHikari
                      lines={lines}
                      setLines={setLines}
                      activeTab={activeTab}
                    />
                  )}

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
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value);

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
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value);

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
                              e.target.value === ""
                                ? 0
                                : Number(e.target.value);

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
              )}
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
                {lines[activeTab].serviceType === "MB" ? (
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

                      updated[activeTab].dcardDiscount = "";
                      updated[activeTab].familyDiscount = "";
                      updated[activeTab].longTermDiscount = "";
                      updated[activeTab].selectedDiscounts = [];
                      updated[activeTab].customDiscounts = [];

                      if (!found.name.includes("ドコモmini")) {
                        updated[activeTab].mailCarry = false;
                      }

                      if (found.name.includes("ドコモmini")) {
                        updated[activeTab].longTermDiscount = "";
                        updated[activeTab].familyDiscount = "";
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
                ) : lines[activeTab].contractType === "Home 5G" ? (
                  <PlanHome5G
                    lines={lines}
                    setLines={setLines}
                    activeTab={activeTab}
                  />
                ) : (
                  <PlanHikari
                    lines={lines}
                    setLines={setLines}
                    activeTab={activeTab}
                  />
                )}

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
                  {lines[activeTab].serviceType === "MB" && (
                    <OptionMobile
                      lines={lines}
                      setLines={setLines}
                      activeTab={activeTab}
                    />
                  )}

                  {lines[activeTab].serviceType === "BB" &&
                    lines[activeTab].contractType === "Home 5G" && (
                      <OptionHome5G
                        lines={lines}
                        setLines={setLines}
                        activeTab={activeTab}
                      />
                    )}

                  {lines[activeTab].serviceType === "BB" &&
                    lines[activeTab].contractType === "ドコモ光" && (
                      <OptionHikari
                        lines={lines}
                        setLines={setLines}
                        activeTab={activeTab}
                      />
                    )}
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
              {lines[activeTab].serviceType === "MB" && (
                <DiscountMobile
                  lines={lines}
                  setLines={setLines}
                  activeTab={activeTab}
                />
              )}
              {lines[activeTab].serviceType === "BB" &&
                lines[activeTab].contractType === "Home 5G" && (
                  <DiscountHome5G
                    lines={lines}
                    setLines={setLines}
                    activeTab={activeTab}
                  />
                )}

              {lines[activeTab].serviceType === "BB" &&
                lines[activeTab].contractType === "ドコモ光" && (
                  <DiscountHikari
                    lines={lines}
                    setLines={setLines}
                    activeTab={activeTab}
                  />
                )}

              {/* カスタム割引 */}
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
                {lines[activeTab].serviceType === "MB"
                  ? "手数料・付属品"
                  : "手数料・工事費"}
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
              <FeeSection
                lines={lines}
                setLines={setLines}
                activeTab={activeTab}
              />
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

            <GrandTotal
              isKaedoki={isKaedoki}
              grandTotal={grandTotal}
              grandTotalSecond={grandTotalSecond}
            />
          </div>
        </div>
      </div>
      {selectedLines.length > 0 && (
        <div
          className="
      mt-4
      mx-4
      rounded-2xl
      border-2
      border-blue-500
      bg-blue-50
      p-3
    "
        >
          <div
            className="
    grid
    grid-cols-3
    items-center
  "
          >
            <div
              className="
      text-lg
      font-bold
      text-blue-700
    "
            >
              選択回線合計
            </div>

            <div
              className="
      text-center
      text-2xl
      font-black
      text-blue-600
    "
            >
              {selectedNames}
            </div>

            <div></div>
          </div>

          <div
            className="
    my-3
    border-t
  "
          ></div>

          <div
            className="
    mt-1        
    text-5xl
    font-black
    text-blue-700
    text-center
  "
          >
            ¥{selectedTotal.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
