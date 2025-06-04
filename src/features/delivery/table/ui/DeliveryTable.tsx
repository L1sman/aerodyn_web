import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { Delivery, Service } from '@/shared/api/types';
import styles from './DeliveryTable.module.scss';

interface DeliveryTableProps {
  data: Delivery[];
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string;
  }
}

const columnHelper = createColumnHelper<Delivery>();

const columns = [
  columnHelper.accessor('id', {
    header: '№',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('transport_model_details.name', {
    header: 'Модель транспорта',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('transport_number', {
    header: 'Номер транспорта',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('package_type_details.name', {
    header: 'Тип упаковки',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('services_details', {
    header: 'Услуги',
    cell: info => info.getValue().map((service: Service) => service.name).join(', '),
  }),
  columnHelper.accessor('status_details.name', {
    header: 'Статус',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('cargo_type_details.name', {
    header: 'Тип груза',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('location.distance_km', {
    header: 'Дистанция (км)',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('departure_time', {
    header: 'Время отправки',
    cell: info => format(new Date(info.getValue()), 'dd.MM.yyyy HH:mm'),
  }),
  columnHelper.accessor('delivery_time', {
    header: 'Время доставки',
    cell: info => format(new Date(info.getValue()), 'dd.MM.yyyy HH:mm'),
  }),
  columnHelper.accessor('travel_time', {
    header: 'Время в пути',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => `${row.collector_surname} ${row.collector_name} ${row.collector_lastname}`, {
    id: 'collector',
    header: 'Сборщик',
    cell: info => info.getValue() || '-',
  }),
] as ColumnDef<Delivery, any>[];

export const DeliveryTable: React.FC<DeliveryTableProps> = ({ data }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={styles.header}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span className={styles.sortIcon}>
                    {{
                      asc: '↑',
                      desc: '↓',
                    }[header.column.getIsSorted() as string] ?? ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className={styles.row}>
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 