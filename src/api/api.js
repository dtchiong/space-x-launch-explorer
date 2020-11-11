const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

export const DEFAULT_LIST_LIMIT = 10;

export async function getAllLaunches(offset = 0, limit = DEFAULT_LIST_LIMIT) {
  const encodedLimit = encodeURIComponent(limit);
  const encodedOffset = encodeURIComponent(offset);

  try {
    const response = await fetch(
      `https://api.spacexdata.com/v3/launches?limit=${encodedLimit}&offset=${encodedOffset}`,
      requestOptions,
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
