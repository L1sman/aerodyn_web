import {
  TransportModelFilter,
  PackageTypeFilter,
  ServiceFilter,
  StatusFilter,
  DateFilter,
} from './FilterObservers';
import styles from './DeliveryFilters.module.scss';

export const DeliveryFilters = () => (
  <div className={styles.filters}>
    <div className={styles.filterItem}>
      <TransportModelFilter />
    </div>
    <div className={styles.filterItem}>
      <PackageTypeFilter />
    </div>
    <div className={styles.filterItem}>
      <ServiceFilter />
    </div>
    <div className={styles.filterItem}>
      <StatusFilter />
    </div>
    <div className={styles.filterItem}>
      <DateFilter />
    </div>
  </div>
); 