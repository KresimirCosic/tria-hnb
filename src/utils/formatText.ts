const formatText = (payload: string): string => {
  const words = payload.split('_');
  const modifiedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return modifiedWords.join(' ');
};

export { formatText };
