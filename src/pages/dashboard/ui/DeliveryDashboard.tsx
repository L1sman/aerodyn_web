import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { rootStore } from '@/entities/delivery/model/rootStore';
import { deliveryStore } from '@/entities/delivery/model/store';
import { authStore } from '@/entities/auth/model/store';
import { DeliveryFilters } from '@/features/delivery/filters';
import { DeliveryChart } from '@/features/delivery/chart';
import { DeliveryTable } from '@/features/delivery/table';
import styles from './DeliveryDashboard.module.scss';

export const DeliveryDashboard = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    rootStore.initialize();
  }, []);

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };

  if (rootStore.loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (rootStore.error) {
    return <div className={styles.error}>{rootStore.error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Отчет по доставкам</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Выйти
        </button>
      </header>
      <DeliveryFilters />
      <DeliveryChart />
      <DeliveryTable data={deliveryStore.filteredDeliveries} />
    </div>
  );
}); 