import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authOperations } from '../../redux/auth';
import { ReactComponent as GoogleIcon } from '../../assets/google-icon.svg';
import { useDispatch } from 'react-redux';
import styles from './RegisterForm.module.scss';

function RegisterForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Please enter your full name. Example: John Smith.')
        .required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters.')
        .required('Password is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        authOperations.register({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      );
      resetForm({ values: '' });
      // ======== TODO: 1) add notification that Verification email
      // was send to your mailbox, please verify your email and login;
      // 2) and add forwarding to Login Page
    },
  });

  return (
    <div className={styles.formContainer}>
      <p className={styles.formText}>Вы можете авторизоваться с помощью Google Account:</p>
      <button
        type="button"
        className={styles.googleBtn}
        onClick={() => console.log('googleLogin function')}
      >
        <GoogleIcon />
        <span className={styles.googleBtnText}>Google</span>
      </button>
      <p className={styles.formUsualLoginText}>
        Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:
      </p>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formInputContainer}>
          <label htmlFor="email" className={styles.formInputLabel}>
            Имя:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Имя Фамилия"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={styles.formInput}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.inputErrorText}>{formik.errors.name}</div>
        ) : null}
        <div className={styles.formInputContainer}>
          <label htmlFor="email" className={styles.formInputLabel}>
            Электронная почта:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={styles.formInput}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.inputErrorText}>{formik.errors.email}</div>
        ) : null}
        <div className={styles.formInputContainer}>
          <label htmlFor="password" className={styles.formInputLabel}>
            Пароль:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={styles.formInput}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.inputErrorText}>{formik.errors.password}</div>
        ) : null}
        <div className={styles.formButtonsContainer}>
          <button type="submit" className={styles.registerFormBtn}>
            Регистрация
          </button>
          <button
            type="button"
            onClick={() => console.log('onClickFunction')}
            className={styles.loginFormBtn}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
