
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
  console.log("==================> getSalesOpportunitiesFromServer...");

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
  console.log("==================> createNewSalesOpportunity...");
  
  const url = "https://salesmanhub.mybluemix.net/api/salesopportunities";
  fetch(url, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: salesOpportunity.id,
      rev: salesOpportunity.rev,
      companyname: salesOpportunity.companyname,
      product: salesOpportunity.product,
      description: salesOpportunity.description,
      price: salesOpportunity.price,
      commission: salesOpportunity.commission,
      userid: salesOpportunity.userid
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

export function getCompanyInfoFromServer(userid, callback) {
  console.log("==================> getCompanyInfoFromServer...");

  const url = "https://salesmanhub.mybluemix.net/api/companyinfo?userid=" + userid;
  fetch(url)
    .then(res => res.json())
    .then(res => {
      return callback(null, res);
    })
    .catch(error => {
      return callback(error);
    });
}

export function createCompanyInfo(companyinfo, callback) {
  console.log("==================> createCompanyInfo...");
  
  const url = "https://salesmanhub.mybluemix.net/api/companyinfo";
  fetch(url, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: (companyinfo.id && companyinfo.id.length > 0) ? 
      JSON.stringify({
        id: companyinfo.id,
        rev: companyinfo.rev,
        companyname: companyinfo.companyname,
        companyaddress: companyinfo.companyaddress,
        companyphone: companyinfo.companyphone,
        userid: companyinfo.userid
      })
      :
      JSON.stringify({ 
        companyname: companyinfo.companyname,
        companyaddress: companyinfo.companyaddress,
        companyphone: companyinfo.companyphone,
        userid: companyinfo.userid
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

export function deleteCompanyInfo(companyinfo, callback) {
  console.log("==================> deleteCompanyInfo...");
  
  const url = "https://salesmanhub.mybluemix.net/api/companyinfo";
  fetch(url, {
    method: "delete",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: companyinfo.id
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

export function saveChatRoom(chatRoomObj, callback) {
  console.log("==================> saveChatRoom...");

  const url = "https://salesmanhub.mybluemix.net/api/chatroom";
  fetch(url, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: chatRoomObj.id,
      rev: chatRoomObj.rev,
      salesmanUserID: chatRoomObj.salesmanUserID,
      companyUserID: chatRoomObj.companyUserID,
      salesOppID: chatRoomObj.salesOppID,
      messages: chatRoomObj.messages
    })
  })
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      callback();
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}

export function getChatRoom(salesmanUserID, companyUserID, salesOppID, callback) {
  console.log("==================> getChatRoom...");
  
    const url = "https://salesmanhub.mybluemix.net/api/chatroom?salesmanUserID=" + salesmanUserID +
      "&companyUserID=" + companyUserID + "&salesOppID=" + salesOppID;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        return callback(null, res);
      })
      .catch(error => {
        return callback(error);
      });
}
