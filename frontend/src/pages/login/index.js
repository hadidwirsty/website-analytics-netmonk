import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@netmonk/design.ui.button';
import { Input } from '@netmonk/design.ui.input';
import { useLoginMutation } from '../../apps/features/auth/authApiSlice';
import { setCredentials } from '../../apps/features/auth/authSlice';
import IconLoading from '../../assets/svgs/loading.svg';
import Logo from '../../assets/svgs/logo-netmonk-analytics.svg';

export function PageLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setStatusError] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [responseCode, setResponseCode] = useState(0);

  const schema = Yup.object().shape({
    username: Yup.string().required('Cannot be empty').min(4, 'Too short, minimum 4 characters'),
    password: Yup.string().required('Cannot be empty').min(4, 'Too short, minimum 4 characters')
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    mode: 'onTouched',
    reValidateMode: 'onChange'
  });

  const onSubmit = async (formData) => {
    setStatusError(false);

    try {
      const user = await login(formData).unwrap();
      localStorage.setItem('role', user.role);
      localStorage.setItem('teamName', user.teamName);
      localStorage.setItem('accessToken', user.accessToken);
      dispatch(setCredentials(user));
      navigate('/overview');
    } catch (err) {
      console.error('Failed to login:', err);
      setStatusError(true);
      setResponseCode(err.status || 401);
    }
  };

  const showError = () => {
    if (!error) return null;

    let errorMessage = 'There was a problem.';
    if (responseCode === 401) errorMessage = 'Wrong username or password';

    return (
      <div className="text-center p-2 mb-2 bg-fire_opal-80 rounded">
        <strong className="font-bold"> Error! </strong> <br />
        {errorMessage}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-t from-main-yale_blue w-screen h-screen px-4">
      <div className="container mx-auto">
        <div className="flex justify-center min-h-screen">
          <div
            className="my-auto py-12"
            style={{
              width: '360px'
            }}>
            <div className="flex flex-col justify-center items-center mb-6">
              <img alt="Logo Netmonk Analytics" src={Logo} className="w-72 mb-2" />
              <p className="text-gunmetal-90 font-medium text-sm">
                Welcome back. Enter your credentials to access your account
              </p>
            </div>
            {showError()}
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form flex-col flex gap-4">
              <div className="flex flex-col flex-nowrap">
                <label htmlFor="username" className="text-sm mb-2 font-bold text-gunmetal-100">
                  Username
                </label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="text"
                      size="sm"
                      id="username"
                      name="username"
                      prependIcon="user"
                      placeholder="Enter your username"
                      isError={errors.username !== undefined}
                      inputRef={ref}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.username && (
                  <small className="block pt-1 text-fire_opal">{errors.username.message}</small>
                )}
              </div>

              <div className="flex flex-col flex-nowrap mb-4">
                <label htmlFor="password" className="text-sm mb-2 font-bold text-gunmetal-100">
                  Password
                </label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value, ref } }) => (
                    <Input
                      type="password"
                      size="sm"
                      id="password"
                      name="password"
                      prependIcon="lock"
                      placeholder="Enter your password"
                      passwordIcon="typograph"
                      isError={errors.password !== undefined}
                      inputRef={ref}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                {errors.password && (
                  <small className="block pt-1 text-fire_opal">{errors.password.message}</small>
                )}
              </div>

              <Button
                data-testid="buttonLogin"
                label={
                  isLoading ? (
                    <div className="flex justify-center items-center gap-1">
                      <img alt="loading" src={IconLoading} className="w-6 h-6" />
                      Logging in
                    </div>
                  ) : (
                    'Login'
                  )
                }
                type="submit"
                size="sm"
                color="yale_blue"
                block
              />
            </form>
            <div className="text-center text-main-sky_blue pt-4 text-xs tracking-wider">
              Powered by&nbsp;
              <a
                href="https://netmonk.id"
                className="hover:underline"
                title="Netmonk"
                target="_blank"
                rel="noopener noreferrer">
                Netmonk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageLogin;
