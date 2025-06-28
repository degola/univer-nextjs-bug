"use client";
import React, { useEffect, useRef } from 'react'

import { If, Then } from 'react-if';
import { createUniver, defaultTheme, LocaleType, merge } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreEnUS from '@univerjs/presets/preset-sheets-core/locales/en-US';

import '@univerjs/presets/lib/styles/preset-sheets-core.css';

export interface IDataGridProps {
  data: {
    columns: (string | number | Date | null)[];
    rows: (string | number | Date)[][];
  };
  height?: string; // Optional height prop to override the default height
}

export function DataGrid({ data, height = '70vh' }: IDataGridProps) {
// export function DataGrid() {
  const containerRef = useRef<HTMLDivElement>(undefined);

  useEffect(() => {
    const { univerAPI } = createUniver({
      locale: LocaleType.EN_US,
      locales: {
        [LocaleType.EN_US]: merge(
          {},
          UniverPresetSheetsCoreEnUS,
        ),
      },
      theme: defaultTheme,
      presets: [
        UniverSheetsCorePreset({
          toolbar: false,
          formulaBar: true,
          footer: {
            sheetBar: false
          },
          container: containerRef.current,
        }),
      ],
    });
    // Ensure columns is an array
    const columnsArray = Array.isArray(data.columns) ? data.columns : [];

    const rows = [
      columnsArray.map((cell) => {
        return {
          v: cell instanceof Date ? cell.toISOString() : cell,
          s: {
            bl: 1
          }
        }
      }),
      ...(Array.isArray(data.rows) ? data.rows.filter((row) => row && Array.isArray(row)).map(
        (row) => {
          return row.map(
            (cell) => {
              return {
                v: cell instanceof Date ? cell.toISOString() : cell
              };
            })
        }) : [])
    ];
    // rows.unshift(data.columns);

    const workbook = univerAPI.createWorkbook({
      id: 'unique-workbook-id',
      name: 'My Workbook',
      sheetOrder: ['sheet-01'],
      sheets: {
        'sheet-01': {
          id: 'sheet-01',
          name: "Sheet 1",
          cellData: rows,
          columnData: columnsArray.map((column) => {
            console.log('column', column);
            return {
              // w: Math.max(String(column || '').length * 9, 100),
              hd: 0
            };
          }),
          rowCount: rows.length, // rows already includes the column headers
          columnCount: columnsArray.length
        }
      }
    });
    // console.log('workbook', workbook, workbook.getActiveSheet());

    workbook.getActiveSheet()?.autoResizeColumns(0, 1);
    // workbook.getActiveSheet()?.autoResizeColumns(0, 1);
    // univerAPI?.getActiveWorkbook()?.getActiveSheet()?.autoResizeColumns(0, 1);
    // const timeout = setTimeout(() => {
    //   const sheet = workbook.getActiveSheet();
    //   if(sheet) {
    //     try {
    //       console.log('sheet', sheet);
    //       sheet.autoResizeColumns(0, 1);
    //     } catch(e) {
    //       console.log('e while autoresize', e);
    //       // ignore e
    //     }
    //   }
    // }, 200)

    // setTimeout(() => {
    //   workbook.getActiveSheet()?.autoResizeColumns(0, 3);
    // }, 2000);
    return () => {
      univerAPI.dispose();
    };
  }, []);

  return (
    <div style={{height}}>
      <div className="border-b border-gray-200 bg-white flex items-center h-8 text-sm">
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height }}>
        <If condition={containerRef !== undefined}>
          <Then>
            <div style={{height}} ref={containerRef}></div>
          </Then>
        </If>
      </div>
    </div>
  );
}
export default DataGrid;
