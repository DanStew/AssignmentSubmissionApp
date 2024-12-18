function ajax(url, requestMethod, jwt, requestBody) {
  //Some fetch data that will be part of every fetch request
  const fetchData = {
    headers: {
      "Content-type": "application/json",
    },
    method: requestMethod,
  };

  //Adding authorization tag, if jwt provided
  if (jwt) {
    fetchData.headers.Authorization = `Bearer ${jwt}`;
  }

  //Adding body, if body provided
  if (requestBody) {
    fetchData.body = JSON.stringify(requestBody);
  }

  //Doing and Returning the Fetch call
  return fetch(url, fetchData).then((response) => {
    //Determining whether the response is successful or not
    if (response.status === 200) return response.json();
  });
}

export default ajax;
