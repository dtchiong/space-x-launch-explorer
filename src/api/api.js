const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

export async function getAllLaunches(limit = 10, offset = 0) {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/launches', requestOptions);
    const result = await response.text();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
