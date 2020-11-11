const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

export async function getAllLaunches(limit = 10, offset = 0) {
  const encodedLimit = encodeURIComponent(limit);
  const encodedOffset = encodeURIComponent(offset);

  try {
    const response = await fetch(
      `https://api.spacexdata.com/v3/launches?limit=${encodedLimit}&offset=${encodedOffset}`,
      requestOptions,
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
