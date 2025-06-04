import { observer } from 'mobx-react-lite';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { authStore } from '@/entities/auth/model/store';
import styles from './LoginPage.module.scss';

export const LoginPage = observer(() => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (!value ? 'Введите имя пользователя' : null),
      password: (value) => (!value ? 'Введите пароль' : null),
    },
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    await authStore.login(values);
    if (authStore.isAuthenticated) {
      navigate('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Вход в систему
      </h1>

      <div className={styles.paper}>
        <form className={styles.form} onSubmit={form.onSubmit(handleSubmit)}>
          <div>
            <label htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              type="text"
              placeholder="Введите имя пользователя"
              required
              {...form.getInputProps('username')}
            />
          </div>
          
          <div>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              required
              {...form.getInputProps('password')}
            />
          </div>

          {authStore.error && (
            <div className={styles.error}>
              {authStore.error}
            </div>
          )}

          <button
            className={styles.submitButton}
            type="submit"
            disabled={authStore.loading}
          >
            {authStore.loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}); 