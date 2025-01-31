'use client';

import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, Input as TextInput } from '@heroui/react';
import { FC } from 'react';

interface FormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
}

const LoginForm: FC<FormikProps<FormValues>> = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleSubmit,
  handleChange,
  handleBlur,
}) => (
  <form className="space-y-6" onSubmit={handleSubmit}>
    <div className="space-y-4">
      <TextInput
        label="Email Address"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="your.email@example.com"
        required
        errorMessage={touched.email && errors.email ? errors.email : undefined}
        autoComplete="email"
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="••••••••"
        required
        errorMessage={touched.password && errors.password ? errors.password : undefined}
        autoComplete="current-password"
      />
    </div>

    <Button
      type="submit"
      fullWidth
      color="primary"
      isLoading={isSubmitting}
      isDisabled={isSubmitting}
      className="py-3 text-base font-medium"
    >
      Login
    </Button>
  </form>
);

export default withFormik<LoginFormProps, FormValues>({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 4 characters'),
  }),
  handleSubmit: async (values, { setSubmitting, props }) => {
    try {
      await props.onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  },
  displayName: 'LoginForm',
})(LoginForm);
