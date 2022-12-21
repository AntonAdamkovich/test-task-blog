const getFromEnv = (variableName: string) => {
  const variableValue = process.env[variableName];

  if (!variableValue) {
    throw new Error(`set up ${variableName}`);
  }

  return variableValue;
}

export const NEXT_PUBLIC_API_URL = getFromEnv('NEXT_PUBLIC_API_URL');
