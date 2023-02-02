const useAccessToken = () => {
  const accessToken = JSON.parse(
    window.localStorage.getItem('accessToken') as string
  );

  return accessToken;
};

export default useAccessToken;
