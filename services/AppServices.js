
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
    
export function getSalesOpportunitiesFromServer(uicomponent, callback) {
  console.log("==================> getSalesOpportunitiesFromServer!!!");
  const { page, seed } = uicomponent.state;
  const url = "https://salesmanhub.mybluemix.net/api/salesopportunities";
  uicomponent.setState({ loading: true });
  fetch(url)
    .then(res => res.json())
    .then(res => {

      return callback(null, res);

      /*
      uicomponent.setState({
        data: page === 1 ? res : [...uicomponent.state.data, ...res],
        error: res.error || null,
        loading: false,
        refreshing: false,
      });
      */
    })
    .catch(error => {

      return callback(error);

      // uicomponent.setState({ error, loading: false });
    });
}

export function createNewSalesOpportunity(salesOpportunity, goBack) {
  const url = "https://salesmanhub.mybluemix.net/api/salesopportunities";

  // console.log("======================> salesOpportunity.companyname " + salesOpportunity.companyname);

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
      goBack();
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}
