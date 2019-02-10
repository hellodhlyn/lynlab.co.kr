import axios from 'axios';

function query(queryString) {
  return axios.post('https://apis.lynlab.co.kr/graphql', `query{${queryString}}`)
    .then((res) => {
      if (res.data.errors) {
        throw Error('Qurey error');
      }
      return res.data.data;
    });
}

function mutation(queryString) {
  return axios.post('https://apis.lynlab.co.kr/graphql', `mutation{${queryString}}`)
    .then((res) => {
      if (res.data.errors) {
        throw Error('Qurey error');
      }
      return res.data.data;
    });
}

export { query, mutation };
