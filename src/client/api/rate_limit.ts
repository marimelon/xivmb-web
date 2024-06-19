export const get_rate_limit = async (idToken: string) => {
  const result = await fetch(
    `${import.meta.env.VITE_PUBLIC_API_URL}/rate_limit`,
    {
      headers: { Authorization: 'Bearer ' + idToken },
    },
  )

  return Number(await result.text())
}
