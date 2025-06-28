import DataGrid from "@/components/DataGrid/Univer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <DataGrid
          data={{
            columns: ["column 1", "column 2", "column 3"],
            rows: [["row 1 col 1", "row 1 col 2", "row 1 col 3"]]
          }}
          height="30vh"
        />

      </main>
    </div>
  );
}
