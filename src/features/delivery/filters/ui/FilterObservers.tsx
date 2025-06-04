import { observer } from 'mobx-react-lite';
import { deliveryFiltersStore } from '../model/store';
import { FilterSelect } from './FilterSelect';
import { DatePickerInput } from '@mantine/dates';
import type { DatesRangeValue } from '@mantine/dates';

export const TransportModelFilter = observer(() => (
  <FilterSelect
    label="Модель транспорта"
    placeholder="Выберите модель"
    data={deliveryFiltersStore.mappedTransportModels}
    value={deliveryFiltersStore.selectedTransportModel?.toString() || null}
    onChange={(value) => deliveryFiltersStore.setTransportModel(value ? Number(value) : null)}
  />
));

export const PackageTypeFilter = observer(() => (
  <FilterSelect
    label="Тип груза"
    placeholder="Выберите тип груза"
    data={deliveryFiltersStore.mappedPackageTypes}
    value={deliveryFiltersStore.selectedPackageType?.toString() || null}
    onChange={(value) => deliveryFiltersStore.setPackageType(value ? Number(value) : null)}
  />
));

export const ServiceFilter = observer(() => (
  <FilterSelect
    label="Услуга"
    placeholder="Выберите услугу"
    data={deliveryFiltersStore.mappedServices}
    value={deliveryFiltersStore.selectedService?.toString() || null}
    onChange={(value) => deliveryFiltersStore.setService(value ? Number(value) : null)}
  />
));

export const StatusFilter = observer(() => (
  <FilterSelect
    label="Статус "
    placeholder="Выберите статус"
    data={deliveryFiltersStore.mappedStatuses}
    value={deliveryFiltersStore.selectedStatus?.toString() || null}
    onChange={(value) => deliveryFiltersStore.setStatus(value ? Number(value) : null)}
  />
));

export const DateFilter = observer(() => (
  <DatePickerInput
    type="range"
    label="Дата"
    placeholder="Выберите дату"
    value={deliveryFiltersStore.selectedDateRange}
    onChange={(value: DatesRangeValue) => {
      deliveryFiltersStore.setDateRange([
        value[0] ? new Date(value[0]) : null,
        value[1] ? new Date(value[1]) : null
      ]);
    }}
    clearable
  />
)); 