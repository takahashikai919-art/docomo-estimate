type Props = {
  isKaedoki: boolean;
  grandTotal: number;
  grandTotalSecond: number;
};

export default function GrandTotal({
  isKaedoki,
  grandTotal,
  grandTotalSecond,
}: Props) {
  return (
    <>
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
    </>
  );
}
