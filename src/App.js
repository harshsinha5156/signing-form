import { FormProvider } from './context/FormContext';
import FormProgress from './components/FormProgress';
import FormStep from './components/FormStep';

const App = () => {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Sign Up
          </h1>
          <FormProgress />
          <FormStep />
        </div>
      </div>
    </FormProvider>
  );
};

export default App;