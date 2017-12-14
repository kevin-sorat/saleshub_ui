
export function makeRemoteRequest(uicomponent) {
  const { page, seed } = uicomponent.state;
  const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
  uicomponent.setState({ loading: true });
  fetch(url)
    .then(res => res.json())
    .then(res => {
      uicomponent.setState({
        data: page === 1 ? res.results : [...uicomponent.state.data, ...res.results],
        error: res.error || null,
        loading: false,
        refreshing: false,
      });
    })
    .catch(error => {
      uicomponent.setState({ error, loading: false });
    });
};
    
export function getSalesOpportunitiesFromServer(callback) {
  console.log("==================> getSalesOpportunitiesFromServer!!!");

  const url = "https://salesmanhub.mybluemix.net/api/salesopportunities";
  fetch(url)
    .then(res => res.json())
    .then(res => {
      return callback(null, res);
    })
    .catch(error => {
      return callback(error);
    });
}

export function createNewSalesOpportunity(salesOpportunity, callback) {
  console.log("==================> createNewSalesOpportunity!!!");
  
  const url = "https://salesmanhub.mybluemix.net/api/salesopportunities";
  fetch(url, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      companyname: salesOpportunity.companyname,
      description: salesOpportunity.description,
      price: salesOpportunity.price,
      commission: salesOpportunity.commission
    })
  })
    //.then(json)  
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      callback();
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}
