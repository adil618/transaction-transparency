export const getCookieOptions = (maxAgeMs) => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: maxAgeMs,
});

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const accessMs = 15 * 60 * 1000;
  const refreshMs = 7 * 24 * 60 * 60 * 1000;
  res.cookie("accessToken", accessToken, getCookieOptions(accessMs));
  res.cookie("refreshToken", refreshToken, getCookieOptions(refreshMs));
};

export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", getCookieOptions(0));
  res.clearCookie("refreshToken", getCookieOptions(0));
};
