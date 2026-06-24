type Props = {
  storeName: string;
  staffName: string;

  deviceName: string;
  planName: string;

  devicePrice: number;

  options: {
    name: string;
    price: number;
  }[];

  discounts: {
    name: string;
    price: number;
  }[];

  fees: {
    name: string;
    price: number;
  }[];

  optionTotal: number;
  installmentPrice: number;
  discountTotal: number;
  grandTotal: number;
  onClose: () => void;

  isKaedoki: boolean;
  firstPayment: number;
  residualPrice: number;
  secondPayment: number;

  installment: number;

  grandTotalSecond: number;

  mailCarry: boolean;

  showButtons?: boolean;
};

export default function PrintEstimate({
  storeName,
  staffName,

  deviceName,
  planName,

  devicePrice,

  options,
  discounts,

  fees,

  optionTotal,
  installmentPrice,
  discountTotal,
  grandTotal,
  grandTotalSecond,

  isKaedoki,
  firstPayment,
  residualPrice,
  secondPayment,

  installment,

  mailCarry,

  showButtons = true,
  onClose,
}: Props) {
  const isNoDevice = installment === 0;
  const isLumpSum = installment === 1;

  const displayOptions = [
    ...(mailCarry
      ? [
          {
            name: "ドコモメール持ち運び",
            price: 330,
          },
        ]
      : []),

    ...options,
  ];

  return (
    <div
      className="
    bg-white
    p-4
  "
    >
      <style>
        {`
    @media print {

  @page {
    size: A4;
    margin: 8mm;
  }

  .no-print {
    display: none !important;
  }

  body {
    margin: 0 !important;
    background: white !important;
  }

  table td {
  padding: 6px !important;
}

h2 {
  margin-bottom: 6px !important;
}

}
@media print {

  @page {
    size: A4;
    margin: 8mm;
  }

  html,
  body {
    height: auto !important;
    overflow: visible !important;
  }

  .no-print {
    display: none !important;
  }

}
  `}
      </style>
      <div
        className="
    w-[190mm]
    mx-auto
    p-5
    bg-white
  "
      >
        <h1
          className="
            text-2xl
            font-bold
            text-center
            mb-8
          "
        >
          料金見積書
        </h1>

        <div className="flex justify-between mb-8">
          <div>店舗名：{storeName}</div>

          <div>担当者：{staffName}</div>

          <div>
            作成日：
            {new Date().toLocaleDateString("ja-JP")}
          </div>
        </div>
        <div className="mt-5">
          <table className="w-full border-2 border-collapse">
            <thead>
              <tr className="border-t">
                <th className="border p-2 w-[28%] text-left">内訳項目</th>

                <th className="border p-2 w-[18%] text-left">内訳金額</th>

                <th className="border p-2 text-left">内訳詳細</th>
              </tr>
            </thead>

            <tbody>
              {/* 基本料金 */}

              <tr className="border-t">
                <td
                  className="
      border
      border-r
      border-t
      p-3
      align-top
    "
                >
                  <div className="font-bold">◇基本料(計)</div>

                  <div className="mt-4">
                    ¥
                    {(
                      grandTotal +
                      discountTotal -
                      optionTotal -
                      installmentPrice
                    ).toLocaleString()}
                  </div>
                </td>

                <td
                  className="
    border
    border-t
    p-3
    text-right
  "
                >
                  ¥
                  {(
                    grandTotal +
                    discountTotal -
                    optionTotal -
                    installmentPrice
                  ).toLocaleString()}
                </td>

                <td
                  className="
    border
    border-t
    p-3
  "
                >
                  {planName}
                </td>
              </tr>

              {/* オプション */}

              {displayOptions.length === 0 ? (
                <tr>
                  <td
                    className="
        border
        border-t
        p-3
        align-top
      "
                  >
                    オプション料(計)
                    <div className="mt-4">¥{optionTotal.toLocaleString()}</div>
                  </td>

                  <td
                    className="
        border
        border-t
        p-3
      "
                  >
                    -
                  </td>

                  <td className="border p-3">なし</td>
                </tr>
              ) : (
                displayOptions.map((option, index) => (
                  <tr key={index} className={index === 0 ? "border-t" : ""}>
                    {index === 0 && (
                      <td
                        rowSpan={displayOptions.length}
                        className="border border-r p-3 align-top"
                      >
                        <div className="font-bold">◇オプション料(計)</div>

                        <div className="mt-4">
                          ¥{optionTotal.toLocaleString()}
                        </div>
                      </td>
                    )}

                    <td className="border p-2 text-right">
                      ¥{option.price.toLocaleString()}
                    </td>

                    <td className="border p-2">{option.name}</td>
                  </tr>
                ))
              )}

              {/* 割引 */}

              {discounts.length === 0 ? (
                <tr>
                  <td
                    className="
      border
      border-t
      p-3
      align-top
    "
                  >
                    <div className="font-bold">割引(計)</div>

                    <div className="mt-4">
                      -¥{discountTotal.toLocaleString()}
                    </div>
                  </td>

                  <td
                    className="
    border
    border-t
    p-3
  "
                  >
                    -
                  </td>

                  <td className="border p-3">なし</td>
                </tr>
              ) : (
                discounts.map((discount, index) => (
                  <tr key={index} className={index === 0 ? "border-t" : ""}>
                    {index === 0 && (
                      <td
                        rowSpan={discounts.length}
                        className="border border-r p-3 align-top"
                      >
                        <div className="font-bold">◇割引(計)</div>

                        <div className="mt-4">
                          -¥{discountTotal.toLocaleString()}
                        </div>
                      </td>
                    )}

                    <td className="border p-2 text-right">
                      -¥{discount.price.toLocaleString()}
                    </td>

                    <td className="border p-2">{discount.name}</td>
                  </tr>
                ))
              )}

              {/* 機種 */}

              {isNoDevice ? (
                <tr>
                  <td className="border border-r p-3 align-top">
                    <div className="font-bold">機種情報</div>
                  </td>

                  <td colSpan={2} className="border p-2">
                    機種購入なし
                  </td>
                </tr>
              ) : isLumpSum ? (
                <tr>
                  <td className="border border-r p-3 align-top">
                    <div className="font-bold">機種情報</div>

                    <div className="mt-4">¥{devicePrice.toLocaleString()}</div>
                  </td>

                  <td className="border p-2 text-right">
                    ¥{devicePrice.toLocaleString()}
                  </td>

                  <td className="border p-2">{deviceName}（一括購入）</td>
                </tr>
              ) : isKaedoki ? (
                <>
                  <tr className="border-t">
                    <td rowSpan={3} className="border border-r p-3 align-top">
                      <div className="font-bold">◇機種代金(カエドキ)</div>

                      <div className="mt-4">
                        ¥{devicePrice.toLocaleString()}
                      </div>
                    </td>

                    <td className="border p-2 text-right">
                      ¥{firstPayment.toLocaleString()}
                    </td>

                    <td className="border p-2">{deviceName}（1〜23回）</td>
                  </tr>

                  <tr>
                    <td className="border p-2 text-right">
                      ¥{residualPrice.toLocaleString()}
                    </td>

                    <td className="border p-2">残価</td>
                  </tr>

                  <tr>
                    <td className="border p-2 text-right">
                      ¥{secondPayment.toLocaleString()}
                    </td>

                    <td className="border p-2">24〜48回</td>
                  </tr>
                </>
              ) : (
                <tr className="border-t">
                  <td className="border border-r p-3 align-top">
                    <div className="font-bold">◇機種代金</div>

                    <div className="mt-4">¥{devicePrice.toLocaleString()}</div>
                  </td>

                  <td className="border p-2 text-right">
                    ¥{installmentPrice.toLocaleString()}
                  </td>

                  <td className="border p-2">
                    {deviceName}（{installment}回）
                  </td>
                </tr>
              )}

              {/* 合計 */}

              <tr className="border-t">
                <td className="border border-r p-3 font-bold text-xl">合計</td>

                <td colSpan={2} className="border p-3 text-center">
                  {isKaedoki ? (
                    <>
                      <div className="text-2xl font-black">
                        ¥{grandTotal.toLocaleString()}
                        <span className="ml-2 text-sm">（1〜23回）</span>
                      </div>

                      <div className="mt-2 text-2xl font-black">
                        ¥{grandTotalSecond.toLocaleString()}
                        <span className="ml-2 text-sm">（24〜48回）</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-3xl font-black">
                      ¥{grandTotal.toLocaleString()}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <table className="w-full border-2 border-collapse">
            <tbody>
              <tr>
                <td
                  className="
            border
            border-r-2
            p-3
            align-top
            w-[28%]
          "
                >
                  <div className="font-bold">手数料・付属品</div>
                </td>

                <td colSpan={2} className="border p-0">
                  {fees.length === 0 ? (
                    <div className="p-2">なし</div>
                  ) : (
                    fees.map((fee, index) => (
                      <div
                        key={index}
                        className="
                        flex
                        border-b
                        last:border-b-0
                        text-sm
                      "
                      >
                        <div
                          className="
                    w-[140px]
                    px-2
                    py-1
                    text-right
                  "
                        >
                          ¥{fee.price.toLocaleString()}
                        </div>

                        <div className="flex-1 px-2 py-1">{fee.name}</div>
                      </div>
                    ))
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {showButtons && (
          <div
            className="
      mt-10
      flex
      justify-center
      gap-4
      no-print
    "
          >
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
              onClick={onClose}
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
        )}
      </div>
    </div>
  );
}
