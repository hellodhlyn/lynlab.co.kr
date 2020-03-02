import axios from 'axios';

function query(queryString) {
  return axios.get(`https://cms.lynlab.co.kr/graphql?query=query{${queryString}}`).then((res) => {
    if (res.data.errors) {
      throw new Error('Query error');
    }
    return res.data.data;
  });
}

// eslint-disable-next-line import/prefer-default-export
export { query };
