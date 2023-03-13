import React, { createContext, useMemo, useState } from "react";

export const InterceptorContext = createContext<null | {}>(null);

const ErrorInterceptorContext = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [error, setError] = useState<{} | null>(null);

  const handleRemoveError = () => {
    setError(null);
  };

  /**
   * Catch error with handleAddError function
   * @param {object} error
   *
   */
  const handleAddError = (error: {}) => {
    setError(error);
  };

  const initialState: any = useMemo(
    () => ({
      error: error,
      handleRemoveError: handleRemoveError,
      handleAddError: handleAddError,
    }),
    [error]
  );

  return (
    <div>
      <InterceptorContext.Provider value={initialState}>
        {children}
      </InterceptorContext.Provider>
    </div>
  );
};

export default ErrorInterceptorContext;
