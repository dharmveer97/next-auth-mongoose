'use client';

import Link from 'next/link';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { handleCredentialsSignIn, handleGoogleSignIn } from '../../actions';
import { handleLogout } from '../../actions';
import LoginForm from '../../../components/LoginForm';
import { useUserSession } from '@/src/lib/helpers';

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { user,update,isLoggedIn } = useUserSession();

  const showAlert = {
    loading: () => {
      Swal.fire({
        title: 'Authenticating...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
    },

    success: (message: string) =>
      Swal.fire({
        title: '🎉 Welcome Back!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Continue to Dashboard',
        confirmButtonColor: '#3b82f6',
        allowOutsideClick: false,
        timer: 5000,
        timerProgressBar: true,
      }),

    error: (message: string) =>
      Swal.fire({
        title: '⚠️ Oops!',
        html: message,
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#ef4444',
      }),
  };

  const handleSubmit = async (values: LoginValues) => {
    showAlert.loading();

    try {
      const result = await handleCredentialsSignIn(values);
      const errorM =
      typeof result?.error === 'object' && result?.error !== null && 'message' in result.error
        ? (result.error as { message: string }).message
        : result?.error || 'The email or password you entered is incorrect. Please try again.';

      if (result?.success) {
        await update();
        Swal.close();

        const successAlert = await showAlert.success(
          result.message || 'You have successfully logged in'
        );

        if (successAlert.isConfirmed || successAlert.isDismissed) {
          router.push('/inventory?status=available');
        }
      } else {
        Swal.close();
        showAlert.error(errorM);
      }
    } catch (error: unknown) {
      Swal.close();
      console.error('Login Error:', error);

      const errorMessage =
        'We encountered an issue while trying to log you in. Please try again.';

      showAlert.error(errorMessage);
    }
  };
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8  dark:bg-gray-900">
      <div className="relative z-10 w-full max-w-md space-y-8 bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-xl dark:shadow-xl dark:shadow-black/20">
        <div className="text-center">
          {user?.email &&
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            You Are Logged In as {user?.email + ' ' + user?.name}
          </h1>
          }
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            Secure access to your personalized dashboard
          </p>
        </div>


        <LoginForm onSubmit={handleSubmit} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <Button

          onPress={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border rounded-lg shadow-sm  transition-colors"
        >
          Continue with Google
        </Button>
        <div className="text-center text-xs text-gray-600 dark:text-gray-400 space-y-4">
          <p>
            New to our platform?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Create an account
            </Link>
          </p>
          <p>
            <Link
              href="/auth/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Forgot your password?
            </Link>

          </p>
{isLoggedIn ? <Button key="logout" color="danger" onPress={handleLogout}>
            Log Out
        </Button>:"Please Login first"}

        </div>
      </div>
    </div>
  );
}
